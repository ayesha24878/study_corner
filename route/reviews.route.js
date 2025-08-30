import { Router } from 'express';
import { z } from 'zod';
import { Review } from '../models/Review.js';
import { Book } from '../models/Book.js';
import { requireAuth } from '../utils/auth.js';

export const router = Router();

router.get('/book/:bookId', async (req, res, next) => {
  try {
    const reviews = await Review.find({ book: req.params.bookId }).populate('user', 'name avatarUrl');
    res.json(reviews);
  } catch (e) { next(e); }
});

router.post('/', requireAuth, async (req, res, next) => {
  try {
    const schema = z.object({ book: z.string(), rating: z.number().min(1).max(5), body: z.string().min(5) });
    const { book, rating, body } = schema.parse(req.body);
    const review = await Review.create({ book, user: req.user._id, rating, body });
    // update aggregate
    const agg = await Review.aggregate([
      { $match: { book: review.book } },
      { $group: { _id: '$book', avg: { $avg: '$rating' }, count: { $sum: 1 } } }
    ]);
    await Book.findByIdAndUpdate(review.book, { avgRating: agg[0].avg, ratingCount: agg[0].count });
    res.status(201).json(review);
  } catch (e) { next(e); }
});

router.post('/:id/comments', requireAuth, async (req, res, next) => {
  try {
    const schema = z.object({ body: z.string().min(1) });
    const { body } = schema.parse(req.body);
    const review = await Review.findById(req.params.id);
    if (!review) return res.status(404).json({ error: 'Not found' });
    review.comments.push({ user: req.user._id, body });
    await review.save();
    res.status(201).json(review);
  } catch (e) { next(e); }
});
