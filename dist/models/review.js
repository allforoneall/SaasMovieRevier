"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Review = void 0;
const mongoose_1 = require("mongoose");
const reviewSchema = new mongoose_1.Schema({
    movieId: { type: mongoose_1.Schema.Types.ObjectId, ref: 'Movie', required: true },
    reviewerName: { type: String, default: 'Anonymous' },
    rating: { type: Number, required: true },
    reviewComments: { type: String, required: true }
});
exports.Review = (0, mongoose_1.model)('Review', reviewSchema);
