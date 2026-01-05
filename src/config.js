const uuid = require('uuid');

module.exports = {
    SESSION_TOKEN_KEY: 'hct74yfrt0cwy7n3rix74rbc4rts4cr7vshbn784yct4sc4sw4km0w8u4t9w4t54uw',

    port: 8989,

    // for test
    // port: 8988,

    // for Nate's demo
    // port: 8990,

    context: '/web-portal',

    // for test
    // context: '/web-portal-test',

    // for Nate's demo
    // context: '/demo',

    logFileEnabled: true,

    logErrors: true,

    logLevel: 'info',

    httpLimit: '10mb',

    demoUser: {
        id: 745,
        isActive: true,
        companyId: 'demo',
        username: 'ntyler',
        password: '123'
    },

    demoUsers: [
        {
            id: 1,
            isActive: true,
            companyId: 'demo',
            username: 'ntyler',
            password: '123'
        },
        {
            id: 2,
            isActive: true,
            companyId: 'demo',
            username: 'cpatnode',
            password: '111'
        }
    ],

    session: {
        // A secret key used as a salt to hash the session and sign the cookies.
        key: uuid.v4(),
        maxAge: 24 * 60 * 60 * 1000
    },

    environment: process.env.NODE_ENV,

    remote: {
        isEnabled: true,
        // for Nate's demo
        // isEnabled: false,
        url: process.env.REACT_APP_REMOTE_SERVER_URL
    },

    google: {
        maps: {
            apiKey: 'AIzaSyCXIM9Hlo60Wx2OXemgtgTkt3hMfHSHK-M'
        }
    },

    responseTimeout: 30000
}