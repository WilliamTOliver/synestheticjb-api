/**
 * Song Service:
 *
 * @description :: Server-side logic for managing patient accounts
 * @help        :: See http://sailsjs.org/#!/documentation/concepts/Controllers
 */
var request = require('request');
var querystring = require('querystring');
var cookieParser = require('cookie-parser');

var client_id = '7b5b90442c8a4b0d9812dd41ca68130b';
var client_secret = 'cd9a25a5f05a4c7dbdc1d7424ae642c4';
var redirect_uri = 'http://frozen-basin-45731.herokuapp.com/auth/authCallback';
var stateKey = 'spotify_auth_state';

module.exports = {

    doAuth: function (req, res, access_token) {
        /**
         * Spotify OAuth:
         * Step 1: Get a secret to exchange server side for the auth-token.
         */
        var allparams = req.allParams()
        var param = req.param()

        var generateRandomString = function (length) {
            /**
            * Generates a random string containing numbers and letters
            * @param  {number} length The length of the string
            * @return {string} The generated string
            */
            var text = '';
            var possible = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
            for (var i = 0; i < length; i++) {
                text += possible.charAt(Math.floor(Math.random() * possible.length));
            }
            return text;
        }
        var state = generateRandomString(16);
        res.cookie(stateKey, state);
        // Include in scope all necessary permissions
        var scope = 'user-read-private user-read-email playlist-modify-public playlist-modify-private';
        res.setHeader("Access-Control-Allow-Origin", "https://accounts.spotify.com");
        // Request Token
        res.redirect('https://accounts.spotify.com/authorize?' +
            querystring.stringify({
                response_type: 'code',
                client_id: client_id,
                scope: scope,
                redirect_uri: redirect_uri,
                state: state
            }));
    },
    getAuthTokenFromCode: function (req, res) {
        /**
        * Take code and send token to client
        */

        var code = req.query.code || null;
        var state = req.query.state || null;
        var storedState = req.cookies ? req.cookies[stateKey] : null;

        if (state === null || state !== storedState) {
            console.log('incorrect/empty state')
        } else {
            res.clearCookie(stateKey);
            var authOptions = {
                url: 'https://accounts.spotify.com/api/token',
                form: {
                    code: code,
                    redirect_uri: redirect_uri,
                    grant_type: 'authorization_code'
                },
                headers: {
                    'Authorization': 'Basic ' + (new Buffer(client_id + ':' + client_secret).toString('base64'))
                },
                json: true
            };
            request.post(authOptions, function (error, response, body) {
                if (error) {
                    return res.serverError(error);
                }
                if (response.statusCode === 200) {
                    var access_token = body.access_token
                    // if we need to build in refreshtoken functionality, here's the starting point. 
                    // refresh_token = body.refresh_token;
                    if (req.session.q == 'add') {
                        // redirect to admin
                        res.redirect('https://jukebox-174018.appspot.com/jukebox-admin/' + access_token);

                    } else if (req.session.q == 'playlist') {
                        // redirect to playlist generator 
                        res.redirect('https://jukebox-174018.appspot.com/jukebox/' + access_token);
                    }
                }
            });
        }
    }
}