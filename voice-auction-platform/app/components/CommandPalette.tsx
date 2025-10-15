"use client";

import type React from "react";
import { useState, useEffect } from "react";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import {
  Search,
  TrendingUp,
  Gavel,
  User,
  Settings,
  Sparkles,
  Clock,
  IndianRupee,
  Zap,
} from "lucide-react";
import GlassCard from "./GlassCard";
import { useRouter } from "next/navigation";

interface CommandPaletteProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  auctions: any[];
}

interface Command {
  id: string;
  title: string;
  description: string;
  icon: React.ComponentType<any>;
  action: string;
  category: "search" | "navigation" | "action";
  shortcut?: string;
  href?: string;
}

export default function CommandPalette({
  open,
  onOpenChange,
  auctions,
}: CommandPaletteProps) {
  const router = useRouter();
  const [query, setQuery] = useState("");
  const [selectedIndex, setSelectedIndex] = useState(0);

  const commands: Command[] = [
    {
      id: "search-trending",
      title: "Show Trending Auctions",
      description: "View the most popular items right now",
      icon: TrendingUp,
      action: "trending",
      category: "search",
    },
    {
      id: "search-luxury",
      title: "Search Luxury Watches",
      description: "Find premium timepieces",
      icon: Search,
      action: "search-luxury",
      category: "search",
    },
    {
      id: "create-auction",
      title: "Create New Auction",
      description: "List your item for bidding",
      icon: Gavel,
      action: "create",
      category: "action",
      shortcut: "⌘N",
      href: "/create",
    },
    {
      id: "profile",
      title: "View Profile",
      description: "Check your bids and listings",
      icon: User,
      action: "profile",
      category: "navigation",
      shortcut: "⌘P",
    },
    {
      id: "settings",
      title: "Settings",
      description: "Customize your experience",
      icon: Settings,
      action: "settings",
      category: "navigation",
      shortcut: "⌘S,",
    },
  ];

  const filteredCommands = commands.filter(
    (command) =>
      command.title.toLowerCase().includes(query.toLowerCase()) ||
      command.description.toLowerCase().includes(query.toLowerCase())
  );

  const filteredAuctions = auctions
    .filter((auction) =>
      auction.title.toLowerCase().includes(query.toLowerCase())
    )
    .slice(0, 3);

  useEffect(() => {
    if (!open) {
      setQuery("");
      setSelectedIndex(0);
    }
  }, [open]);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (!open) return;

      if (e.key === "Escape" || e.key === "/") {
        onOpenChange(false);
      } else if (e.key === "ArrowDown") {
        e.preventDefault();
        setSelectedIndex((prev) =>
          Math.min(
            prev + 1,
            filteredCommands.length + filteredAuctions.length - 1
          )
        );
      } else if (e.key === "ArrowUp") {
        e.preventDefault();
        setSelectedIndex((prev) => Math.max(prev - 1, 0));
      } else if (e.key === "Enter") {
        e.preventDefault();
        // Handle selection
        // window.location.hre
        onOpenChange(false);
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [open, filteredCommands.length, filteredAuctions.length, onOpenChange]);

  const getCategoryColor = (category: string) => {
    switch (category) {
      case "search":
        return "from-blue-500/20 to-cyan-500/20 border-blue-400/30 text-blue-300";
      case "navigation":
        return "from-purple-500/20 to-pink-500/20 border-purple-400/30 text-purple-300";
      case "action":
        return "from-green-500/20 to-emerald-500/20 border-green-400/30 text-green-300";
      default:
        return "from-gray-500/20 to-gray-600/20 border-gray-400/30 text-gray-300";
    }
  };

  if (!open) return null;

  return (
    <>
      {/* Backdrop */}
      <div
        className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50"
        onClick={() => onOpenChange(false)}
      />

      {/* Command Palette */}
      <div className="fixed top-5 left-1/2  bottom-1/2 transform -translate-x-1/2 w-full max-w-2xl z-50 px-4">
        <GlassCard className="overflow-hidden">
          <div className="p-6">
            {/* Search Input */}
            <div className="relative mb-6">
              <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-purple-400 h-5 w-5" />
              <Input
                placeholder="Search auctions, commands, or type to navigate..."
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                className="pl-12 bg-white/5 border-white/20 text-white placeholder-purple-300 focus:border-purple-400 focus:ring-purple-400/50 h-14 text-lg"
                style={{ fontFamily: "var(--font-sora)" }}
                autoFocus
              />
            </div>

            {/* Results */}
            <div className="space-y-4 max-h-96 overflow-y-auto">
              {/* Commands */}
              {filteredCommands.length > 0 && (
                <div>
                  <h3 className="text-sm font-medium text-purple-300 mb-3 flex items-center">
                    <Sparkles className="h-4 w-4 mr-2" />
                    Commands
                  </h3>
                  <div className="space-y-2">
                    {filteredCommands.map((command, index) => (
                      <div
                        key={command.id}
                        className={`p-4 rounded-xl cursor-pointer transition-all duration-200 ${
                          selectedIndex === index
                            ? "bg-gradient-to-r from-purple-500/30 to-cyan-500/30 border border-purple-400/50"
                            : "bg-white/5 hover:bg-white/10 border border-white/10"
                        }`}
                      >
                        <div className="flex items-center space-x-4">
                          <div
                            className={`p-2 rounded-lg bg-gradient-to-r ${getCategoryColor(
                              command.category
                            )} border`}
                          >
                            <command.icon className="h-4 w-4" />
                          </div>
                          <div className="flex-1">
                            <div className="flex items-center justify-between">
                              <h4 className="text-white font-medium">
                                {command.title}
                              </h4>
                              {command.shortcut && (
                                <Badge className="bg-white/10 text-purple-300 text-xs">
                                  {command.shortcut}
                                </Badge>
                              )}
                            </div>
                            <p className="text-purple-300 text-sm">
                              {command.description}
                            </p>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Auctions */}
              {filteredAuctions.length > 0 && (
                <div>
                  <h3 className="text-sm font-medium text-purple-300 mb-3 flex items-center">
                    <Gavel className="h-4 w-4 mr-2" />
                    Auctions
                  </h3>
                  <div className="space-y-2">
                    {filteredAuctions.map((auction, index) => (
                      <div
                        role="button"
                        tabIndex={0}
                        key={auction.id}
                        className={`p-4 rounded-xl cursor-pointer transition-all duration-200 ${
                          selectedIndex === filteredCommands.length + index
                            ? "bg-gradient-to-r from-green-500/30 to-emerald-500/30 border border-green-400/50"
                            : "bg-white/5 hover:bg-white/10 border border-white/10"
                        }`}
                        onClick={() => {
                          // Handle auction selection
                          router.push(`/auction/${auction.id}`);
                          onOpenChange(false);
                        }}
                      >
                        <div className="flex items-center space-x-4">
                          <div className="w-12 h-12 bg-gradient-to-r from-purple-500 to-cyan-500 rounded-lg flex items-center justify-center">
                            <Gavel className="h-5 w-5 text-white" />
                          </div>
                          <div className="flex-1">
                            <h4 className="text-white font-medium">
                              {auction.title}
                            </h4>
                            <div className="flex items-center space-x-4 text-sm text-purple-300">
                              <div className="flex items-center">
                                <IndianRupee className="h-3 w-3 mr-1" />
                                {auction.currentBid.toLocaleString()}
                              </div>
                              <div className="flex items-center">
                                <Clock className="h-3 w-3 mr-1" />
                                {auction.bidCount} bids
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* No Results */}
              {filteredCommands.length === 0 &&
                filteredAuctions.length === 0 &&
                query && (
                  <div className="text-center py-12">
                    <div className="text-4xl mb-4">🔍</div>
                    <h3 className="text-white font-medium mb-2">
                      No results found
                    </h3>
                    <p className="text-purple-300 text-sm">
                      Try searching for something else
                    </p>
                  </div>
                )}
            </div>

            {/* Footer */}
            <div className="flex items-center justify-between pt-4 mt-4 border-t border-white/10 text-xs text-purple-400">
              <div className="flex items-center space-x-4">
                <div className="flex items-center space-x-1">
                  <kbd className="px-2 py-1 bg-white/10 rounded">↑↓</kbd>
                  <span>Navigate</span>
                </div>
                <div className="flex items-center space-x-1">
                  <kbd className="px-2 py-1 bg-white/10 rounded">↵</kbd>
                  <span>Select</span>
                </div>
                <div className="flex items-center space-x-1">
                  <kbd className="px-2 py-1 bg-white/10 rounded">esc</kbd>
                  <span>Close</span>
                </div>
              </div>
              <div className="text-purple-500">Powered by NEXUS AI</div>
            </div>
          </div>
        </GlassCard>
      </div>
    </>
  );
}
