// src/models/Auction.js
class Auction {
  constructor(data) {
    this.id = data.id || String(Date.now());
    this.title = data.title;
    this.description = data.description;
    this.startingBid = parseInt(data.startingBid);
    this.currentBid = parseInt(data.currentBid || data.startingBid);
    this.endTime = data.endTime;
    this.category = data.category || "General";
    this.image = data.image || "https://images.pexels.com/photos/3184298/pexels-photo-3184298.jpeg";
    this.bidCount = data.bidCount || 0;
    this.seller = data.seller || { name: "System", rating: 5, verified: true };
    this.history = data.history || [
      { 
        user: "System", 
        bid: this.startingBid, 
        time: new Date().toISOString() 
      }
    ];
    this.status = data.status || "active";
    this.createdAt = data.createdAt || new Date().toISOString();
    this.createdBy = data.createdBy || "System";
  }

  addBid(user, amount) {
    if (amount <= this.currentBid) {
      throw new Error("Bid must be higher than current bid");
    }
    if (new Date() > new Date(this.endTime)) {
      throw new Error("Auction has ended");
    }

    this.currentBid = amount;
    this.bidCount += 1;
    this.history.push({
      user: user || "Anonymous",
      bid: amount,
      time: new Date().toISOString()
    });
    return this;
  }

  isExpired() {
    return new Date() > new Date(this.endTime);
  }

  getTimeLeft() {
    const now = new Date().getTime();
    const end = new Date(this.endTime).getTime();
    const diff = end - now;
    if (diff <= 0) return "Ended";
    const hours = Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
    const seconds = Math.floor((diff % (1000 * 60)) / 1000);
    return `${hours}h ${minutes}m ${seconds}s`;
  }

  toJSON() {
    return {
      id: this.id,
      title: this.title,
      description: this.description,
      startingBid: this.startingBid,
      currentBid: this.currentBid,
      endTime: this.endTime,
      category: this.category,
      image: this.image,
      bidCount: this.bidCount,
      isHot: this.isHot,
      isTrending: this.isTrending,
      isWinning: this.isWinning,
      isOutbid: this.isOutbid,
      rarity: this.rarity,
      views: this.views,
      likes: this.likes,
      seller: this.seller,
      history: this.history,
      status: this.status,
      createdAt: this.createdAt,
      createdBy: this.createdBy,
      timeLeft: this.getTimeLeft(),
      isExpired: this.isExpired()
    };
  }
}

module.exports = Auction;
