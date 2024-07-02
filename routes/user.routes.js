import express from "express";
import {
  deleteAllTickers,
  fetchTickers,
  getTickers,
} from "../controllers/user.controllers.js";

const router = express.Router();

// route to fetch data from api
router.get("/fetch/ticker", fetchTickers);

// route for retrieval of data from mongoDB
router.get("/get/ticker", getTickers);

// route to delete data from DB
router.delete("/delete/ticker", deleteAllTickers);

export default router;
