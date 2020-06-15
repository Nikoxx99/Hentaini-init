import { Schema, model } from "mongoose";

const episodeSchema = new Schema({
  urlName: String,
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
  hasCustomScreenshot: Boolean,
  screenshot: String,
  customScreenshotUrl: String,
  players: Array,
  downloads: Array
});

export default model('Episode', episodeSchema);