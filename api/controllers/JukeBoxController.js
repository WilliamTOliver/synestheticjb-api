/**
 * JukeBoxController
 *
 * @description :: Server-side logic for SyntheticJukeBox Spotify requests
 * @help        :: See Readme & https://developer.spotify.com/web-api/authorization-guide/
 */
var request = require('request');


module.exports =
    {
        // CREATE
        createAttribute: function (req, res) {
            JukeBoxService.createAttribute(req, res);
        },
        createGenre: function (req, res) {
            JukeBoxService.createGenre(req, res);
        },
        createPlaylist: function (req, res) {
            JukeBoxService.createPlaylist(req, res);
        },
        createSong: function (req, res) {
            let song = req.allParams();
            JukeBoxService.createSong(req, res, song);
        },
        addMulti: function (req, res) {
            let genres = req.allParams().genres;
            let attributes = req.allParams().attributes;
            let tracks = req.allParams().tracks;
            if(tracks.length > 0){
                for (let i = 0; i < tracks.length; i++){
                    let spotify_id = tracks[i];
                    let song = {genres, attributes, spotify_id};
                    JukeBoxService.createSong(req, res, song);
                    // TODO, getting repeat UnhandledPromiseRejectionWarning:Unhandled promise rejection (rejection id: 8): Error: Can't set headers after theyare sent.
                    // But the songs are being added properly and are retrievable by way of the generator. - Investigate.
                }
            }
        },
        // GET
        
        getAttributes: function (req, res) {
            JukeBoxService.getAttributes(req, res);
        },
        getGenres: function (req, res) {
            JukeBoxService.getGenres(req, res);
        },
        getSongs: function (req, res) {
            JukeBoxService.getSongs(req, res);
        }
    }