import { Schema, model } from 'mongoose'

const rrssSchema = new Schema({
  name: {
    type: String,
    default: ''
  },
  url: {
    type: String,
    default: ''
  },
  active: {
    type: Boolean,
    default: false
  }
})

export default model('rrss', rrssSchema)