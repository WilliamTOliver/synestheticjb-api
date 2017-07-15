module.exports = {
    // CREATE 
    createAttribute: function (req, res) {
        /**
         * Simple .create() with a .find([['name']]) check to 
         * validate that the attribute is not currently in the db:
         */
        var sent_attribute = req.allParams();
        var standardize_name = sent_attribute.name.toLowerCase()
        sent_attribute.name = standardize_name;

        Attribute.find(sent_attribute.name).exec(function (err, attribute_record) {
            if (err) {
                return res.serverError(err);
            }
            console.log(attribute_record.name + "'s id is", attribute_record.id);
            if (attribute_record.length < 1) {
                Attribute.create(sent_attribute).exec(function (err, created_attribute) {
                    if (err) { return res.serverError(err); }
                    console.log(created_attribute.name + "'s id is", created_attribute.id);
                    return res.ok();
                });
                return res.ok();
            }
            return res.json({
                "error": "record already exists"
            });
        });

    },
    createGenre: function (req, res) {
        /**
         * Simple .create() with a .find([['name']]) check to 
         * validate that the genre is not currently in the db:
         */
        var sent_genre = req.allParams();
        var standardize_name = sent_genre.name.toLowerCase()
        sent_genre.name = standardize_name;

        Genre.find(sent_genre.name).exec(function (err, genre_record) {
            if (err) {
                return res.serverError(err);
            }
            console.log(genre_record.name + "'s id is", genre_record.id);
            if (genre_record.length < 1) {
                Genre.create(sent_genre).exec(function (err, created_genre) {
                    if (err) { return res.serverError(err); }
                    console.log(created_genre.name + "'s id is", created_genre.id);
                    return res.ok();
                });
                return res.ok();
            }
            return res.json({
                "error": "record already exists"
            });
        });

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
            song = await Song.find(sent_song.spotify_id);
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
    createPlaylist: function (req, res) {
        /**
         * Simple .create() with a .find([['playlist_id']]) check to 
         * validate that the playlist is not currently in the db:
         */
        var sent_playlist = req.allParams();

        Playlist.find(sent_playlist).exec(function (err, playlist_record) {
            if (err) {
                return res.serverError(err);
            }
            if (playlist_record.length < 1) {
                Playlist.create(sent_playlist).exec(function (err, created_playlist) {
                    if (err) { return res.serverError(err); }
                    return res.ok();
                });
                return res.ok();
            }
            return res.json({
                "error": "record already exists"
            });
        });

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