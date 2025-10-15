"use client"

import { useState, useEffect } from "react"
import { Badge } from "@/components/ui/badge"
import { Clock, AlertTriangle } from "lucide-react"
import { motion, AnimatePresence } from "framer-motion"

interface CountdownTimerProps {
  endTime: string
  className?: string
}

export default function CountdownTimer({ endTime, className }: CountdownTimerProps) {
  const [timeLeft, setTimeLeft] = useState("")
  const [isExpired, setIsExpired] = useState(false)
  const [isUrgent, setIsUrgent] = useState(false)

  useEffect(() => {
    const updateTimer = () => {
      const now = new Date().getTime()
      const end = new Date(endTime).getTime()
      const difference = end - now

      if (difference <= 0) {
        setTimeLeft("Expired")
        setIsExpired(true)
        return
      }

      const days = Math.floor(difference / (1000 * 60 * 60 * 24))
      const hours = Math.floor((difference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60))
      const minutes = Math.floor((difference % (1000 * 60 * 60)) / (1000 * 60))
      const seconds = Math.floor((difference % (1000 * 60)) / 1000)

      // Set urgent if less than 1 hour
      setIsUrgent(difference < 60 * 60 * 1000)

      if (days > 0) {
        setTimeLeft(`${days}d ${hours}h ${minutes}m`)
      } else if (hours > 0) {
        setTimeLeft(`${hours}h ${minutes}m ${seconds}s`)
      } else {
        setTimeLeft(`${minutes}m ${seconds}s`)
      }
    }

    updateTimer()
    const interval = setInterval(updateTimer, 1000)

    return () => clearInterval(interval)
  }, [endTime])

  return (
    <AnimatePresence mode="wait">
      <motion.div
        key={timeLeft}
        initial={{ scale: 0.8, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        exit={{ scale: 0.8, opacity: 0 }}
        transition={{ type: "spring", stiffness: 500, damping: 30 }}
      >
        <Badge
          variant={isExpired ? "destructive" : "secondary"}
          className={`
            ${
              isExpired
                ? "bg-red-500 text-white"
                : isUrgent
                  ? "bg-orange-500 text-white animate-pulse"
                  : "bg-blue-100 text-blue-800"
            } 
            ${className} 
            shadow-lg transition-all duration-300
          `}
        >
          <motion.div
            className="flex items-center"
            animate={isUrgent && !isExpired ? { scale: [1, 1.1, 1] } : {}}
            transition={isUrgent && !isExpired ? { duration: 1, repeat: Number.POSITIVE_INFINITY } : {}}
          >
            {isExpired ? <AlertTriangle className="h-3 w-3 mr-1" /> : <Clock className="h-3 w-3 mr-1" />}
            {timeLeft}
          </motion.div>
        </Badge>
      </motion.div>
    </AnimatePresence>
  )
}
