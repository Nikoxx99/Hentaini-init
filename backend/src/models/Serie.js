import { Schema, model } from "mongoose";

const serieSchema = new Schema({
  title: {
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
  episodes: Array,
  next_episode: String,
  visits: Number,
  cover: {
    type: String,
    required: true
  },
  background_cover: String,
  rating: Array
});

export default model('Serie', serieSchema);