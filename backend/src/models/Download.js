import { Schema, model } from "mongoose";

const downloadSchema = new Schema({
  name: String,
  short_name: String,
  url: String
});

export default model('Download', downloadSchema);