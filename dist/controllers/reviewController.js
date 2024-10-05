"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteReview = exports.updateReview = exports.addReview = exports.getReviews = void 0;
const review_1 = require("../models/review");
const movie_1 = require("../models/movie");
const getReviews = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { movieId } = req.params;
    const reviews = yield review_1.Review.find({ movieId });
    res.json(reviews);
});
exports.getReviews = getReviews;
const addReview = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const review = new review_1.Review(req.body);
    yield review.save();
    const reviews = yield review_1.Review.find({ movieId: req.body.movieId });
    const movie = yield movie_1.Movie.findById(req.body.movieId);
    //@ts-ignore
    movie.reviews.push(review._id);
    //@ts-ignore
    movie.save();
    const averageRating = reviews.reduce((acc, review) => acc + review.rating, 0) / reviews.length;
    yield movie_1.Movie.findByIdAndUpdate(req.body.movieId, { averageRating });
    res.status(201).json(review);
});
exports.addReview = addReview;
const updateReview = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    const review = yield review_1.Review.findByIdAndUpdate(id, req.body, { new: true });
    if (review) {
        const reviews = yield review_1.Review.find({ movieId: review.movieId });
        const averageRating = reviews.reduce((acc, review) => acc + review.rating, 0) / reviews.length;
        yield movie_1.Movie.findByIdAndUpdate(review.movieId, { averageRating });
        res.json(review);
    }
    else {
        res.status(404).send('Review not found');
    }
});
exports.updateReview = updateReview;
const deleteReview = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    const review = yield review_1.Review.findByIdAndDelete(id);
    if (review) {
        const reviews = yield review_1.Review.find({ movieId: review.movieId });
        const averageRating = reviews.length ? reviews.reduce((acc, review) => acc + review.rating, 0) / reviews.length : null;
        yield movie_1.Movie.findByIdAndUpdate(review.movieId, { averageRating });
        res.status(204).send();
    }
    else {
        res.status(404).send('Review not found');
    }
});
exports.deleteReview = deleteReview;
