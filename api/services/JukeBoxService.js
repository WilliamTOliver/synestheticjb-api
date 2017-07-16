const request = require('request');



module.exports = {
    // CREATE 
    createAttribute: async function (req, res) {
        /**
         * Simple .create() with a .find([['name']]) check to 
         * validate that the attribute is not currently in the db:
         */
        let sent_attr = req.allParams();
        let attr;
        let newAttr;
        try {
            attr = await Attribute.find({ name: sent_attr.name });
        } catch (err) {
            return res.status(500).send()
        }
        if (attr.length < 1) {
            newAttr = await Attribute.create(sent_attr)
            return res.json(newAttr);
        } else {
            return res.json({
                "error": "record already exists"
            })
        }

    },
    createGenre: async function (req, res) {
        /**
         * Simple .create() with a .find([['name']]) check to 
         * validate that the genre is not currently in the db:
         */
        let sent_genre = req.allParams();
        let genre;
        let newGenre;
        try {
            genre = await Genre.find({ name: sent_genre.name });
        } catch (err) {
            return res.status(500).send()
        }
        if (genre.length < 1) {
            newGenre = await Genre.create(sent_genre)
            return res.json(newGenre);
        } else {
            return res.json({
                "error": "record already exists"
            })
        }

    },
    createSong: async function (req, res) {
        /**
         * Simple .create() with a .find([['spotify_id']]) check to 
         * validate that the attribute is not currently in the db:
         */
        let sent_song = req.allParams();
        let song;
        let newSong;
        try {
            song = await Song.find({ spotify_id: sent_song.spotify_id });
        } catch (err) {
            return res.status(500).send()
        }
        if (song.length < 1) {
            newSong = await Song.create(sent_song)
            return res.json(newSong);
        } else {
            return res.json({
                "error": "record already exists"
            })
        }
    },
    createPlaylist: async function (req, res) {
        /**
         * Simple .create() with a .find([['playlist_id']]) check to 
         * validate that the playlist is not currently in the db:
         */


    },
    // READ 
    getAttributes: async function (req, res) {
        /**
         * Simple .find() to return a list of attributes
         */
        let attributes = [];
        try {
            attributes = await Attribute.find()
        } catch (err) {
            return res.status(500).send()
        }
        if (attributes.length < 1) {
            return res.json({ "error": "empty collection" });
        } else {
            return res.json(attributes);
        }
    },
    getGenres: async function (req, res) {
        /**
         * Simple .find() to return a list of attributes
         */
        let genres = [];
        try {
            genres = await Genre.find()
        } catch (err) {
            return res.status(500).send()
        }
        if (genres.length < 1) {
            return res.json({ "error": "empty collection" });
        } else {
            return res.json(genres);
        }
    },
    getSongsForPlaylist: async function (req, res) {
        /**
         * looped .find() to return a list of songs containing at least one attribute in attributelist
         */
        let criteria = req.allParams();
        let genre = criteria.genre;
        let matchingSongs = [];
        for (let i = 0; i < criteria.attributes.length; i++) {
            let attribute = criteria.attributes[i];
            let songs = await Song.find({ attributes: attribute, genre: genre });
            if (songs.length > 0) {
                for (let j = 0; j < songs.length; j++) {
                    let song = songs[j];
                    if (matchingSongs.indexOf(song) == -1) {
                        matchingSongs.push(song);
                    }
                }
            }
        }

    },
    // UPDATE

    // DELETE

}