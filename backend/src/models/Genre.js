import { Schema, model } from 'mongoose'

const genreSchema = new Schema({
  text: {
    type: String,
    required: true
  },
  value: {
    type: String
  },
  url: {
    type: String,
    required: true
  }
})

export default model('Genre', genreSchema)