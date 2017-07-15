// song.js
// The set of songs registered in our app.
module.exports = {
  attributes: {
    spotify_id: {
      type: 'string',
      required: true
    },
    attributes: {
      type: 'array',
      required: true
    },
    genre: {
      type: 'string',
      required: true
    },
  }
}