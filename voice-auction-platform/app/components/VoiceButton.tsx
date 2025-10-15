"use client"

import { useState, useRef } from "react"
import { Button } from "@/components/ui/button"
import { Mic, MicOff } from "lucide-react"
import { cn } from "@/lib/utils"
import { motion, AnimatePresence } from "framer-motion"

interface VoiceButtonProps {
  onTranscript: (transcript: string) => void
  className?: string
  size?: "sm" | "default" | "lg"
}

export default function VoiceButton({ onTranscript, className, size = "default" }: VoiceButtonProps) {
  const [isListening, setIsListening] = useState(false)
  const [isSupported, setIsSupported] = useState(true)
  const [audioLevels, setAudioLevels] = useState<number[]>([])
  const recognitionRef = useRef<any>(null)

  const startListening = () => {
    if (!("webkitSpeechRecognition" in window) && !("SpeechRecognition" in window)) {
      setIsSupported(false)
      return
    }

    const SpeechRecognition = (window as any).SpeechRecognition || (window as any).webkitSpeechRecognition
    const recognition = new SpeechRecognition()

    recognition.continuous = false
    recognition.interimResults = false
    recognition.lang = "en-US"

    recognition.onstart = () => {
      setIsListening(true)
      // Simulate audio levels
      const interval = setInterval(() => {
        setAudioLevels(Array.from({ length: 3 }, () => Math.random() * 100))
      }, 100)
      setTimeout(() => clearInterval(interval), 3000)
    }

    recognition.onresult = (event: any) => {
      const transcript = event.results[0][0].transcript
      onTranscript(transcript)
      setIsListening(false)
      setAudioLevels([])
    }

    recognition.onerror = (event: any) => {
      console.error("Speech recognition error:", event.error)
      setIsListening(false)
      setAudioLevels([])
    }

    recognition.onend = () => {
      setIsListening(false)
      setAudioLevels([])
    }

    recognitionRef.current = recognition
    recognition.start()
  }

  const stopListening = () => {
    if (recognitionRef.current) {
      recognitionRef.current.stop()
    }
    setIsListening(false)
    setAudioLevels([])
  }

  const handleClick = () => {
    if (isListening) {
      stopListening()
    } else {
      startListening()
    }
  }

  if (!isSupported) {
    return (
      <Button variant="outline" size={size} disabled className={cn("text-gray-400", className)}>
        <MicOff className="h-4 w-4" />
      </Button>
    )
  }

  return (
    <div className="relative">
      <motion.div
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        animate={isListening ? { scale: [1, 1.1, 1] } : {}}
        transition={isListening ? { duration: 1, repeat: Number.POSITIVE_INFINITY } : {}}
      >
        <Button
          type="button"
          variant={isListening ? "default" : "outline"}
          size={size}
          onClick={handleClick}
          className={cn(
            "transition-all duration-300 relative overflow-hidden",
            isListening && "bg-gradient-to-r from-red-500 to-pink-500 hover:from-red-600 hover:to-pink-600 shadow-lg",
            className,
          )}
        >
          <motion.div animate={{ rotate: isListening ? 180 : 0 }} transition={{ duration: 0.3 }}>
            {isListening ? <MicOff className="h-4 w-4" /> : <Mic className="h-4 w-4" />}
          </motion.div>

          {/* Audio visualization overlay */}
          <AnimatePresence>
            {isListening && (
              <motion.div
                className="absolute inset-0 flex items-center justify-center space-x-0.5"
                initial={{ opacity: 0 }}
                animate={{ opacity: 0.3 }}
                exit={{ opacity: 0 }}
              >
                {audioLevels.map((level, index) => (
                  <motion.div
                    key={index}
                    className="w-0.5 bg-white rounded-full"
                    animate={{ height: `${Math.max(level * 0.2, 4)}px` }}
                    transition={{ duration: 0.1 }}
                  />
                ))}
              </motion.div>
            )}
          </AnimatePresence>
        </Button>
      </motion.div>

      {/* Pulse rings when listening */}
      <AnimatePresence>
        {isListening && (
          <>
            {[...Array(2)].map((_, i) => (
              <motion.div
                key={i}
                className="absolute inset-0 rounded-md border-2 border-red-400 pointer-events-none"
                initial={{ scale: 1, opacity: 0.7 }}
                animate={{ scale: 1.5 + i * 0.3, opacity: 0 }}
                transition={{
                  duration: 1.5,
                  repeat: Number.POSITIVE_INFINITY,
                  delay: i * 0.2,
                }}
              />
            ))}
          </>
        )}
      </AnimatePresence>
    </div>
  )
}
