import { Schema, model } from "mongoose";

const genreSchema = new Schema({
  name: {
    type: String,
    required: true
  }
});

export default model('Genre', genreSchema);