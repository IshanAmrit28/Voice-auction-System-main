"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { IndianRupee, Clock, TrendingUp } from "lucide-react"
import { motion, AnimatePresence } from "framer-motion"
import AnimatedCounter from "./AnimatedCounter"

interface Bid {
  id: string
  amount: number
  bidder: string
  timestamp: string
}

interface BidHistoryProps {
  bids: Bid[]
}

export default function BidHistory({ bids }: BidHistoryProps) {
  const formatTimeAgo = (timestamp: string) => {
    const now = new Date()
    const time = new Date(timestamp)
    const diffInMinutes = Math.floor((now.getTime() - time.getTime()) / (1000 * 60))

    if (diffInMinutes < 1) return "Just now"
    if (diffInMinutes < 60) return `${diffInMinutes}m ago`
    const diffInHours = Math.floor(diffInMinutes / 60)
    if (diffInHours < 24) return `${diffInHours}h ago`
    const diffInDays = Math.floor(diffInHours / 24)
    return `${diffInDays}d ago`
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 50 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.5, duration: 0.6 }}
    >
      <Card className="bg-white/90 backdrop-blur-sm border-2 hover:shadow-xl transition-all duration-500">
        <CardHeader>
          <CardTitle className="flex items-center justify-between">
            <div className="flex items-center">
              <motion.div
                animate={{ rotate: [0, 360] }}
                transition={{ duration: 20, repeat: Number.POSITIVE_INFINITY, ease: "linear" }}
              >
                <Clock className="h-5 w-5 mr-2 text-blue-600" />
              </motion.div>
              Bid History
            </div>
            <motion.div initial={{ scale: 0 }} animate={{ scale: 1 }} transition={{ delay: 0.7, type: "spring" }}>
              <Badge className="bg-gradient-to-r from-blue-500 to-purple-500 text-white">
                <AnimatedCounter value={bids.length} />
              </Badge>
            </motion.div>
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-3 max-h-96 overflow-y-auto">
            <AnimatePresence>
              {bids.length === 0 ? (
                <motion.p
                  className="text-gray-500 text-center py-8"
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.8 }}
                >
                  No bids yet
                </motion.p>
              ) : (
                bids.map((bid, index) => (
                  <motion.div
                    key={bid.id}
                    initial={{ opacity: 0, x: -50, scale: 0.9 }}
                    animate={{ opacity: 1, x: 0, scale: 1 }}
                    exit={{ opacity: 0, x: 50, scale: 0.9 }}
                    transition={{
                      delay: index * 0.1,
                      type: "spring",
                      stiffness: 100,
                    }}
                    whileHover={{
                      scale: 1.02,
                      x: 5,
                      transition: { type: "spring", stiffness: 400 },
                    }}
                    className={`flex items-center justify-between p-4 rounded-xl transition-all duration-300 ${
                      index === 0
                        ? "bg-gradient-to-r from-green-50 to-emerald-50 border-2 border-green-200 shadow-md"
                        : "bg-gray-50 hover:bg-gray-100"
                    }`}
                  >
                    <div className="flex items-center space-x-3">
                      <motion.div className="flex items-center text-lg font-semibold" whileHover={{ scale: 1.1 }}>
                        <IndianRupee className="h-4 w-4" />
                        <AnimatedCounter value={bid.amount} />
                      </motion.div>
                      {index === 0 && (
                        <motion.div
                          initial={{ scale: 0, rotate: -180 }}
                          animate={{ scale: 1, rotate: 0 }}
                          transition={{ delay: 0.3, type: "spring" }}
                        >
                          <Badge className="bg-green-500 text-white text-xs shadow-lg">
                            <TrendingUp className="h-3 w-3 mr-1" />
                            Highest
                          </Badge>
                        </motion.div>
                      )}
                    </div>
                    <div className="text-right">
                      <motion.p
                        className="text-sm font-medium text-gray-700"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ delay: 0.2 }}
                      >
                        {bid.bidder}
                      </motion.p>
                      <motion.p
                        className="text-xs text-gray-500"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ delay: 0.3 }}
                      >
                        {formatTimeAgo(bid.timestamp)}
                      </motion.p>
                    </div>
                  </motion.div>
                ))
              )}
            </AnimatePresence>
          </div>
        </CardContent>
      </Card>
    </motion.div>
  )
}
