import { Schema, model } from 'mongoose'

const downloadSchema = new Schema({
  url: String
})

export default model('Download', downloadSchema)