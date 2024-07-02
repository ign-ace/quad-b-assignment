import axios from "axios";
import Ticker from "../models/tickers.model.js";

// fetch tickers from API and store in MongoDB
const fetchTickers = async (req, res) => {
  try {
    const response = await axios.get("https://api.wazirx.com/api/v2/tickers");
    const tickers = Object.values(response.data).slice(0, 10);
    // Insert top 10 tickers
    for (const ticker of tickers) {
      const newTicker = new Ticker(ticker);
      await newTicker.save();
    }

    // Return top 10 tickers as JSON
    res.status(200).json({
      sucess: true,
      count: tickers.length,
      tickers: tickers,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      success: false,
      message: "Error fetching tickers",
    });
  }
};

// get top 10 tickers from MongoDB and render in index.ejs
const getTickers = async (req, res) => {
  try {
    var tickers = await Ticker.find();
    tickers = tickers.slice(0, 10);

    // Calculate average price of top 10 tickers
    let averagePrice = 0;
    for (const ticker of tickers) {
      averagePrice += ticker.last;
    }
    averagePrice = averagePrice / tickers.length;

    // get index.ejs with top 10 tickers and average price
    res.render("index", {
      data: tickers,
      averagePrice: Math.floor(averagePrice),
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      success: false,
      message: "Error retrieving stored tickers",
    });
  }
};

// Delete all tickers from MongoDB
const deleteAllTickers = async (req, res) => {
  try {
    // Delete all tickers from MongoDB
    await Ticker.deleteMany();
    res.status(200).json({
      success: true,
      message: "All tickers deleted in the database",
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      success: false,
      message: "Error deleting tickers",
    });
  }
};

export { fetchTickers, getTickers, deleteAllTickers };
