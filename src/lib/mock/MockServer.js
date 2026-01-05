import * as mock from './MockData'

import directoryController from './controllers/DirectoryController'
import organizationController from './controllers/OrganizationController'

import {
    ALERT_TYPES,
    DASHBOARD_TYPES,
} from 'lib/Constants'

const RESPONSE_DELAY = 1000

const {
    ACTIVE_ALERT,
} = ALERT_TYPES

const {
    CASELOAD,
    APPOINTMENT,
    RECENT_EVENT,
    RECENT_NOTE
} = DASHBOARD_TYPES

const REQUEST_MAPPING = {
    [directoryController.getPath()]: directoryController,
    [organizationController.getPath()]: organizationController
}

class MockServer {
    service (request) {
        return new Promise((resolve, reject) => {
            const { url, params } = request

            setTimeout(() => {
                // TODO new approach of handling requests
                /*for (let path in REQUEST_MAPPING) {
                    if(url.includes(path)) {
                        resolve(REQUEST_MAPPING[path].handle(request))
                    }
                }*/

                if (/login/.test(url)) {
                    resolve(mock.login(request.body))
                }
                if (/logout/.test(url)) {
                    resolve(mock.logout())
                }
                if (/marketplace\/communities/.test(url)) {
                    if(!isNaN(params.communityId) && new RegExp(params.communityId).test(url))
                        resolve(mock.getMarketplaceCommunityDetails(params))
                    resolve(mock.getMarketplaceCommunities(params))
                }
                if (/directory/.test(url)) {
                    if (/states/.test(url)) {
                        resolve(mock.getStates())
                    }
                    else if (/genders/.test(url)) {
                        resolve(mock.getGenders())
                    }
                    else if (/marital-status/.test(url)) {
                        resolve(mock.getMaritalStatus())
                    }
                    else if (/domains/.test(url)) {
                        resolve(mock.getDomains())
                    }
                    else if (/priorities/.test(url)) {
                        resolve(mock.getPriorities())
                    }
                    else if (/organizations/.test(url)) {
                        resolve(mock.getOrganizationType())
                    }
                    else if (/organization-types/.test(url)) {
                        resolve(mock.getOrganizationType())
                    }
                    else if (/system-roles/.test(url)) {
                        resolve(mock.getSystemRoles())
                    }
                    else if (/care-team-responsibilities/.test(url)) {
                        resolve(mock.getCareTeamResponsibilities())
                    }
                    else if (/note-subtype/.test(url)) {
                        resolve(mock.getNoteTypes())
                    }
                    else if (/primary-focuses/.test(url)) {
                        resolve(mock.getPrimaryFocuses())
                    }
                    else if (/communities/.test(url)) {
                        resolve(mock.getCommunityTypes(params))
                    }
                    else if (/community-types/.test(url)) {
                        resolve(mock.getCommunityTypes(params))
                    }
                    else if (/encounter-note-type/.test(url)) {
                        resolve(mock.getNoteEncounterTypes())
                    }
                    else if (/emergency-services/.test(url)) {
                        resolve(mock.getEmegencyServices())
                    }
                    else if (/additional-services/.test(url)) {
                        resolve(mock.getAdditionalServices())
                    }
                    else if (/language-services/.test(url)) {
                        resolve(mock.getLanguageServices())
                    }
                    else if (/services-treatment-approaches/.test(url)) {
                        resolve(mock.getTreatmentServices())
                    }
                    else if (/insurance\/networks/.test(url)) {
                        resolve(mock.getInsuranceNetworks())
                    }
                    else if (/insurance\/payment-plans/.test(url)) {
                        resolve(mock.getInsurancePaymentPlans())
                    }
                    else if (/care-levels/.test(url)) {
                        resolve(mock.getCareLevels())
                    }
                    else resolve(mock.getCareTeamChannels())
                }
                if(/event-types/.test(url)) {
                    resolve(mock.getEventTypes())
                }
                if (/note-types/.test(url)) {
                    resolve(mock.getNoteTypes())
                }
                if (/alerts/.test(url)) {
                    if (/count/.test(url)) {
                        (params.type === ACTIVE_ALERT)
                            ? resolve(mock.getActiveAlertCount(params))
                            : resolve(mock.getSystemAlertCount(params))
                    }
                    else {
                        (params.type === ACTIVE_ALERT)
                            ? resolve(mock.getActiveAlerts(params))
                            : resolve(mock.getSystemAlerts(params))
                    }
                }
                if (/care-team/.test(url)) {
                    if(/count/.test(url))
                        resolve(mock.getCareTeamMemberCount(params))
                    else resolve(mock.getCareTeamMembers(params))
                }
                if (/service-plans/.test(url)) {
                    if (/count/.test(url))
                        resolve(mock.getServicePlanCount(params))
                    else resolve(mock.getServicePlans(params))
                }
                if (/clients/.test(url)) {
                    if (/admit-dates/.test(url)) {
                        resolve(mock.getNoteAdmittanceDates(params))
                    }
                    else if (/documents/.test(url)) {
                        resolve(mock.getClientDocuments(params))
                    }

                    else if (/composed-events-notes/.test(url)) {
                        resolve(mock.getComposedEventsNotes(params))
                    }

                    else if (/events/.test(url)) {
                        if (!isNaN(params.id) && new RegExp(params.id).test(url)) {
                            if (/notifications/.test(url)) {
                                resolve(mock.getClientEventSentNotifications(params))
                            }
                            else if (/notes/.test(url)) {
                                resolve(mock.getClientEventRelatedNotes(params))
                            }
                            else {
                                resolve(mock.getClientEventDetails(params))
                            }
                        }
                        else resolve(mock.getClientEvents(params))
                    }

                    else if (/notes/.test(url)) {
                        if(!isNaN(params.id) && new RegExp(params.id).test(url)) {
                            if(/history/.test(url)) {
                                resolve(mock.getClientNoteHistory(params))
                            }
                            else {
                                resolve(mock.getClientNoteDetails(params))
                            }
                        }

                        else {
                            resolve(mock.getClientNotes(params))
                        }
                    }

                    else if (/count/.test(url)) {
                        resolve(mock.getClientCount(params))
                    }

                    else if (/assessments/.test(url)) {
                        if (/(count)$/.test(url)) {
                            resolve(mock.getAssessmentCount(23))
                        }

                        else if (/(history)$/.test(url)) {
                            resolve(mock.getAssessmentHistory(params))
                        }

                        else {
                            resolve(mock.getAssessments(params))
                        }
                    }

                    else if (/assessment-survey/.test(url)) {
                        resolve(mock.getAssessmentSurvey(params))
                    }

                    else if (/assessment-management/.test(url)) {
                        resolve(mock.getAssessmentManagement(params))
                    }

                    else if (/\w+\/\d+/.test(url)) {
                        resolve(mock.getClientDetails(params))
                    }

                    else {
                        resolve(mock.getClients(params))
                    }
                }
                if (/(assessments\/\d+)$/.test(url)) {
                    resolve(mock.getAssessmentSurvey(params))
                }
                if (/contacts/.test(url)) {
                    if (/count/.test(url))
                        resolve(mock.getContactCount(params))
                    else if(params.id && new RegExp(params.id).test(url))
                        resolve(mock.getContactDetails(params))
                    else resolve(mock.getContacts(params))
                }
                if (/organizations/.test(url)) {
                    if (/communities/.test(url)) {
                        if (/handsets/.test(url)) {
                            if (/count/.test(url)) resolve(mock.getCommunityHandsetCount(params))
                            else resolve(mock.getCommunityHandsets(params))
                        }
                        else if (/device-types/.test(url)) {
                            if (/count/.test(url)) resolve(mock.getCommunityDeviceTypeCount(params))
                            else if(params.id && new RegExp(params.id).test(url))
                                resolve(mock.getCommunityDeviceTypeDetails(params))
                            else resolve(mock.getCommunityDeviceTypes(params))
                        }
                        else if (/locations/.test(url)) {
                            if (/count/.test(url)) resolve(mock.getCommunityLocationCount(params))
                            else resolve(mock.getCommunityLocations(params))
                        }
                        else if (/zones/.test(url)) {
                            if (/count/.test(url)) resolve(mock.getCommunityZoneCount(params))
                            else resolve(mock.getCommunityZones(params))
                        }
                        else if (/count/.test(url)) resolve(mock.getCommunityCount(params))
                        else if(!isNaN(params.id) && new RegExp(params.id).test(url))
                            resolve(mock.getCommunityDetails(params))
                        else resolve(mock.getCommunities(params))
                    }
                    else if (/count/.test(url)) {
                        resolve(mock.getOrganizationCount())
                    } else if(!isNaN(params.id) && new RegExp(params.id).test(url)) {
                        resolve(mock.getOrganizationDetails(params))
                    } else resolve(mock.getOrganizations(params))
                }
                if (/dashboard/.test(url)) {
                    switch(params.type){
                        case CASELOAD: resolve(mock.getDashboardCaseloads(params))
                            break;
                        case APPOINTMENT: resolve(mock.getDashboardAppointments(params))
                            break;
                        case RECENT_EVENT: resolve(mock.getDashboardRecentEvents(params))
                            break;
                        case RECENT_NOTE: resolve(mock.getDashboardRecentNotes(params))
                            break;

                        default: return [];
                    }
                }
                if (/composed-events-notes/.test(url)) {
                    resolve(mock.getComposedEventsNotes(params))
                }
                if (/events/.test(url)) {
                    if(!isNaN(params.id) && new RegExp(params.id).test(url)) {
                        if(/notifications/.test(url))
                            resolve(mock.getEventSentNotifications(params))
                        else if(/notes/.test(url))
                            resolve(mock.getEventRelatedNotes(params))
                        else resolve(mock.getEventDetails(params))
                    }
                    else resolve(mock.getEvents(params))
                }
                if (/notes/.test(url)) {
                    if(!isNaN(params.id) && new RegExp(params.id).test(url)) {
                        if(/history/.test(url))
                            resolve(mock.getNoteHistory(params))
                        else resolve(mock.getNoteDetails(params))
                    } else resolve(mock.getNotes(params))
                }

                if (/insurance\/\networks/.test(url)) {
                    if (/\w+\/\d+/.test(url)) {
                        resolve(mock.getInsurancePaymentPlans(params))
                    }
                    else resolve(mock.getInsuranceNetworks(params))
                }

                resolve(mock.getSuccessResponse([]))
            }, RESPONSE_DELAY)
        })
    }
}

export default new MockServer()