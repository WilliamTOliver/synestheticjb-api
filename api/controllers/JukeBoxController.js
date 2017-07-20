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
            JukeBoxService.createSong(req, res);
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