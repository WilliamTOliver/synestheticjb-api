const request = require('request');

module.exports = {
    createAttribute: async function (req, res) {
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
        // TODO Create playlist model and clientside page for creating and then news-feed-style displaying created playlists.
    },
    getAttributes: async function (req, res) {
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
    getSongs: async function (req, res) {
        let findUniqueSong = async function (gen, attr, arr) {
            let songs;
            let where = {};
            where.genres = gen;
            where.attributes = attr;
            try {
                songs = await Song.find(where);
            } catch (err) {
                return res.status(500).send()
            }
            if (songs.length > 0) {
                let returnArr = arr;
                for (let index = 0; index < songs.length; index++) {
                    let song = songs[index].spotify_id;
                    if (returnArr.indexOf(song) == -1) {
                        returnArr.push(song);
                    }
                    if (index == songs.length - 1) {
                        return returnArr;
                    }
                }
            } else {
                return arr;
            }
        }
        let criteria = req.allParams();
        let genres = criteria.genres;
        let attributes = criteria.attributes;
        let matchingSongs = [];
        for (let j = genres.length; j > 0; j--) {
            let genre = genres[j - 1];
            for (let i = attributes.length; i > 0; i--) {
                let attribute = criteria.attributes[i - 1];
                matchingSongs = await findUniqueSong(genre, attribute, matchingSongs);
                if (j == 1 && i == 1) {
                    return res.json({ songs: matchingSongs })
                }
            }
        }
    }
}