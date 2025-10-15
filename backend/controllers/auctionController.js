const Auction = require("../models/Auction");

// In-memory storage (replace with DB in production)
let auctions = [
  new Auction({
    id: "1",
    title: "iPhone 14 Pro Max - 256GB",
    description: "Brand new iPhone 14 Pro Max in Deep Purple.",
    startingBid: 50000,
    currentBid: 75000,
    endTime: new Date(Date.now() + 3600000).toISOString(),
    category: "Electronics",
    image: "https://images.pexels.com/photos/788946/pexels-photo-788946.jpeg",
    bidCount: 3,
    rarity: "rare",
    views: 102,
    likes: 24,
    seller: { name: "Rajesh Kumar", rating: 4.5, verified: true },
    isTrending: true,
    isHot: true
  }),
  new Auction({
    id: "2",
    title: "Vintage Rolex Submariner",
    description: "1970s Rolex Submariner in excellent condition.",
    startingBid: 200000,
    currentBid: 390000,
    endTime: new Date(Date.now() + 7200000).toISOString(),
    category: "Luxury",
    image: "https://images.pexels.com/photos/190819/pexels-photo-190819.jpeg",
    bidCount: 4,
    rarity: "legendary",
    views: 220,
    likes: 47,
    seller: { name: "Vikram Singh", rating: 5, verified: true },
    isTrending: true
  }),
  new Auction({
    id: "3",
    title: "Bose Noise Cancelling Headphones 700",
    description: "Premium wireless headphones with 11 levels of noise cancellation.",
    startingBid: 12000,
    currentBid: 15500,
    endTime: new Date(Date.now() + 1800000).toISOString(),
    category: "Audio",
    image: "https://images.pexels.com/photos/374870/pexels-photo-374870.jpeg",
    bidCount: 2,
    rarity: "common",
    views: 66,
    likes: 10,
    seller: { name: "Sneha Mehta", rating: 4.2, verified: false }
  }),
  new Auction({
    id: "4",
    title: "Signed Sachin Tendulkar Bat",
    description: "Autographed cricket bat by legend Sachin Tendulkar. Collector’s item.",
    startingBid: 100000,
    currentBid: 250000,
    endTime: new Date(Date.now() + 5400000).toISOString(),
    category: "Sports Memorabilia",
    image: "https://images.pexels.com/photos/267202/pexels-photo-267202.jpeg",
    bidCount: 6,
    rarity: "legendary",
    views: 400,
    likes: 92,
    seller: { name: "Cricket Vault", rating: 4.9, verified: true },
    isHot: true
  })
];

const getAllAuctions = (req, res) => {
  try {
    console.log("✅ GET /api/auctions called");
    res.json(auctions.map(a => a.toJSON()));
  } catch (err) {
    console.error("❌ Error fetching auctions:", err);
    res.status(500).json({ error: "Failed to fetch auctions" });
  }
};

const getAuctionById = (req, res) => {
  try {
    const { id } = req.params;
    const auction = auctions.find(a => a.id === id);
    if (!auction) return res.status(404).json({ error: "Auction not found" });

    auction.views += 1;
    console.log(`👁️ Viewed: ${auction.title}`);
    res.json(auction.toJSON());
  } catch (err) {
    console.error("❌ Error fetching auction:", err);
    res.status(500).json({ error: "Failed to fetch auction" });
  }
};

const createAuction = (req, res) => {
  try {
    const {
      title,
      description,
      startingBid,
      endTime,
      category,
      image,
      createdBy,
      seller,
    } = req.body;

    if (!title || !description || !startingBid || !endTime) {
      return res.status(400).json({ error: "Missing required auction fields" });
    }

    const newAuction = new Auction({
      title,
      description,
      startingBid,
      endTime,
      category,
      image,
      createdBy: createdBy || "Voice Assistant",
      seller: seller || { name: "Voice Bot", rating: 0, verified: false },
    });

    auctions.unshift(newAuction);
    console.log("🆕 Created:", newAuction.title);
    res.status(201).json(newAuction.toJSON());
  } catch (err) {
    console.error("❌ Error creating auction:", err);
    res.status(500).json({ error: "Failed to create auction" });
  }
};

const placeBid = (req, res) => {
  try {
    const { id } = req.params;
    const { user, amount } = req.body;

    const auction = auctions.find(a => a.id === id);
    if (!auction) {
      return res.status(404).json({ error: "Auction not found" });
    }

    const bidAmount = parseInt(amount);
    auction.addBid(user, bidAmount);

    console.log(`💰 ${user || "Anonymous"} bid ₹${bidAmount} on ${auction.title}`);
    res.json({
      message: "Bid accepted",
      currentBid: bidAmount,
      auction: auction.toJSON()
    });
  } catch (err) {
    console.error("❌ Error placing bid:", err.message);
    res.status(400).json({
      error: err.message,
      currentBid: auctions.find(a => a.id === req.params.id)?.currentBid
    });
  }
};

const deleteAuction = (req, res) => {
  try {
    const { id } = req.params;
    const index = auctions.findIndex(a => a.id === id);
    if (index === -1) return res.status(404).json({ error: "Auction not found" });

    const deleted = auctions.splice(index, 1)[0];
    console.log("🗑️ Deleted:", deleted.title);
    res.json({ message: "Auction deleted", auction: deleted.toJSON() });
  } catch (err) {
    console.error("❌ Error deleting auction:", err);
    res.status(500).json({ error: "Failed to delete auction" });
  }
};

module.exports = {
  getAllAuctions,
  getAuctionById,
  createAuction,
  placeBid,
  deleteAuction
};
