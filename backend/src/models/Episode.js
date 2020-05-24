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
  players: Array,
  downloads:Array
});

export default model('Episode', episodeSchema);