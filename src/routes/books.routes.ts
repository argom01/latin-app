import express from 'express';
import * as booksControllers from 'controllers/books.controllers';
import { user } from 'middleware/auth.middleware';

const router = express.Router();

router.post('/', user, booksControllers.addBook);

export default router;
