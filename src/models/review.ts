import { Schema, model } from 'mongoose';

const reviewSchema = new Schema({
  movieId: { type: Schema.Types.ObjectId, ref: 'Movie', required: true },
  reviewerName: { type: String, default: 'Anonymous' },
  rating: { type: Number, required: true },
  reviewComments: { type: String, required: true }
});

export const Review = model('Review', reviewSchema);
