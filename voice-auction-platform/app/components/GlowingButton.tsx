"use client"

import type React from "react"
import { Button } from "@/components/ui/button"
import Link from "next/link"
import { cn } from "@/lib/utils"

interface GlowingButtonProps {
  children: React.ReactNode
  href?: string
  onClick?: () => void
  variant?: "primary" | "secondary" | "danger"
  size?: "sm" | "default" | "lg"
  className?: string
  disabled?: boolean
}

export default function GlowingButton({
  children,
  href,
  onClick,
  variant = "primary",
  size = "default",
  className,
  disabled = false,
}: GlowingButtonProps) {
  const getVariantClasses = () => {
    switch (variant) {
      case "primary":
        return "bg-gradient-to-r from-purple-600 to-cyan-600 hover:from-purple-700 hover:to-cyan-700 shadow-[0_0_20px_rgba(147,51,234,0.4)] hover:shadow-[0_0_30px_rgba(147,51,234,0.6)]"
      case "secondary":
        return "bg-gradient-to-r from-slate-600/20 to-slate-700/20 hover:from-slate-600/30 hover:to-slate-700/30 border border-slate-400/30 shadow-[0_0_15px_rgba(100,116,139,0.3)] hover:shadow-[0_0_25px_rgba(100,116,139,0.5)]"
      case "danger":
        return "bg-gradient-to-r from-red-600 to-pink-600 hover:from-red-700 hover:to-pink-700 shadow-[0_0_20px_rgba(239,68,68,0.4)] hover:shadow-[0_0_30px_rgba(239,68,68,0.6)]"
      default:
        return ""
    }
  }

  const getSizeClasses = () => {
    switch (size) {
      case "sm":
        return "h-8 px-4 text-sm"
      case "lg":
        return "h-12 px-8 text-lg"
      default:
        return "h-10 px-6"
    }
  }

  const buttonContent = (
    <Button
      onClick={onClick}
      disabled={disabled}
      className={cn(
        "text-white font-semibold backdrop-blur-sm transition-all duration-300 border-0 hover:scale-105",
        getVariantClasses(),
        getSizeClasses(),
        disabled && "opacity-50 cursor-not-allowed",
        className,
      )}
      style={{ fontFamily: "var(--font-sora)" }}
    >
      {children}
    </Button>
  )

  if (href && !disabled) {
    return <Link href={href}>{buttonContent}</Link>
  }

  return buttonContent
}
