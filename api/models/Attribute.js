// attributes.js
// The set of attributes registered in our app.
module.exports = {
  attributes: {
    name: {
      type: 'string',
      required: true
    },
    category: {
      type: 'string',
    },
    description: {
      type: 'string',
      required: true
    },
    songs: {
      type: 'array',
    }
  }
}