import { Schema, model } from 'mongoose';

const movieSchema = new Schema({
  name: { type: String, required: true },
  releaseDate: { type: Date, required: true },
  averageRating: { type: String, default: null },
  reviews:{
    type: [Schema.Types.ObjectId],
    ref:'Review'
  }
});

export const Movie = model('Movie', movieSchema);
