const express = require("express");
const router = express.Router();
const {
  getAllAuctions,
  getAuctionById,
  createAuction,
  placeBid,
  deleteAuction
} = require("../controllers/auctionController");

// GET all auctions
router.get("/auctions", getAllAuctions);

// GET single auction
router.get("/auction/:id", getAuctionById);

// POST new auction
router.post("/auction", createAuction);

// POST new bid
router.post("/auction/:id/bid", placeBid);

// DELETE auction
router.delete("/auction/:id", deleteAuction);

module.exports = router;