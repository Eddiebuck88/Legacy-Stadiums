const { Schema, model } = require('mongoose');
const dateFormat = require('../utils/dateFormat');

const artSchema = new Schema({
  // thoughtText: {
  //   type: String,
  //   required: 'You need to leave a thought!',
  //   minlength: 1,
  //   maxlength: 280,
  //   trim: true,
  // },
  // thoughtAuthor: {
  //   type: String,
  //   required: true,
  //   trim: true,
  // },
  artId :{
    type: Number, 
    required: true,
  },
  

  createdAt: {
    type: Date,
    default: Date.now,
    get: (timestamp) => dateFormat(timestamp),
  },
  comments: [
    {
      commentText: {
        type: String,
        required: true,
        minlength: 1,
        maxlength: 280,
      },
      commentAuthor: {
        type: String,
        required: true,
      },
      createdAt: {
        type: Date,
        default: Date.now,
        get: (timestamp) => dateFormat(timestamp),
      },
    },
  ],
});

const Art = model('Art', artSchema);

module.exports = Art;
