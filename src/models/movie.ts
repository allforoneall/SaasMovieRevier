import { Schema, model } from 'mongoose';

const movieSchema = new Schema({
  name: { type: String, required: true },
  releaseDate: { type: Date, required: true },
  averageRating: { type: String, default: null }
});

export const Movie = model('Movie', movieSchema);
