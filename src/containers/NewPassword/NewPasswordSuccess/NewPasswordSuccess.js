import React from 'react'

import logoImg from 'images/logo-big.png'

export default function NewPasswordSuccess ({ companyId }) {
    return (
        <div className="NewPasswordSuccess">
            <img
                alt="logo"
                className="NewPasswordSuccess-LogoImage"
                src={logoImg}
            />
            <div className="d-flex flex-column">
                <span className="NewPasswordSuccess-Title">
                    Create New Password
                </span>
                <span className="NewPasswordSuccess-InfoText">
                    Thank you for changing your password.
                    Please use your email as login and {companyId} as company ID.
                </span>
            </div>
        </div>
    )
}