const express = require("express");
const app = express();
const SpotifyWebApi = require("spotify-web-api-node");

app.use(express.json());

const api = new SpotifyWebApi({
    clientId:process.env.SPOTIFY_CLIENT_ID,
    clientSecret:process.env.SPOTIFY_CLIENT_SECRET,
    redirectUri:process.env.SPOTIFY_REDIRECT_URI
});

// -- Get auth link
app.get("/api/redirect", (req, res) => {
    const authURL = api.createAuthorizeURL(["user-read-recently-played", "user-top-read"]);
    return res.redirect(authURL);
});

// -- Obtain access/refresh tokens
app.post("/api/token", (req, res) => {
    // -- Get auth code
    const code = req.body.code;
    
    // -- Get tokens from code
    api.authorizationCodeGrant(code).then(data => {
        const access = data.body["access_token"];
        const refresh = data.body["refresh_token"];
        // -- send back to client
        return res.json({tokens:{access:access, refresh:refresh}});
    }).catch(err => {
        console.error(err);
        return res.status(500).send();
    });
});

// -- Refresh access token
app.post("/api/token/refresh", (req, res) => {
    // -- Get refresh token
    const token = req.body.token;

    // -- Set refresh token in api
    api.setRefreshToken(token);

    // -- Refresh access token
    api.refreshAccessToken().then(data => {
        const access = data.body["access_token"];
        // -- send back to client
        return res.json({token:access});
    }).catch(err => {
        console.error(err);
        return res.status(500).send();
    });
});

// -- Fallback redirect
app.get("*", (req, res) => {
    return res.redirect(process.env.REDIRECT_URI);
});

module.exports = app;