import { Schema, model } from "mongoose";

const episodeSchema = new Schema({
  serie_id: {
    type: String,
    required: true
  },
  episode_number: {
    type: Number,
    required: true
  },
  created_at: {
    type: Date,
    default: Date.now
  },
  visible: Boolean,
  urlName: String,
  language: String,
  hasCustomScreenshot: Boolean,
  screenshot: String,
  customScreenshotUrl: String,
  players: Array,
  downloads: Array
});

export default model('Episode', episodeSchema);