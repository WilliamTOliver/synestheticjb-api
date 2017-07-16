/**
 * Song Service:
 *
 * @description :: Server-side logic for managing patient accounts
 * @help        :: See http://sailsjs.org/#!/documentation/concepts/Controllers
 */

// TODO Combine Functions, upon callback, check for code, send post request, and return the token within the same function to bypass weird non-response error
var request = require('request');
var querystring = require('querystring');
var cookieParser = require('cookie-parser');

var client_id = '7b5b90442c8a4b0d9812dd41ca68130b';
var client_secret = 'cd9a25a5f05a4c7dbdc1d7424ae642c4';
var redirect_uri = 'http://localhost:1337/auth/authCallback';
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
        var sendAuth = function (err, data) {
            /**
            * Return Result
            */
            if (err) {
                return res.serverError(err)
            }
            req.session.auth = data;
            return res.json(req.session);
        }
        if (access_token) {
            sendAuth(null, access_token);
        } else {
            var state = generateRandomString(16);
            res.cookie(stateKey, state);
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
        }


    },
    getAuthTokenFromCode: function (req, res) {
        /**
        * Handle initial OAuth callback
        */

        var code = req.query.code || null;
        var state = req.query.state || null;
        var storedState = req.cookies ? req.cookies[stateKey] : null;

        if (state === null || state !== storedState) {
            // return res.json({ 'nope': 'happening' })
            console.log('huh?')
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
            var response_object = {};
            request.post(authOptions, function (error, response, body) {
                if (error) {
                    return res.serverError(error);
                }
                if (response.statusCode === 200) {
                    var access_token = body.access_token,
                        refresh_token = body.refresh_token;
                    if (req.session.q == 'add') {
                        res.redirect('http://localhost:8081/jukebox-admin/' + access_token);
                        
                    } else if (req.session.q == 'playlist') {
                        res.redirect('http://localhost:8081/jukebox/' + access_token);
                    }
                }
            });
        }
    },















    // TODO Integrate refresh token functionality
    refreshToken: function (req, res) {
        //EXCESS CODE 
        // var options = {
        //     url: 'https://api.spotify.com/v1/me',
        //     headers: { 'Authorization': 'Bearer ' + access_token },
        //     json: true
        // };
        // response_object.options = options;
        // response_object.refresh_token = refresh_token
        // // use the access token to access the Spotify Web API
        // if (req.params.endpoint == 'jb-playlist') {
        //     options.url = req.params.playlist;
        //     request.get(options, function (err, res) {
        //         if (err) {
        //             return res.serverError(err)
        //         }
        //         if (res) {
        //             var data = res.body;

        //         }
        //     })
        // }
        // // we can also pass the token to the browser to make requests from there
        // res.redirect('/#' +
        //     querystring.stringify({
        //         access_token: access_token,
        //         refresh_token: refresh_token
        // }));

        var refresh_token = req.query.refresh_token;
        var authOptions = {
            url: 'https://accounts.spotify.com/api/token',
            headers: { 'Authorization': 'Basic ' + (new Buffer(client_id + ':' + client_secret).toString('base64')) },
            form: {
                grant_type: 'refresh_token',
                refresh_token: refresh_token
            },
            json: true
        };

        request.post(authOptions, function (error, response, body) {
            if (!error && response.statusCode === 200) {
                var access_token = body.access_token;
                res.send({
                    'access_token': access_token
                });
            }
        });
    }
}