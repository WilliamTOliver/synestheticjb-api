/**
 * AuthController
 *
 * @description :: Server-side logic for Spotify OAuth
 * @help        :: See https://developer.spotify.com/web-api/authorization-guide/
 */

module.exports =
    {
        doAuth: function (req, res) {
            /**
            * Initialize OAuth Process
            */
            // store intended final redirect path in req.session (goto Admin or Generator)
            var q = req.allParams().q;
            if(q){
                req.session.q = q;
                AuthService.doAuth(req, res);
            }
        },
        authCallback: async function (req, res) {
            /**
            * Handle OAuth callback, 
            * receiving code, send to final post request to get token
            */
            AuthService.getAuthTokenFromCode(req, res)
        }
    }