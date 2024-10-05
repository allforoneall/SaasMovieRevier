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
exports.deleteMovie = exports.getMovieById = exports.updateMovie = exports.addMovie = exports.getMovies = void 0;
const movie_1 = require("../models/movie");
const getMovies = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const movies = yield movie_1.Movie.find(); // Fetch all movies
        res.json(movies);
    }
    catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Error retrieving movies' });
    }
});
exports.getMovies = getMovies;
// Add a new movie
const addMovie = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const movie = new movie_1.Movie(req.body);
        yield movie.save();
        res.status(201).json(movie);
    }
    catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Error adding movie' });
    }
});
exports.addMovie = addMovie;
// Update an existing movie
const updateMovie = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    try {
        const movie = yield movie_1.Movie.findByIdAndUpdate(id, req.body, { new: true });
        if (movie) {
            res.json(movie);
        }
        else {
            res.status(404).json({ message: 'Movie not found' });
        }
    }
    catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Error updating movie' });
    }
});
exports.updateMovie = updateMovie;
const getMovieById = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const movie = yield movie_1.Movie.findById(req.params.id).populate('reviews');
        if (!movie) {
            res.status(404).json({ error: 'Movie not found' });
            return; // Stop further execution
        }
        res.status(200).json(movie);
    }
    catch (error) {
        res.status(400).json({ error: 'Error fetching movie' });
    }
});
exports.getMovieById = getMovieById;
// Delete a movie
const deleteMovie = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    try {
        const movie = yield movie_1.Movie.findByIdAndDelete(id);
        if (movie) {
            res.json({ message: 'Movie deleted successfully' });
        }
        else {
            res.status(404).json({ message: 'Movie not found' });
        }
    }
    catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Error deleting movie' });
    }
});
exports.deleteMovie = deleteMovie;
