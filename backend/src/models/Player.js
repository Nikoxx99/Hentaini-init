import { Schema, model } from "mongoose";

const playersSchema = new Schema({
  name: String,
  short_name: String,
  player_type: String,
  url: String
});

export default model('Player', playersSchema);