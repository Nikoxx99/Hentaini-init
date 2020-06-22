import { Schema, model } from "mongoose";

const serieSchema = new Schema({
  title: {
    type: String,
    required: true
  },
  title_english: {
    type: String,
    required: true
  },
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
  episodes: Array,
  created_at: {
    type: Date,
    default: Date.now
  },
  updated_at: {
    type: Date,
    default: Date.now
  },
  next_episode: String,
  visits: Number,
  coverUrl: String,
  background_coverUrl: String,
  rating: Array
});

export default model('Serie', serieSchema);