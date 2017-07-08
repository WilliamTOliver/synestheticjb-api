/**
 * Song Service:
 *
 * @description :: Server-side logic for managing patient accounts
 * @help        :: See http://sailsjs.org/#!/documentation/concepts/Controllers
 */


var request = require('request'); // "Request" library
var querystring = require('querystring');
var cookieParser = require('cookie-parser');

var client_id = '7b5b90442c8a4b0d9812dd41ca68130b'; 
var client_secret = 'cd9a25a5f05a4c7dbdc1d7424ae642c4'; 
var redirect_uri = 'http://localhost:1337/auth/authCallback';
var stateKey = 'spotify_auth_state';
 





module.exports = {

    doAuth: async function (req, res) {
    /**
     * Spotify OAuth:
     * Step 1: Get a secret to exchange server side for the auth-token.
     */
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

        var state = await generateRandomString(16);
        res.cookie(stateKey, state);
        var scope = 'user-read-private user-read-email';

        // Request Secret
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

            request.post(authOptions, function (error, response, body) {
                if (!error && response.statusCode === 200) {
                    var access_token = body.access_token,
                        refresh_token = body.refresh_token;
                    var options = {
                        url: 'https://api.spotify.com/v1/me',
                        headers: { 'Authorization': 'Bearer ' + access_token },
                        json: true
                    };
                    var response_object = {};
                    response_object.options = options;
                    response_object.refresh_token = refresh_token
                    // use the access token to access the Spotify Web API
                    // request.get(options, function (error, response, body) {
                    //     if (error){
                    //         return
                    //     }
                    //     if(body){
                    //     var data = body
                    //     }
                    // }).then(function(data){
                    //     if(data){
                    //         return res.json(data);
                    //     }
                    // });
                    

                    // // we can also pass the token to the browser to make requests from there
                    // res.redirect('/#' +
                    //     querystring.stringify({
                    //         access_token: access_token,
                    //         refresh_token: refresh_token
                    // }));
                    if (response_object){
                        
                    }
                } else {
                    res.redirect('/#' +
                        querystring.stringify({
                            error: 'invalid_token'
                        }));
                }
            });
            
        }

    },
    refreshToken: function (req, res) {


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