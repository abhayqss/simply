import React, { Component } from "react";

import PropTypes from "prop-types";

import { all } from "underscore";

import { connect } from "react-redux";
import { withRouter } from "react-router";
import { bindActionCreators } from "redux";

import { withCookies, Cookies } from "react-cookie";

import Dialog from "components/dialogs/Dialog/Dialog";
import ErrorViewer from "components/ErrorViewer/ErrorViewer";

import * as tokenActions from "redux/auth/token/tokenActions";
import * as loginActions from "redux/auth/login/loginActions";
import * as logoutActions from "redux/auth/logout/logoutActions";
import * as sessionActions from "redux/auth/session/sessionActions";

import config from "../../config";

import { matches } from "lib/utils/UrlUtils";
import { path } from "lib/utils/ContextUtils";
import { Response } from "lib/utils/AjaxUtils";
import authUserStore from "lib/stores/AuthUserStore";

import AuthenticationError from "lib/errors/AuthenticationError";

import { SERVER_ERROR_CODES } from "lib/Constants";

import { ReactComponent as Warning } from "images/alert-yellow.svg";

const { environment, remote } = config;

const { INVALID_TOKEN } = SERVER_ERROR_CODES;

const INTERVAL = 1000;

const REMIND_TIME_MOMENT = 60 * 1000;

const EXCLUDED_PATHS = [
  "*/invitation*",
  "*/marketplace*",
  "*/reset-password*",
  "*/reset-password-request*",
];

function mapStateToProps(state) {
  return {
    auth: state.auth,
  };
}

function mapDispatchToProps(dispatch) {
  return {
    actions: {
      auth: {
        token: bindActionCreators(tokenActions, dispatch),
        login: bindActionCreators(loginActions, dispatch),
        logout: bindActionCreators(logoutActions, dispatch),
        session: bindActionCreators(sessionActions, dispatch),
      },
    },
  };
}

class Authentication extends Component {
  static propTypes = {
    cookies: PropTypes.instanceOf(Cookies).isRequired,

    shouldRedirectBySuccess: PropTypes.bool,
    shouldRedirectByFailure: PropTypes.bool,

    successRedirectPath: PropTypes.string,
    failureRedirectPath: PropTypes.string,

    onSuccess: PropTypes.func,
    onFailure: PropTypes.func,
  };

  static defaultProps = {
    onSuccess: () => {},
    onFailure: () => {},
  };

  sessionMonitor = null;

  state = {
    isReminderOpen: false,
  };

  componentDidMount() {
    const {
      location,

      shouldRedirectBySuccess,
      shouldRedirectByFailure,

      onSuccess,
      onFailure,
    } = this.props;

    const user = authUserStore.get();

    if (user) {
      this.validateSession()
        .then((response) => {
          if (response.success && response.data) {
            this.restoreUser();

            this.startSessionMonitor();

            if (shouldRedirectBySuccess) {
              this.redirectToSuccessPath();
            }

            onSuccess();
          } else {
            onFailure(
              new AuthenticationError({
                code: INVALID_TOKEN,
                message: "The session is expired",
              })
            );

            this.logout().then(() => {
              if (shouldRedirectByFailure) {
                this.redirectToFailurePath({
                  isSessionExpired: true,
                });
              }
            });
          }
        })
        .catch((e) => {
          onFailure(e);

          this.logout().then(() => {
            if (shouldRedirectByFailure) {
              this.redirectToFailurePath({
                isSessionExpired: true,
              });
            }
          });
        });
    } else if (
      shouldRedirectByFailure &&
      all(EXCLUDED_PATHS, (t) => !matches(t, location.pathname))
    ) {
      this.redirectToFailurePath();
    }
  }

  componentDidUpdate(prevProps) {
    const { auth, location, shouldRedirectByFailure } = this.props;

    const { login, session } = auth;

    if (login.user.data && !prevProps.auth.login.user.data) {
      this.startSessionMonitor();
    }

    if (!login.user.data && prevProps.auth.login.user.data) {
      this.stopSessionMonitor();

      if (
        shouldRedirectByFailure &&
        all(EXCLUDED_PATHS, (t) => !matches(t, location.pathname))
      ) {
        this.redirectToFailurePath();
      }
    }

    if (session.error && !prevProps.auth.session.error) {
      this.stopSessionMonitor();
    }
  }

  onCloseErrorViewer = () => {
    this.clearError();
    this.removeUser();
  };

  onCheckSessionLifetime = () => {
    const { cookies } = this.props;

    const value = cookies.get("jwtHeaderAndPayload");

    if (value) {
      const { exp } = JSON.parse(atob(value.split(".")[1]));

      if (
        !this.isReminderOpen() &&
        exp * 1000 - Date.now() < REMIND_TIME_MOMENT
      ) {
        this.toggleReminder(true);
      }
    } else this.onLogout(true);
  };

  onContinueSession = () => {
    this.stopSessionMonitor();

    this.toggleReminder();

    this.validateSession()
      .then(
        Response(() => {
          this.startSessionMonitor();
        }, this.onLogout)
      )
      .catch(this.onLogout);
  };

  onLogout = (isSessionExpired = false) => {
    this.stopSessionMonitor();

    this.logout().then(() => {
      this.toggleReminder();

      this.redirectToFailurePath({
        isSessionExpired,
        isLoginPopupOpen: true,
      });
    });
  };

  getError() {
    return this.props.auth.session.error;
  }

  clearError() {
    this.props.actions.auth.session.clearError();
  }

  logout() {
    return this.props.actions.auth.logout.logout();
  }

  // restore user from the store to redux
  restoreUser() {
    this.props.actions.auth.login.restore();
  }

  removeUser() {
    this.props.actions.auth.login.remove();
  }

  validateSession() {
    return this.props.actions.auth.session.validate();
  }

  startSessionMonitor() {
    if (environment === "production" && remote.isEnabled) {
      this.stopSessionMonitor();

      this.sessionMonitor = setInterval(this.onCheckSessionLifetime, INTERVAL);
    }
  }

  stopSessionMonitor() {
    if (environment === "production" && remote.isEnabled) {
      clearInterval(this.sessionMonitor);
    }
  }

  redirect(to, state) {
    this.props.history.push(path(to), state);
  }

  redirectToSuccessPath(state) {
    this.redirect(this.props.successRedirectPath, state);
  }

  redirectToFailurePath(state) {
    this.redirect(this.props.failureRedirectPath, state);
  }

  isReminderOpen() {
    return this.state.isReminderOpen;
  }

  toggleReminder(toggle = false) {
    this.setState({ isReminderOpen: toggle });
  }

  render() {
    const { isReminderOpen } = this.state;

    const error = this.getError();

    return (
      <>
        {isReminderOpen && (
          <Dialog
            isOpen
            text='Session is about to expire due to long inactivity. Please click  "Continue" to stay in the session'
            title="Session expiring"
            icon={Warning}
            buttons={[
              {
                color: "success",
                outline: true,
                text: "Logout",
                onClick: () => {
                  this.onLogout();
                },
              },
              {
                color: "success",
                text: "Continue",
                onClick: () => {
                  this.onContinueSession();
                },
              },
            ]}
            className="WarningDialog"
          />
        )}
        {error && (
          <ErrorViewer isOpen error={error} onClose={this.onCloseErrorViewer} />
        )}
      </>
    );
  }
}

export default withRouter(
  connect(mapStateToProps, mapDispatchToProps)(withCookies(Authentication))
);
