"use client";

import { useState, useEffect } from "react";
import { Badge } from "@/components/ui/badge";
import { IndianRupee, TrendingUp, Users, Zap } from "lucide-react";
import GlassCard from "./GlassCard";

interface BidActivity {
  id: string;
  auctionTitle: string;
  bidder: string;
  amount: number;
  timestamp: Date;
  type: "bid" | "outbid" | "win";
  avatar: string;
}

export default function BidStream() {
  const [activities, setActivities] = useState<BidActivity[]>([]);

  useEffect(() => {
    // Initial activities
    const initialActivities: BidActivity[] = [
      {
        id: "1",
        auctionTitle: "Quantum Rolex",
        bidder: "CryptoKing",
        amount: 125000,
        timestamp: new Date(Date.now() - 30000),
        type: "bid",
        avatar: "🤴",
      },
      {
        id: "2",
        auctionTitle: "Neo-Byzantine Art",
        bidder: "ArtCollector",
        amount: 89000,
        timestamp: new Date(Date.now() - 120000),
        type: "outbid",
        avatar: "🎨",
      },
      {
        id: "3",
        auctionTitle: "Cyber Katana",
        bidder: "SamuraiDAO",
        amount: 67000,
        timestamp: new Date(Date.now() - 180000),
        type: "bid",
        avatar: "⚔️",
      },
    ];

    setActivities(initialActivities);

    // Simulate new activities
    const interval = setInterval(() => {
      const newActivity: BidActivity = {
        id: Date.now().toString(),
        auctionTitle: [
          "Quantum Rolex",
          "Neo-Byzantine Art",
          "Holographic Guitar",
          "Cyber Katana",
        ][Math.floor(Math.random() * 4)],
        bidder: ["CryptoKing", "ArtCollector", "TechSamurai", "QuantumBidder"][
          Math.floor(Math.random() * 4)
        ],
        amount: Math.floor(Math.random() * 100000) + 10000,
        timestamp: new Date(),
        type: ["bid", "outbid"][Math.floor(Math.random() * 2)] as
          | "bid"
          | "outbid",
        avatar: ["🤴", "🎨", "⚔️", "🚀", "💎", "🔥"][
          Math.floor(Math.random() * 6)
        ],
      };

      setActivities((prev) => [newActivity, ...prev.slice(0, 9)]);
    }, 5000);

    return () => clearInterval(interval);
  }, []);

  const formatTimeAgo = (timestamp: Date) => {
    const now = new Date();
    const diffInSeconds = Math.floor(
      (now.getTime() - timestamp.getTime()) / 1000
    );

    if (diffInSeconds < 60) return `${diffInSeconds}s ago`;
    if (diffInSeconds < 3600) return `${Math.floor(diffInSeconds / 60)}m ago`;
    return `${Math.floor(diffInSeconds / 3600)}h ago`;
  };

  const getActivityColor = (type: string) => {
    switch (type) {
      case "bid":
        return "from-green-500/20 to-emerald-500/20 border-green-400/30";
      case "outbid":
        return "from-red-500/20 to-pink-500/20 border-red-400/30";
      case "win":
        return "from-yellow-500/20 to-orange-500/20 border-yellow-400/30";
      default:
        return "from-purple-500/20 to-cyan-500/20 border-purple-400/30";
    }
  };

  const getActivityIcon = (type: string) => {
    switch (type) {
      case "bid":
        return <TrendingUp className="h-4 w-4 text-green-400" />;
      case "outbid":
        return <Zap className="h-4 w-4 text-red-400" />;
      case "win":
        return <Users className="h-4 w-4 text-yellow-400" />;
      default:
        return <TrendingUp className="h-4 w-4 text-purple-400" />;
    }
  };

  return (
    <GlassCard className="p-6 sticky top-24">
      <div className="space-y-6">
        {/* Header */}
        <div className="flex items-center justify-between">
          <h3
            className="text-xl font-bold text-white"
            style={{ fontFamily: "var(--font-space-grotesk)" }}
          >
            Live Activity
          </h3>
          <Badge className="bg-gradient-to-r from-green-500/20 to-emerald-500/20 text-green-300 border border-green-400/30">
            <div className="w-2 h-2 bg-green-400 rounded-full mr-2"></div>
            Live
          </Badge>
        </div>

        {/* Activity Stream */}
        <div className="space-y-3 max-h-96 overflow-y-auto scrollbar-thin scrollbar-thumb-purple-500/20 scrollbar-track-transparent">
          {activities.map((activity) => (
            <div
              key={activity.id}
              className={`p-4 rounded-xl bg-gradient-to-r ${getActivityColor(
                activity.type
              )} border backdrop-blur-sm transition-all duration-300 hover:scale-105`}
            >
              <div className="flex items-start space-x-3">
                <div className="text-2xl">{activity.avatar}</div>

                <div className="flex-1 min-w-0">
                  <div className="flex items-center space-x-2 mb-1">
                    {getActivityIcon(activity.type)}
                    <span className="text-white font-medium text-sm truncate">
                      {/* {activity.bidder} */}
                      Anonymous
                    </span>
                  </div>

                  <p className="text-purple-300 text-xs mb-2 truncate">
                    {activity.auctionTitle}
                  </p>

                  <div className="flex items-center justify-between">
                    <div className="flex items-center text-white font-bold">
                      <IndianRupee className="h-4 w-4" />
                      {activity.amount.toLocaleString()}
                    </div>
                    <span className="text-purple-400 text-xs">
                      {formatTimeAgo(activity.timestamp)}
                    </span>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Stats */}
        <div className="grid grid-cols-2 gap-4 pt-4 border-t border-white/10">
          <div className="text-center">
            <div className="text-2xl font-bold text-white mb-1">247</div>
            <div className="text-purple-300 text-xs">Active Bids</div>
          </div>
          <div className="text-center">
            <div className="text-2xl font-bold text-white mb-1">1834</div>
            <div className="text-purple-300 text-xs">Live Users</div>
          </div>
        </div>
      </div>
    </GlassCard>
  );
}
