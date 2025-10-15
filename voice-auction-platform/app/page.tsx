"use client";

import axios from "axios";
import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import {
  Search,
  Zap,
  TrendingUp,
  Clock,
  IndianRupee,
  Sparkles,
  Crown,
  FlameIcon as Fire,
  Users,
  Eye,
  Heart,
  Star,
} from "lucide-react";
import Image from "next/image";
import GlassCard from "./components/GlassCard";
import BidStream from "./components/BidStream";
import CommandPalette from "./components/CommandPalette";
import GlowingButton from "./components/GlowingButton";
import { formatTimeLeft } from "./lib/utils";
import { set } from "react-hook-form";

interface Auction {
  id: string;
  title: string;
  description: string;
  currentBid: number;
  startingBid: number;
  endTime: string;
  category: string;
  image: string;
  bidCount: number;
  rarity: "common" | "rare" | "legendary";
  views: number;
  likes: number;
  seller: {
    name: string;
    rating: number;
    verified: boolean;
  };
}
const mockAuction: Auction[] = [
  {
    id: "1",
    title: "Quantum Rolex",
    description: "A limited edition quantum-powered Rolex watch.",
    currentBid: 125000,
    startingBid: 100000,
    endTime: new Date(Date.now() + 3600000).toISOString(),
    category: "Luxury",
    image: "/quantum-rolex.jpg",
    bidCount: 5,
    rarity: "common",
    views: 1500,
    likes: 300,
    seller: {
      name: "CryptoKing",
      rating: 4.9,
      verified: true,
    },
  },
  {
    id: "2",
    title: "Neo-Byzantine Art",
    description:
      "An exquisite piece of Neo-Byzantine art from the 22nd century.",
    currentBid: 89000,
    startingBid: 80000,
    endTime: new Date(Date.now() + 7200000).toISOString(),
    category: "Art",
    image: "/neo-byzantine-art.jpg",
    bidCount: 3,
    rarity: "rare",
    views: 2000,
    likes: 500,
    seller: {
      name: "ArtCollector",
      rating: 4.8,
      verified: false,
    },
  },
];
export default function FuturisticAuctionPlatform() {
  const [auctions, setAuctions] = useState<Auction[]>([]);
  const [filteredAuctions, setFilteredAuctions] = useState<Auction[]>([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [loading, setLoading] = useState(true);
  const [commandPaletteOpen, setCommandPaletteOpen] = useState(false);

  //set dummy data
  useEffect(() => {
    const fetchAuctions = async () => {
      try {
        const res = await axios.get(
          "https://inpad5i8xe.execute-api.ap-south-1.amazonaws.com/prod/api/auctions"
        );
        setAuctions(res.data);
        setFilteredAuctions(res.data);
      } catch (error) {
        console.error("❌ Failed to fetch auctions:", error);
      } finally {
        setLoading(false);
      }
    };

    const intervalId = setInterval(fetchAuctions, 1000);

    return () => clearInterval(intervalId);
  }, []);

  //search functionality
  useEffect(() => {
    const filtered = auctions.filter(
      (auction) =>
        auction.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        auction.description.toLowerCase().includes(searchTerm.toLowerCase())
    );
    setFilteredAuctions(filtered);
  }, [auctions, searchTerm]);

  // Keyboard shortcut for command palette - '/'
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "/") {
        e.preventDefault();
        setCommandPaletteOpen(true);
      }
    };
    if (commandPaletteOpen) {
    }
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, []);

  const getRarityColor = (rarity: string) => {
    switch (rarity) {
      case "legendary":
        return "from-yellow-400 via-orange-500 to-red-500";
      case "rare":
        return "from-purple-400 via-blue-500 to-cyan-500";
      default:
        return "from-gray-400 to-gray-600";
    }
  };

  const getRarityGlow = (rarity: string) => {
    switch (rarity) {
      case "legendary":
        return "shadow-[0_0_30px_rgba(251,191,36,0.5)]";
      case "rare":
        return "shadow-[0_0_20px_rgba(147,51,234,0.4)]";
      default:
        return "shadow-[0_0_10px_rgba(107,114,128,0.3)]";
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 flex items-center justify-center">
        <div className="relative">
          <div className="w-32 h-32 border-4 border-purple-500/30 rounded-full"></div>
          <div className="absolute top-0 left-0 w-32 h-32 border-4 border-purple-400 rounded-full border-t-transparent"></div>
          <div className="absolute inset-0 w-32 h-32 border-2 border-cyan-400/50 rounded-full"></div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 relative overflow-hidden">
      {/* Static Background Blobs */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute -top-40 -right-40 w-80 h-80 bg-purple-500/20 rounded-full blur-3xl" />
        <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-cyan-500/20 rounded-full blur-3xl" />
        <div className="absolute top-1/2 left-1/2 w-60 h-60 bg-pink-500/10 rounded-full blur-3xl" />
      </div>

      {/* Glassmorphic Header */}
      <header className="sticky top-0 z-50 backdrop-blur-xl bg-white/5 border-b border-white/10">
        <div className="max-w-7xl mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-6">
              <h1
                className="text-3xl font-bold bg-gradient-to-r from-white via-purple-200 to-cyan-200 bg-clip-text text-transparent"
                style={{ fontFamily: "var(--font-space-grotesk)" }}
              >
                NEXUS AUCTIONS
              </h1>
              <Badge className="bg-gradient-to-r from-purple-500/20 to-cyan-500/20 text-purple-200 border border-purple-400/30 backdrop-blur-sm">
                <Zap className="h-3 w-3 mr-1" />
                {auctions.length} Live
              </Badge>
            </div>

            <div className="flex items-center space-x-4">
              <GlowingButton href="/create" variant="primary">
                <Sparkles className="h-4 w-4 mr-2" />
                Create Auction
              </GlowingButton>
              <GlowingButton href="/admin" variant="primary">
                <Crown className="h-4 w-4 mr-2" />
                Admin
              </GlowingButton>
            </div>
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-6 py-8">
        {/* Search Section */}
        <div className="mb-12">
          <GlassCard className="p-6">
            <div className="flex items-center space-x-4">
              <div className="flex-1 relative">
                <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-purple-300 h-5 w-5" />
                <Input
                  placeholder="Search quantum treasures..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-12 bg-white/5 border-white/20 text-white placeholder-purple-300 focus:border-purple-400 focus:ring-purple-400/50 h-12 text-lg backdrop-blur-sm"
                  style={{ fontFamily: "var(--font-sora)" }}
                />
              </div>
              <Button
                onClick={() => setCommandPaletteOpen(true)}
                className="bg-gradient-to-r from-purple-600/20 to-cyan-600/20 hover:from-purple-600/30 hover:to-cyan-600/30 border border-purple-400/30 text-purple-200 backdrop-blur-sm h-12 px-6"
              >
                <kbd className="mr-2 px-2 py-1 text-xs bg-white/10 rounded">
                  /
                </kbd>
                Command
              </Button>
            </div>
          </GlassCard>
        </div>

        {/* Stats Bar */}
        {/* Need To Change */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-12">
          {[
            {
              label: "Active Auctions",
              value: 247,
              icon: Fire,
              color: "from-red-500 to-orange-500",
            },
            {
              label: "Total Bids",
              value: 12847,
              icon: TrendingUp,
              color: "from-green-500 to-emerald-500",
            },
            {
              label: "Live Bidders",
              value: 1834,
              icon: Users,
              color: "from-blue-500 to-cyan-500",
            },
            {
              label: "Volume Today",
              value: 2.4,
              icon: IndianRupee,
              color: "from-purple-500 to-pink-500",
              suffix: "M",
            },
          ].map((stat, index) => (
            <GlassCard key={stat.label} className="p-6 text-center">
              <div
                className={`inline-flex items-center justify-center w-12 h-12 rounded-full bg-gradient-to-r ${stat.color} mb-4`}
              >
                <stat.icon className="h-6 w-6 text-white" />
              </div>
              <div className="text-2xl font-bold text-white mb-1">
                {stat.value.toLocaleString()}
                {stat.suffix}
              </div>
              <div className="text-purple-300 text-sm">{stat.label}</div>
            </GlassCard>
          ))}
        </div>

        {/* Main Content Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          {/* Auction Cards */}
          <div className="lg:col-span-3">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {filteredAuctions.map((auction) => (
                <div key={auction.id} className="relative group">
                  <GlassCard
                    className={`overflow-hidden ${getRarityGlow(
                      auction.rarity
                    )} transition-all duration-300 hover:scale-105`}
                  >
                    <div className="relative">
                      {/* Rarity Border */}
                      <div
                        className={`absolute inset-0 bg-gradient-to-r ${getRarityColor(
                          auction.rarity
                        )} opacity-20 rounded-t-xl`}
                      />

                      {/* Image Container */}
                      <div className="relative overflow-hidden rounded-t-xl">
                        <Image
                          src={auction.image || "/placeholder.svg"}
                          alt={auction.title}
                          width={400}
                          height={300}
                          className="w-full h-64 object-cover"
                        />

                        {/* Countdown Timer */}
                        <div className="absolute top-4 right-4">
                          <div className="px-3 py-1 bg-black/50 backdrop-blur-sm text-white text-xs font-mono rounded-full border border-white/20">
                            <Clock className="h-3 w-3 inline mr-1" />
                            {formatTimeLeft(auction.endTime)}
                          </div>
                        </div>

                        {/* Hover Overlay */}
                        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent flex items-end justify-center pb-6 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                          <GlowingButton
                            href={`/auction/${auction.id}`}
                            variant="primary"
                            size="sm"
                          >
                            View Details →
                          </GlowingButton>
                        </div>
                      </div>

                      {/* Card Content */}
                      <div className="p-6">
                        <div className="flex items-start justify-between mb-4">
                          <div className="flex-1">
                            <h3
                              className="text-xl font-bold text-white mb-2 line-clamp-1"
                              style={{
                                fontFamily: "var(--font-space-grotesk)",
                              }}
                            >
                              {auction.title}
                            </h3>
                            <p className="text-purple-300 text-sm line-clamp-2 mb-3">
                              {auction.description}
                            </p>
                          </div>
                          {/* <Badge
                            className={`bg-gradient-to-r ${getRarityColor(
                              auction.rarity
                            )} text-white border-0 ml-2`}
                          >
                            {auction.rarity.toUpperCase()}
                          </Badge> */}
                        </div>

                        {/* Current Bid */}
                        <div className="bg-gradient-to-r from-green-500/20 to-emerald-500/20 border border-green-400/30 rounded-xl p-4 mb-4">
                          <div className="flex justify-between items-center">
                            <span className="text-green-300 text-sm font-medium">
                              Current Bid
                            </span>
                            <div className="flex items-center text-2xl font-bold text-green-400">
                              <IndianRupee className="h-6 w-6" />
                              {auction.currentBid.toLocaleString()}
                            </div>
                          </div>
                        </div>

                        {/* Stats Row */}
                        <div className="flex items-center justify-between text-sm text-purple-300">
                          <div className="flex items-center space-x-4">
                            <div className="flex items-center">
                              <Users className="h-4 w-4 mr-1" />
                              {auction.bidCount}
                            </div>
                            <div className="flex items-center">
                              <Eye className="h-4 w-4 mr-1" />
                              {auction.views}
                            </div>
                            <div className="flex items-center">
                              <Heart className="h-4 w-4 mr-1" />
                              {auction.likes}
                            </div>
                          </div>
                          <div className="flex items-center">
                            <Star className="h-3 w-3 mr-1 text-yellow-400" />
                            {auction.seller.rating}
                            {auction.seller.verified && (
                              <Badge className="ml-2 bg-blue-500/20 text-blue-300 text-xs">
                                ✓
                              </Badge>
                            )}
                          </div>
                        </div>
                      </div>
                    </div>
                  </GlassCard>
                </div>
              ))}
            </div>

            {filteredAuctions.length === 0 && (
              // <div className="text-center py-20">
              //   <div className="text-6xl mb-4">🔍</div>
              //   <h3 className="text-2xl font-bold text-white mb-2">
              //     No Auctions found
              //   </h3>
              //   <p className="text-purple-300">
              //     Create auctions simply by using our voice agent.
              //   </p>
              // </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                {mockAuction.map((auction) => (
                  <div key={auction.id} className="relative group">
                    <GlassCard
                      className={`overflow-hidden ${getRarityGlow(
                        auction.rarity
                      )} transition-all duration-300 hover:scale-105`}
                    >
                      <div className="relative">
                        {/* Rarity Border */}
                        <div
                          className={`absolute inset-0 bg-gradient-to-r ${getRarityColor(
                            auction.rarity
                          )} opacity-20 rounded-t-xl`}
                        />

                        {/* Image Container */}
                        <div className="relative overflow-hidden rounded-t-xl">
                          <Image
                            src={auction.image || "/placeholder.svg"}
                            alt={auction.title}
                            width={400}
                            height={300}
                            className="w-full h-64 object-cover"
                          />

                          {/* Countdown Timer */}
                          <div className="absolute top-4 right-4">
                            <div className="px-3 py-1 bg-black/50 backdrop-blur-sm text-white text-xs font-mono rounded-full border border-white/20">
                              <Clock className="h-3 w-3 inline mr-1" />
                              {formatTimeLeft(auction.endTime)}
                            </div>
                          </div>

                          {/* Hover Overlay */}
                          <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent flex items-end justify-center pb-6 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                            <GlowingButton
                              href={`/auction/${auction.id}`}
                              variant="primary"
                              size="sm"
                            >
                              View Details →
                            </GlowingButton>
                          </div>
                        </div>

                        {/* Card Content */}
                        <div className="p-6">
                          <div className="flex items-start justify-between mb-4">
                            <div className="flex-1">
                              <h3
                                className="text-xl font-bold text-white mb-2 line-clamp-1"
                                style={{
                                  fontFamily: "var(--font-space-grotesk)",
                                }}
                              >
                                {auction.title}
                              </h3>
                              <p className="text-purple-300 text-sm line-clamp-2 mb-3">
                                {auction.description}
                              </p>
                            </div>
                            {/* <Badge
                            className={`bg-gradient-to-r ${getRarityColor(
                              auction.rarity
                            )} text-white border-0 ml-2`}
                          >
                            {auction.rarity.toUpperCase()}
                          </Badge> */}
                          </div>

                          {/* Current Bid */}
                          <div className="bg-gradient-to-r from-green-500/20 to-emerald-500/20 border border-green-400/30 rounded-xl p-4 mb-4">
                            <div className="flex justify-between items-center">
                              <span className="text-green-300 text-sm font-medium">
                                Current Bid
                              </span>
                              <div className="flex items-center text-2xl font-bold text-green-400">
                                <IndianRupee className="h-6 w-6" />
                                {auction.currentBid.toLocaleString()}
                              </div>
                            </div>
                          </div>

                          {/* Stats Row */}
                          <div className="flex items-center justify-between text-sm text-purple-300">
                            <div className="flex items-center space-x-4">
                              <div className="flex items-center">
                                <Users className="h-4 w-4 mr-1" />
                                {auction.bidCount}
                              </div>
                              <div className="flex items-center">
                                <Eye className="h-4 w-4 mr-1" />
                                {auction.views}
                              </div>
                              <div className="flex items-center">
                                <Heart className="h-4 w-4 mr-1" />
                                {auction.likes}
                              </div>
                            </div>
                            <div className="flex items-center">
                              <Star className="h-3 w-3 mr-1 text-yellow-400" />
                              {auction.seller.rating}
                              {auction.seller.verified && (
                                <Badge className="ml-2 bg-blue-500/20 text-blue-300 text-xs">
                                  ✓
                                </Badge>
                              )}
                            </div>
                          </div>
                        </div>
                      </div>
                    </GlassCard>
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Sidebar - Bid Stream */}
          <div className="lg:col-span-1">
            <BidStream />
          </div>
        </div>
      </main>

      {/* Command Palette */}
      <CommandPalette
        open={commandPaletteOpen}
        onOpenChange={setCommandPaletteOpen}
        auctions={auctions}
      />
    </div>
  );
}
