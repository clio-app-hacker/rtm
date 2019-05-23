const app = require('express')();
const proxy = require('http-proxy-middleware');
const config = require('./config.json');
const uuid = require('uuidv4');
const session = require('express-session');
const ApiService = require('../services/apiService');
const DBService = require('../services/dbService');

/**
 * use express to handle incomming request
 * use simple-oauth2 for oauth
 * use axios for passing api requests to app.clio.com
 */
const credentials = {
    client: {
        id: config.id,
        secret: config.secrect
    },
    auth: {
        tokenHost: config.tokenHost
    }
};

// create oauth instance using credentials
const oauth2 = require('simple-oauth2').create(credentials);

// add & configure session middleware
app.use(session({
    genid: (req) => {
        console.log('Inside the session middleware: ', req.sessionID)
        return uuid() // use UUIDs for session IDs
    },
    secret: 'falorekceb',
    resave: false,
    saveUninitialized: true
}));

/**
 * Initial oauth response which contains the code to use to request
 * an access token.
 * 
 * Note: This code is specific to a user and their env.
 */
app.get('/oauth/response', async (req, res) => {
    console.log("oauth/response: ", req.query.code);

    // use the returned code to get the token
    //  - pass in the required attributes
    //  - redirect_uri has to be the same as the one used in the authorizationUri
    const tokenConfig = {
        client_id: config.id,
        client_secret: config.secrect,
        code: req.query.code,
        grant_type: "authorization_code",
        redirect_uri: config.redirectUri,
    };

    try {
        const result = await oauth2.authorizationCode.getToken(tokenConfig)
        console.log("result:", result);

        // WARNING: This will setup the API server with a single token, hence this only works for 
        //    a single user. If you have multiple users you need to store each token per user on 
        //    the server and retrieve the token for the user when the user makes a request.
        //    Otherwise every user gets to access the first users Data - NOT GOOD !!!!
        ApiService.initialize(result.access_token);

        // redirect to the application done page
        res.redirect(`http://localhost:3001/reports`);

    } catch (error) {
        console.log('Access Token Error', error);
    }
});

/**
* OAuth entry point
*/
app.get('/oauth', (req, res) => {
    console.log("oauth: ");

    // create a authorizationUri using simple-oauth2 library
    const authorizationUri = oauth2.authorizationCode.authorizeURL({
        redirect_uri: config.redirectUri,
    });

    console.log("authorizationUri created")

    // redirect to app.clio.com for authentication
    // this will trigger OAuth 2 flow
    res.redirect(authorizationUri);
});

/**
 * Simple route for all /api/v4 get requests
 */
app.get('/api/v4/*', async (req, res) => {
    console.log("Request:", req);

    // _parsedOriginalUrl.path -> comes from express-session
    const result = await ApiService.get(req._parsedOriginalUrl.path);
    // console.log("API Server result:", result)
    // let json = JSON.stringify(result.data.data, null, 2);
    // console.log("Result:", json);
    res.send(result.data);
});

app.get('/login', async (req, res) => {
    console.log("Request:", req);

    const email = req.query.email;
    const password = req.query.password;

    // _parsedOriginalUrl.path -> comes from express-session
    const result = await DBService.authenticateUser(email, password);

    res.send(result);
});

app.use(
    '/rtm/*',
    proxy({ target: config.dbHost })
);

app.use(
    '/*',
    proxy({ target: config.uiHost })
);

app.listen(config.proxyPort);
