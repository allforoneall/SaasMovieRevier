"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Movie = void 0;
const mongoose_1 = require("mongoose");
const movieSchema = new mongoose_1.Schema({
    name: { type: String, required: true },
    releaseDate: { type: Date, required: true },
    averageRating: { type: String, default: null }
});
exports.Movie = (0, mongoose_1.model)('Movie', movieSchema);
