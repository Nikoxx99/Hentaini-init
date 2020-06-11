import { Schema, model } from "mongoose";

const episodeSchema = new Schema({
  serie_id: {
    type: String,
    required: true
  },
  episode_number: {
    type: String,
    required: true
  },
  created_at: {
    type: Date,
    default: Date.now
  },
  visible: Boolean,
  language: String,
  screenshot: String,
  screenshotUrl: String,
  players: Array,
  downloads: Array
});

export default model('Episode', episodeSchema);