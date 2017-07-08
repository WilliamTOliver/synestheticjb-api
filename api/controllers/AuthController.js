/**
 * AuthController
 *
 * @description :: Server-side logic for Spotify OAuth
 * @help        :: See https://developer.spotify.com/web-api/authorization-guide/
 */

module.exports =
    {
        doAuth: function(req, res){
            /**
            * Initialize OAuth Process
            */
            AuthService.doAuth(req, res);
        },
        authCallback: async function(req, res){
            /**
            * Handle initial OAuth callback
            */
            AuthService.getAuthTokenFromCode(req, res)
        },
        
        handleToken: async function(req, res){
            /**
            * Handle secondary OAuth callback
            */
            console.log('finish line')
        },
    }