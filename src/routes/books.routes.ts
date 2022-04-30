import express from 'express';
import * as booksControllers from 'controllers/books.controllers';

const router = express.Router();

router.post('/', booksControllers.addBook);

export default router;
