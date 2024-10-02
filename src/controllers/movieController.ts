import { Request, Response } from 'express';
import { Movie } from '../models/movie'; // Adjust the path according to your project structure

// Get all movies
export const getMovies = async (req: Request, res: Response) => {
  try {
    const movies = await Movie.find(); // Fetch all movies
    res.json(movies);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Error retrieving movies' });
  }
};

// Add a new movie
export const addMovie = async (req: Request, res: Response) => {
  try {
    const movie = new Movie(req.body);
    await movie.save();
    res.status(201).json(movie);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Error adding movie' });
  }
};

// Update an existing movie
export const updateMovie = async (req: Request, res: Response) => {
  const { id } = req.params;
  try {
    const movie = await Movie.findByIdAndUpdate(id, req.body, { new: true });
    
    if (movie) {
      res.json(movie);
    } else {
      res.status(404).json({ message: 'Movie not found' });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Error updating movie' });
  }
};

// Delete a movie
export const deleteMovie = async (req: Request, res: Response) => {
  const { id } = req.params;
  try {
    const movie = await Movie.findByIdAndDelete(id);
    
    if (movie) {
      res.json({ message: 'Movie deleted successfully' });
    } else {
      res.status(404).json({ message: 'Movie not found' });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Error deleting movie' });
  }
};
