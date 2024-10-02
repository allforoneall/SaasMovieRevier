import { Request, Response } from 'express';
import { Review } from '../models/review';
import { Movie } from '../models/movie';

export const getReviews = async (req: Request, res: Response) => {
  const { movieId } = req.params;
  const reviews = await Review.find({ movieId });
  res.json(reviews);
};

export const addReview = async (req: Request, res: Response) => {
  const review = new Review(req.body);
  await review.save();
  const reviews = await Review.find({ movieId: req.body.movieId });
  const averageRating = reviews.reduce((acc, review) => acc + review.rating, 0) / reviews.length;
  await Movie.findByIdAndUpdate(req.body.movieId, { averageRating });
  res.status(201).json(review);
};

export const updateReview = async (req: Request, res: Response) => {
  const { id } = req.params;
  const review = await Review.findByIdAndUpdate(id, req.body, { new: true });
  if (review) {
    const reviews = await Review.find({ movieId: review.movieId });
    const averageRating = reviews.reduce((acc, review) => acc + review.rating, 0) / reviews.length;
    await Movie.findByIdAndUpdate(review.movieId, { averageRating });
    res.json(review);
  } else {
    res.status(404).send('Review not found');
  }
};

export const deleteReview = async (req: Request, res: Response) => {
  const { id } = req.params;
  const review = await Review.findByIdAndDelete(id);
  if (review) {
    const reviews = await Review.find({ movieId: review.movieId });
    const averageRating = reviews.length ? reviews.reduce((acc, review) => acc + review.rating, 0) / reviews.length : null;
    await Movie.findByIdAndUpdate(review.movieId, { averageRating });
    res.status(204).send();
  } else {
    res.status(404).send('Review not found');
  }
};
