"use client"

import { useState, useEffect } from "react"
import { useParams } from "next/navigation"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Separator } from "@/components/ui/separator"
import { Progress } from "@/components/ui/progress"
import { IndianRupee, User, ArrowLeft, Gavel, TrendingUp, Users, Zap } from "lucide-react"
import Link from "next/link"
import Image from "next/image"
import VoiceButton from "../../components/VoiceButton"
import BidHistory from "../../components/BidHistory"
import CountdownTimer from "../../components/CountdownTimer"
import NotificationToast from "../../components/NotificationToast"
import AnimatedCounter from "../../components/AnimatedCounter"
import { motion, AnimatePresence } from "framer-motion"

interface AuctionDetail {
  id: string
  title: string
  description: string
  currentBid: number
  startingBid: number
  endTime: string
  category: string
  image: string
  bidCount: number
  seller: string
  condition: string
  specifications: string[]
}

interface Bid {
  id: string
  amount: number
  bidder: string
  timestamp: string
}

export default function AuctionDetailPage() {
  const params = useParams()
  const [auction, setAuction] = useState<AuctionDetail | null>(null)
  const [bids, setBids] = useState<Bid[]>([])
  const [bidAmount, setBidAmount] = useState("")
  const [loading, setLoading] = useState(true)
  const [bidding, setBidding] = useState(false)
  const [notification, setNotification] = useState<{ type: "success" | "error"; message: string } | null>(null)
  const [bidProgress, setBidProgress] = useState(0)

  useEffect(() => {
    // Mock data - replace with actual API call
    const mockAuction: AuctionDetail = {
      id: params.id as string,
      title: "Vintage Rolex Watch",
      description:
        "Rare 1960s Rolex Submariner in excellent condition. This timepiece has been carefully maintained and comes with original documentation. A true collector's item with historical significance.",
      currentBid: 45000,
      startingBid: 25000,
      endTime: new Date(Date.now() + 2 * 60 * 60 * 1000).toISOString(),
      category: "Watches",
      image: "/placeholder.svg?height=400&width=600",
      bidCount: 12,
      seller: "WatchCollector123",
      condition: "Excellent",
      specifications: [
        "Model: Submariner Ref. 5513",
        "Year: 1965",
        "Movement: Automatic",
        "Case Material: Stainless Steel",
        "Water Resistance: 200m",
      ],
    }

    const mockBids: Bid[] = [
      { id: "1", amount: 45000, bidder: "Bidder***1", timestamp: new Date(Date.now() - 5 * 60 * 1000).toISOString() },
      { id: "2", amount: 42000, bidder: "Bidder***2", timestamp: new Date(Date.now() - 15 * 60 * 1000).toISOString() },
      { id: "3", amount: 40000, bidder: "Bidder***3", timestamp: new Date(Date.now() - 30 * 60 * 1000).toISOString() },
      { id: "4", amount: 38000, bidder: "Bidder***1", timestamp: new Date(Date.now() - 45 * 60 * 1000).toISOString() },
      { id: "5", amount: 35000, bidder: "Bidder***4", timestamp: new Date(Date.now() - 60 * 60 * 1000).toISOString() },
    ]

    setTimeout(() => {
      setAuction(mockAuction)
      setBids(mockBids)
      setBidAmount((mockAuction.currentBid + 1000).toString())
      setLoading(false)

      // Calculate bid progress
      const progress = ((mockAuction.currentBid - mockAuction.startingBid) / mockAuction.startingBid) * 100
      setBidProgress(Math.min(progress, 100))
    }, 1000)
  }, [params.id])

  const handlePlaceBid = async () => {
    if (!auction || !bidAmount) return

    const amount = Number.parseInt(bidAmount)
    if (amount <= auction.currentBid) {
      setNotification({
        type: "error",
        message: `Bid must be higher than current bid of ₹${auction.currentBid.toLocaleString()}`,
      })
      return
    }

    setBidding(true)

    // Simulate API call with progress
    setTimeout(() => {
      const newBid: Bid = {
        id: Date.now().toString(),
        amount: amount,
        bidder: "You",
        timestamp: new Date().toISOString(),
      }

      setBids((prev) => [newBid, ...prev])
      setAuction((prev) => (prev ? { ...prev, currentBid: amount, bidCount: prev.bidCount + 1 } : null))
      setBidAmount((amount + 1000).toString())
      setBidding(false)

      // Update progress
      const progress = ((amount - auction.startingBid) / auction.startingBid) * 100
      setBidProgress(Math.min(progress, 100))

      setNotification({
        type: "success",
        message: `✅ Bid of ₹${amount.toLocaleString()} placed successfully!`,
      })
    }, 2000)
  }

  const handleVoiceBid = (transcript: string) => {
    // Parse voice command for bid amount
    const match = transcript.match(/bid\s+(\d+)/i) || transcript.match(/(\d+)/i)
    if (match) {
      setBidAmount(match[1])
    }
  }

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50">
        <div className="flex items-center justify-center min-h-screen">
          <motion.div
            className="relative"
            animate={{ rotate: 360 }}
            transition={{ duration: 2, repeat: Number.POSITIVE_INFINITY, ease: "linear" }}
          >
            <div className="w-32 h-32 border-4 border-blue-200 rounded-full"></div>
            <div className="absolute top-0 left-0 w-32 h-32 border-4 border-blue-600 rounded-full border-t-transparent animate-spin"></div>
          </motion.div>
        </div>
      </div>
    )
  }

  if (!auction) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <motion.p className="text-gray-500" initial={{ opacity: 0, scale: 0.8 }} animate={{ opacity: 1, scale: 1 }}>
          Auction not found
        </motion.p>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50">
      {/* Animated Header */}
      <motion.header
        initial={{ y: -100, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.6 }}
        className="bg-white/80 backdrop-blur-lg shadow-lg border-b border-white/20 sticky top-0 z-40"
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex items-center space-x-4">
            <Link href="/">
              <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                <Button variant="ghost" size="sm" className="hover:bg-blue-50">
                  <ArrowLeft className="h-4 w-4 mr-2" />
                  Back to Auctions
                </Button>
              </motion.div>
            </Link>
            <motion.h1
              className="text-xl font-semibold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent"
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.2 }}
            >
              Auction Details
            </motion.h1>
          </div>
        </div>
      </motion.header>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main Content */}
          <motion.div
            className="lg:col-span-2 space-y-6"
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
          >
            {/* Product Image and Info */}
            <Card className="overflow-hidden bg-white/80 backdrop-blur-sm border-2 hover:shadow-xl transition-all duration-500">
              <CardContent className="p-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <motion.div whileHover={{ scale: 1.02 }} transition={{ type: "spring", stiffness: 300 }}>
                    <Image
                      src={auction.image || "/placeholder.svg"}
                      alt={auction.title}
                      width={600}
                      height={400}
                      className="w-full h-80 object-cover rounded-lg shadow-lg"
                    />
                  </motion.div>

                  <div className="space-y-4">
                    <motion.div
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.2 }}
                    >
                      <h1 className="text-3xl font-bold text-gray-900 mb-2">{auction.title}</h1>
                      <div className="flex items-center space-x-4 mb-4">
                        <Badge className="bg-gradient-to-r from-blue-500 to-purple-500 text-white">
                          {auction.category}
                        </Badge>
                        <Badge variant="outline" className="border-2">
                          Condition: {auction.condition}
                        </Badge>
                      </div>
                    </motion.div>

                    <div className="space-y-3">
                      <motion.div
                        className="p-4 bg-gradient-to-r from-green-50 to-emerald-50 rounded-xl border-2 border-green-200"
                        whileHover={{ scale: 1.02 }}
                        initial={{ opacity: 0, scale: 0.9 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ delay: 0.3 }}
                      >
                        <div className="flex justify-between items-center mb-2">
                          <span className="text-sm font-medium text-green-800">Current Bid</span>
                          <motion.div
                            className="flex items-center text-3xl font-bold text-green-600"
                            whileHover={{ scale: 1.1 }}
                          >
                            <IndianRupee className="h-8 w-8" />
                            <AnimatedCounter value={auction.currentBid} />
                          </motion.div>
                        </div>
                        <Progress value={bidProgress} className="h-2 bg-green-100" />
                        <p className="text-xs text-green-600 mt-1">{bidProgress.toFixed(0)}% above starting bid</p>
                      </motion.div>

                      <motion.div
                        className="flex justify-between items-center p-3 bg-gray-50 rounded-lg"
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: 0.4 }}
                      >
                        <span className="text-sm font-medium text-gray-600">Starting Bid</span>
                        <div className="flex items-center text-lg text-gray-600">
                          <IndianRupee className="h-5 w-5" />
                          {auction.startingBid.toLocaleString()}
                        </div>
                      </motion.div>

                      <motion.div
                        className="flex justify-between items-center p-3 bg-gradient-to-r from-blue-50 to-purple-50 rounded-lg border border-blue-200"
                        initial={{ opacity: 0, x: 20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: 0.5 }}
                      >
                        <span className="text-sm font-medium text-blue-800">Time Remaining</span>
                        <CountdownTimer endTime={auction.endTime} />
                      </motion.div>
                    </div>

                    <motion.div
                      className="flex items-center space-x-6 text-sm text-gray-600 pt-4 border-t"
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      transition={{ delay: 0.6 }}
                    >
                      <div className="flex items-center">
                        <User className="h-4 w-4 mr-1" />
                        Seller: {auction.seller}
                      </div>
                      <div className="flex items-center">
                        <Users className="h-4 w-4 mr-1" />
                        <AnimatedCounter value={auction.bidCount} /> bids
                      </div>
                      <div className="flex items-center">
                        <TrendingUp className="h-4 w-4 mr-1" />
                        Hot Item
                      </div>
                    </motion.div>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Description and Specifications */}
            <motion.div
              initial={{ opacity: 0, y: 50 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4, duration: 0.6 }}
            >
              <Card className="bg-white/80 backdrop-blur-sm border-2 hover:shadow-xl transition-all duration-500">
                <CardHeader>
                  <CardTitle className="flex items-center">
                    <motion.div
                      animate={{ rotate: [0, 5, -5, 0] }}
                      transition={{ duration: 2, repeat: Number.POSITIVE_INFINITY, repeatDelay: 5 }}
                    >
                      📋
                    </motion.div>
                    <span className="ml-2">Description</span>
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <motion.p
                    className="text-gray-700 mb-6 leading-relaxed"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.6 }}
                  >
                    {auction.description}
                  </motion.p>

                  <Separator className="my-4" />

                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.7 }}
                  >
                    <h3 className="font-semibold mb-3 flex items-center">
                      <Zap className="h-4 w-4 mr-2 text-blue-600" />
                      Specifications
                    </h3>
                    <ul className="space-y-2">
                      {auction.specifications.map((spec, index) => (
                        <motion.li
                          key={index}
                          className="text-gray-700 flex items-center"
                          initial={{ opacity: 0, x: -20 }}
                          animate={{ opacity: 1, x: 0 }}
                          transition={{ delay: 0.8 + index * 0.1 }}
                          whileHover={{ x: 5, color: "#3B82F6" }}
                        >
                          <span className="w-2 h-2 bg-blue-500 rounded-full mr-3"></span>
                          {spec}
                        </motion.li>
                      ))}
                    </ul>
                  </motion.div>
                </CardContent>
              </Card>
            </motion.div>
          </motion.div>

          {/* Sidebar */}
          <motion.div
            className="space-y-6"
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.3, duration: 0.6 }}
          >
            {/* Bidding Section */}
            <Card className="bg-white/90 backdrop-blur-sm border-2 hover:shadow-xl transition-all duration-500 sticky top-24">
              <CardHeader>
                <CardTitle className="flex items-center">
                  <motion.div
                    animate={{ rotate: [0, -10, 10, 0] }}
                    transition={{ duration: 1, repeat: Number.POSITIVE_INFINITY, repeatDelay: 3 }}
                  >
                    <Gavel className="h-5 w-5 mr-2 text-blue-600" />
                  </motion.div>
                  Place Your Bid
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-center space-x-2">
                  <motion.div className="flex-1 relative" whileFocus={{ scale: 1.02 }}>
                    <IndianRupee className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
                    <Input
                      type="number"
                      placeholder="Enter bid amount"
                      value={bidAmount}
                      onChange={(e) => setBidAmount(e.target.value)}
                      className="pl-10 border-2 focus:border-blue-500 transition-all duration-300"
                      min={auction.currentBid + 1}
                    />
                  </motion.div>
                  <VoiceButton onTranscript={handleVoiceBid} size="sm" />
                </div>

                <motion.div whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}>
                  <Button
                    onClick={handlePlaceBid}
                    disabled={bidding || !bidAmount || Number.parseInt(bidAmount) <= auction.currentBid}
                    className="w-full bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 shadow-lg"
                    size="lg"
                  >
                    <AnimatePresence mode="wait">
                      {bidding ? (
                        <motion.div
                          key="bidding"
                          initial={{ opacity: 0, scale: 0.8 }}
                          animate={{ opacity: 1, scale: 1 }}
                          exit={{ opacity: 0, scale: 0.8 }}
                          className="flex items-center"
                        >
                          <motion.div
                            animate={{ rotate: 360 }}
                            transition={{ duration: 1, repeat: Number.POSITIVE_INFINITY, ease: "linear" }}
                            className="w-4 h-4 border-2 border-white border-t-transparent rounded-full mr-2"
                          />
                          Placing Bid...
                        </motion.div>
                      ) : (
                        <motion.span
                          key="place-bid"
                          initial={{ opacity: 0, scale: 0.8 }}
                          animate={{ opacity: 1, scale: 1 }}
                          exit={{ opacity: 0, scale: 0.8 }}
                        >
                          Place Bid
                        </motion.span>
                      )}
                    </AnimatePresence>
                  </Button>
                </motion.div>

                <motion.p
                  className="text-xs text-gray-500 text-center"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.8 }}
                >
                  Minimum bid: ₹{(auction.currentBid + 1).toLocaleString()}
                </motion.p>
              </CardContent>
            </Card>

            {/* Bid History */}
            <BidHistory bids={bids} />
          </motion.div>
        </div>
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
  )
}
