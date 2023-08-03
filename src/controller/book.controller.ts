import { Request, Response } from "express";
import pool from "../entity/DB";
import { Pool, Client } from "pg";

export const getBooks = async (req: Request, res: Response) => {
  try {
    const perPage = 10; // Number of items per page
    const client = await pool.connect();

    // Get total count of rows in the 'books' table
    const totalCountQuery = await client.query(
      `SELECT COUNT(*) AS total FROM books`
    );
    const totalBooks = parseInt(totalCountQuery.rows[0].total, 10);

    const page = parseInt(req.query.page as string) || 1; // Get the page number from query parameter
    const offset = (page - 1) * perPage; // Calculate offset

    // Query the database for paginated data
    const result = await client.query(
      `SELECT * FROM books OFFSET $1 LIMIT $2`,
      [offset, perPage]
    );
    const books = result.rows;

    res.status(200).json({
      page,
      perPage,
      totalBooks,
      totalPages: Math.ceil(totalBooks / perPage), // Calculate total page count
      books,
    });

    client.release(); // Release the database connection
  } catch (error) {
    console.error("Error fetching books:", error);
    res.status(500).json({
      error: "An error occurred while fetching books",
    });
  }
};
