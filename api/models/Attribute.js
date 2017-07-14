// attributes.js
// The set of attributes registered in our app.
module.exports = {
  attributes: {
    // e.g., "Green"
    name: {
      type: 'string',
      required: true
    },
    // e.g., "Smell"
    category: {
      type: 'string',
      required: true
    },
    description: {
      type: 'string',
      required: true
    },

    // e.g., 3.26
    songs: {
      type: 'array',
    }
  }
}