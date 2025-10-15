"use client";

import type React from "react";
import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Label } from "@/components/ui/label";
import { ArrowLeft, Upload, Mic, Sparkles, Zap } from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import VoiceButton from "../components/VoiceButton";
import NotificationToast from "../components/NotificationToast";
import { motion, AnimatePresence } from "framer-motion";
import axios from "axios";

interface AuctionForm {
  title: string;
  description: string;
  startingBid: string;
  endTime: string;
  category?: string;
  imageUrl: string;
}

export default function CreateAuctionPage() {
  const router = useRouter();
  const [form, setForm] = useState<AuctionForm>({
    title: "",
    description: "",
    startingBid: "",
    endTime: "",
    category: "",
    imageUrl: "", // Default placeholder image
  });
  const [creating, setCreating] = useState(false);
  const [notification, setNotification] = useState<{
    type: "success" | "error";
    message: string;
  } | null>(null);
  const [focusedField, setFocusedField] = useState<string | null>(null);

  const categories = [
    "Watches",
    "Antiques",
    "Art",
    "Music",
    "Electronics",
    "Jewelry",
    "Collectibles",
    "Other",
  ];

  const handleInputChange = (field: keyof AuctionForm, value: string) => {
    setForm((prev) => ({ ...prev, [field]: value }));
  };

  const handleVoiceInput =
    (field: keyof AuctionForm) => (transcript: string) => {
      handleInputChange(field, transcript);
    };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    // Check required fields
    if (
      !form.title ||
      !form.description ||
      !form.startingBid ||
      !form.endTime
    ) {
      setNotification({
        type: "error",
        message: "Please fill in all required fields",
      });
      return;
    }

    setCreating(true);

    try {
      const res = await axios.post("http://localhost:5000/api/auction", {
        title: form.title,
        description: form.description,
        startingBid: Number(form.startingBid),
        endTime: form.endTime,
        category: form.category,
        image: "/placeholder.svg", // Use placeholder if no image provided
      });

      setNotification({
        type: "success",
        message: "✅ Auction created successfully!",
      });

      // Optional: reset form if needed
      setForm({
        title: "",
        description: "",
        startingBid: "",
        endTime: "",
        category: "",
        imageUrl: "/placeholder.svg",
      });

      setTimeout(() => {
        router.push("/");
      }, 2000);
    } catch (error) {
      console.error("❌ Error creating auction:", error);
      setNotification({
        type: "error",
        message: "Failed to create auction. Please try again.",
      });
    } finally {
      setCreating(false);
    }
  };

  const getMinDateTime = () => {
    const now = new Date();
    now.setMinutes(now.getMinutes() + 30); // Minimum 30 minutes from now
    return now.toISOString().slice(0, 16);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50">
      {/* Animated Header */}
      <motion.header
        initial={{ y: -100, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.6 }}
        className="bg-white/80 backdrop-blur-lg shadow-lg border-b border-white/20 sticky top-0 z-40"
      >
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex items-center space-x-4">
            <Link href="/">
              <motion.div
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <Button variant="ghost" size="sm" className="hover:bg-blue-50">
                  <ArrowLeft className="h-4 w-4 mr-2" />
                  Back to Auctions
                </Button>
              </motion.div>
            </Link>
            <motion.h1
              className="text-2xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent"
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.2 }}
            >
              Create New Auction
            </motion.h1>
          </div>
        </div>
      </motion.header>

      <main className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3, duration: 0.6 }}
        >
          <Card className="bg-white/90 backdrop-blur-sm border-2 hover:shadow-2xl transition-all duration-500">
            <CardHeader>
              <CardTitle className="flex items-center justify-between">
                <div className="flex items-center">
                  <motion.div
                    animate={{ rotate: [0, 10, -10, 0] }}
                    transition={{
                      duration: 2,
                      repeat: Number.POSITIVE_INFINITY,
                      repeatDelay: 5,
                    }}
                  >
                    <Sparkles className="h-6 w-6 mr-3 text-blue-600" />
                  </motion.div>
                  Create Your Auction
                </div>
                <motion.div
                  className="flex items-center text-sm text-gray-500"
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: 0.5 }}
                >
                  <Mic className="h-4 w-4 mr-1" />
                  Voice commands supported
                </motion.div>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleSubmit} className="space-y-6">
                {/* Title */}
                <motion.div
                  className="space-y-2"
                  initial={{ opacity: 0, x: -50 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.4 }}
                >
                  <Label htmlFor="title" className="flex items-center">
                    Title *
                    <Zap className="h-3 w-3 ml-1 text-blue-500" />
                  </Label>
                  <div className="flex space-x-2">
                    <motion.div
                      className="flex-1"
                      whileFocus={{ scale: 1.02 }}
                      onFocus={() => setFocusedField("title")}
                      onBlur={() => setFocusedField(null)}
                    >
                      <Input
                        id="title"
                        placeholder="Enter auction title"
                        value={form.title}
                        onChange={(e) =>
                          handleInputChange("title", e.target.value)
                        }
                        className={`border-2 transition-all duration-300 ${
                          focusedField === "title"
                            ? "border-blue-500 shadow-lg"
                            : "border-gray-200"
                        }`}
                        required
                      />
                    </motion.div>
                    <VoiceButton
                      onTranscript={handleVoiceInput("title")}
                      size="sm"
                    />
                  </div>
                </motion.div>

                {/* Description */}
                <motion.div
                  className="space-y-2"
                  initial={{ opacity: 0, x: -50 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.5 }}
                >
                  <Label htmlFor="description">Description *</Label>
                  <div className="flex space-x-2">
                    <motion.div
                      className="flex-1"
                      whileFocus={{ scale: 1.02 }}
                      onFocus={() => setFocusedField("description")}
                      onBlur={() => setFocusedField(null)}
                    >
                      <Textarea
                        id="description"
                        placeholder="Describe your item in detail"
                        value={form.description}
                        onChange={(e) =>
                          handleInputChange("description", e.target.value)
                        }
                        className={`min-h-24 border-2 transition-all duration-300 ${
                          focusedField === "description"
                            ? "border-blue-500 shadow-lg"
                            : "border-gray-200"
                        }`}
                        required
                      />
                    </motion.div>
                    <VoiceButton
                      onTranscript={handleVoiceInput("description")}
                      size="sm"
                    />
                  </div>
                </motion.div>

                {/* Category and Starting Bid */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <motion.div
                    className="space-y-2"
                    initial={{ opacity: 0, y: 50 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.6 }}
                  >
                    <Label htmlFor="category">Category *</Label>
                    <motion.div whileHover={{ scale: 1.02 }}>
                      <Select
                        value={form.category}
                        onValueChange={(value) =>
                          handleInputChange("category", value)
                        }
                      >
                        <SelectTrigger className="border-2 hover:border-blue-300 transition-all duration-300">
                          <SelectValue placeholder="Select category" />
                        </SelectTrigger>
                        <SelectContent>
                          {categories.map((category) => (
                            <SelectItem key={category} value={category}>
                              {category}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </motion.div>
                  </motion.div>

                  <motion.div
                    className="space-y-2"
                    initial={{ opacity: 0, y: 50 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.7 }}
                  >
                    <Label htmlFor="startingBid">Starting Bid (₹) *</Label>
                    <motion.div
                      whileFocus={{ scale: 1.02 }}
                      onFocus={() => setFocusedField("startingBid")}
                      onBlur={() => setFocusedField(null)}
                    >
                      <Input
                        id="startingBid"
                        type="number"
                        placeholder="Enter starting bid"
                        value={form.startingBid}
                        onChange={(e) =>
                          handleInputChange("startingBid", e.target.value)
                        }
                        className={`border-2 transition-all duration-300 ${
                          focusedField === "startingBid"
                            ? "border-blue-500 shadow-lg"
                            : "border-gray-200"
                        }`}
                        min="1"
                        required
                      />
                    </motion.div>
                  </motion.div>
                </div>

                {/* End Time */}
                <motion.div
                  className="space-y-2"
                  initial={{ opacity: 0, x: 50 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.8 }}
                >
                  <Label htmlFor="endTime">Auction End Time *</Label>
                  <motion.div
                    whileFocus={{ scale: 1.02 }}
                    onFocus={() => setFocusedField("endTime")}
                    onBlur={() => setFocusedField(null)}
                  >
                    <Input
                      id="endTime"
                      type="datetime-local"
                      value={form.endTime}
                      onChange={(e) =>
                        handleInputChange("endTime", e.target.value)
                      }
                      className={`border-2 transition-all duration-300 ${
                        focusedField === "endTime"
                          ? "border-blue-500 shadow-lg"
                          : "border-gray-200"
                      }`}
                      min={getMinDateTime()}
                      required
                    />
                  </motion.div>
                  <p className="text-xs text-gray-500">
                    Auction must run for at least 30 minutes
                  </p>
                </motion.div>

                {/* Image URL */}
                <motion.div
                  className="space-y-2"
                  initial={{ opacity: 0, y: 50 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.9 }}
                >
                  <Label htmlFor="imageUrl">Image URL</Label>
                  <div className="flex space-x-2">
                    <motion.div
                      className="flex-1"
                      whileFocus={{ scale: 1.02 }}
                      onFocus={() => setFocusedField("imageUrl")}
                      onBlur={() => setFocusedField(null)}
                    >
                      <Input
                        id="imageUrl"
                        type="url"
                        placeholder="https://example.com/image.jpg"
                        value={form.imageUrl}
                        onChange={(e) =>
                          handleInputChange("imageUrl", e.target.value)
                        }
                        className={`border-2 transition-all duration-300 ${
                          focusedField === "imageUrl"
                            ? "border-blue-500 shadow-lg"
                            : "border-gray-200"
                        }`}
                      />
                    </motion.div>
                    <motion.div
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                    >
                      <Button
                        type="button"
                        variant="outline"
                        size="sm"
                        className="border-2 hover:bg-blue-50"
                      >
                        <Upload className="h-4 w-4 mr-2" />
                        Upload
                      </Button>
                    </motion.div>
                  </div>
                  <p className="text-xs text-gray-500">
                    Provide a direct link to your item's image
                  </p>
                </motion.div>

                {/* Preview */}
                <AnimatePresence>
                  {form.imageUrl && (
                    <motion.div
                      className="space-y-2"
                      initial={{ opacity: 0, height: 0 }}
                      animate={{ opacity: 1, height: "auto" }}
                      exit={{ opacity: 0, height: 0 }}
                      transition={{ duration: 0.3 }}
                    >
                      <Label>Image Preview</Label>
                      <motion.div
                        className="border-2 border-dashed border-gray-300 rounded-lg p-4 bg-gray-50"
                        whileHover={{ scale: 1.02 }}
                      >
                        <img
                          src={form.imageUrl || "/placeholder.svg"}
                          alt="Preview"
                          className="max-w-xs max-h-48 object-cover rounded shadow-lg"
                          onError={(e) => {
                            e.currentTarget.style.display = "none";
                          }}
                        />
                      </motion.div>
                    </motion.div>
                  )}
                </AnimatePresence>

                {/* Submit Button */}
                <motion.div
                  className="flex justify-end space-x-4 pt-6 border-t"
                  initial={{ opacity: 0, y: 50 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 1 }}
                >
                  <Link href="/">
                    <motion.div
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                    >
                      <Button
                        type="button"
                        variant="outline"
                        className="border-2"
                      >
                        Cancel
                      </Button>
                    </motion.div>
                  </Link>
                  <motion.div
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    <Button
                      type="submit"
                      disabled={creating}
                      size="lg"
                      className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 shadow-lg"
                    >
                      <AnimatePresence mode="wait">
                        {creating ? (
                          <motion.div
                            key="creating"
                            initial={{ opacity: 0, scale: 0.8 }}
                            animate={{ opacity: 1, scale: 1 }}
                            exit={{ opacity: 0, scale: 0.8 }}
                            className="flex items-center"
                          >
                            <motion.div
                              animate={{ rotate: 360 }}
                              transition={{
                                duration: 1,
                                repeat: Number.POSITIVE_INFINITY,
                                ease: "linear",
                              }}
                              className="w-4 h-4 border-2 border-white border-t-transparent rounded-full mr-2"
                            />
                            Creating Auction...
                          </motion.div>
                        ) : (
                          <motion.span
                            key="create"
                            initial={{ opacity: 0, scale: 0.8 }}
                            animate={{ opacity: 1, scale: 1 }}
                            exit={{ opacity: 0, scale: 0.8 }}
                          >
                            Create Auction
                          </motion.span>
                        )}
                      </AnimatePresence>
                    </Button>
                  </motion.div>
                </motion.div>
              </form>
            </CardContent>
          </Card>
        </motion.div>
      </main>

      {/* Notification Toast */}
      <AnimatePresence>
        {notification && (
          <NotificationToast
            type={notification.type}
            message={notification.message}
            onClose={() => setNotification(null)}
          />
        )}
      </AnimatePresence>
    </div>
  );
}
