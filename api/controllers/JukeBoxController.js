/**
 * JukeBoxController
 *
 * @description :: Server-side logic for SyntheticJukeBox Spotify requests
 * @help        :: See Readme & https://developer.spotify.com/web-api/authorization-guide/
 */
var request = require('request');


module.exports =
    {
        getCurrentJBPlaylist: function (req, res) {
            /**
            * Send Get Request to SpotifyServer to Get User Playlists
            */
            var user_id = 1290172871;
            var playlist_id = '2HeNIdna5lLztR4wb6U4IJ';
            var playlistURL = 'https://api.spotify.com/v1/users/' + user_id + '/playlists/' + playlist_id + '/tracks';

            AuthService.doAuth(req, res).then(function () {
                if (req.session.auth) {
                    var auth_token = req.session.auth;
                    var options = {
                        url: playlistURL,
                        headers: { 'Authorization': 'Bearer ' + auth_token },
                        json: true
                    };
                    request.get(options, function (err, res) {
                        if (err) {
                            return res.serverError(err)
                        }
                        if (res) {
                            var data = res.body;
                            console.log(data);

                        }
                    })
                }
            });
        },
        createAttribute: function (req, res) {
            /**
            * Initialize OAuth Process
            */
            JukeBoxService.createAttribute(req, res);
        },
        saveNewPlaylist: function (req, res) {
            /**
            * Initialize OAuth Process
            */
            AuthService.doAuth(req, res);
        },
        getSongsFromDB: function (req, res) {
            /**
            * Initialize OAuth Process
            */
            AuthService.doAuth(req, res);
        }
    }