import { Schema, model } from "mongoose";

const viewListSchema = new Schema({
  serie_id: String,
  episode_number: Number,
  user_id: String
});

export default model('ViewList', viewListSchema);