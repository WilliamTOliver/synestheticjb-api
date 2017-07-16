/**
 * JukeBoxController
 *
 * @description :: Server-side logic for SyntheticJukeBox Spotify requests
 * @help        :: See Readme & https://developer.spotify.com/web-api/authorization-guide/
 */
var request = require('request');


module.exports =
    {
        createAttribute: function (req, res) {
            /**
            * Initialize OAuth Process
            */
            JukeBoxService.createAttribute(req, res);
        },
        createGenre: function (req, res) {
            /**
            * Initialize OAuth Process
            */
            JukeBoxService.createGenre(req, res);
        },
        createPlaylist: function (req, res) {
            /**
            * Initialize OAuth Process
            */
            JukeBoxService.createPlaylist(req, res);
        },
        getSongsForPlaylist: function (req, res) {
            /**
            * Initialize OAuth Process
            */
            JukeBoxService.getSongsForPlaylist(req, res);
        },
        getAttributes: function (req, res) {
            /**
            * return a list of genres in the mongo db
            */
            JukeBoxService.getAttributes(req, res);
        },
        getGenres: function (req, res) {
            /**
            * return a list of genres in the mongo db
            */
            JukeBoxService.getGenres(req, res);
        },
        createSong: function (req, res) {
            /**
            * Initialize OAuth Process
            */
            JukeBoxService.createSong(req, res);
        },
    }