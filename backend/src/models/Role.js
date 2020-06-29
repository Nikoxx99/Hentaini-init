import { Schema, model } from 'mongoose'

const roleSchema = new Schema({
  role: {
    type: Number,
    required: true
  },
  accessLevel: {
    type: Number,
    required: true,
    default: 1
  },
  name: {
    type: String,
    default: 'USER'
  }
})

export default model('Role', roleSchema)