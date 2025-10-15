const express = require("express");
const cors = require("cors");
require("dotenv").config();

// Import routes
const auctionRoutes = require("./routes/auctionRoutes");

const app = express();

const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(express.json());


// Routes
app.use("/api", auctionRoutes);


app.listen(PORT, () => {
  console.log(`🚀 Voice Auction Server is running on https://inpad5i8xe.execute-api.ap-south-1.amazonaws.com/prod`);
  console.log(`📡 API Endpoints:`);
  console.log(`   GET  /api/auctions - Get all auctions`);
  console.log(`   GET  /api/auction/:id - Get single auction`);
  console.log(`   POST /api/auction - Create new auction`);
  console.log(`   POST /api/auction/:id/bid - Place bid`);
});