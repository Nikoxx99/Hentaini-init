import { Schema, model } from 'mongoose'

const serieSchema = new Schema({
  title: {
    type: String,
    required: true
  },
  title_english: String,
  synopsis: {
    type: String,
    required: true
  },
  genres: {
    type: Array,
    required: true
  },
  status:{
    type: String,
    required: true
  },
  serie_type: {
    type: String,
    required: true,
  },
  censorship: Boolean,
  created_at: {
    type: Date,
    default: Date.now
  },
  updated_at: {
    type: Date,
    default: Date.now
  },
  hasEpisodes: {
    type: Boolean,
    default: false
  },
  isFeatured: Boolean,
  next_episode: String,
  visits: Number,
  coverUrl: String,
  background_coverUrl: String
})

export default model('Serie', serieSchema)