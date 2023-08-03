import express from "express";
const router = express.Router();
import bookService from "./book.service";

router.use("/books", bookService);

export default router;