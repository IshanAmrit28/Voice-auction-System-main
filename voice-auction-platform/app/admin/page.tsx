"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Activity, TrendingUp, Users, Gavel, IndianRupee, Clock, ArrowLeft, Eye, Trash2 } from "lucide-react"
import Link from "next/link"

interface DashboardStats {
  totalAuctions: number
  activeAuctions: number
  totalBids: number
  totalRevenue: number
  activeUsers: number
}

interface RecentBid {
  id: string
  auctionTitle: string
  bidder: string
  amount: number
  timestamp: string
}

interface TopAuction {
  id: string
  title: string
  currentBid: number
  bidCount: number
  endTime: string
}

export default function AdminDashboard() {
  const [stats, setStats] = useState<DashboardStats>({
    totalAuctions: 0,
    activeAuctions: 0,
    totalBids: 0,
    totalRevenue: 0,
    activeUsers: 0,
  })
  const [recentBids, setRecentBids] = useState<RecentBid[]>([])
  const [topAuctions, setTopAuctions] = useState<TopAuction[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    // Mock data - replace with actual API calls
    const mockStats: DashboardStats = {
      totalAuctions: 156,
      activeAuctions: 24,
      totalBids: 1247,
      totalRevenue: 2850000,
      activeUsers: 89,
    }

    const mockRecentBids: RecentBid[] = [
      {
        id: "1",
        auctionTitle: "Vintage Rolex Watch",
        bidder: "Bidder***1",
        amount: 45000,
        timestamp: new Date(Date.now() - 2 * 60 * 1000).toISOString(),
      },
      {
        id: "2",
        auctionTitle: "Antique Persian Rug",
        bidder: "Bidder***2",
        amount: 18000,
        timestamp: new Date(Date.now() - 5 * 60 * 1000).toISOString(),
      },
      {
        id: "3",
        auctionTitle: "Modern Art Painting",
        bidder: "Bidder***3",
        amount: 12000,
        timestamp: new Date(Date.now() - 8 * 60 * 1000).toISOString(),
      },
      {
        id: "4",
        auctionTitle: "Classic Guitar",
        bidder: "Bidder***4",
        amount: 8500,
        timestamp: new Date(Date.now() - 12 * 60 * 1000).toISOString(),
      },
    ]

    const mockTopAuctions: TopAuction[] = [
      {
        id: "1",
        title: "Vintage Rolex Watch",
        currentBid: 45000,
        bidCount: 12,
        endTime: new Date(Date.now() + 2 * 60 * 60 * 1000).toISOString(),
      },
      {
        id: "2",
        title: "Antique Persian Rug",
        currentBid: 18000,
        bidCount: 8,
        endTime: new Date(Date.now() + 5 * 60 * 60 * 1000).toISOString(),
      },
      {
        id: "3",
        title: "Modern Art Painting",
        currentBid: 12000,
        bidCount: 5,
        endTime: new Date(Date.now() + 1 * 60 * 60 * 1000).toISOString(),
      },
    ]

    setTimeout(() => {
      setStats(mockStats)
      setRecentBids(mockRecentBids)
      setTopAuctions(mockTopAuctions)
      setLoading(false)
    }, 1000)
  }, [])

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

  const formatTimeLeft = (endTime: string) => {
    const now = new Date()
    const end = new Date(endTime)
    const diffInMinutes = Math.floor((end.getTime() - now.getTime()) / (1000 * 60))

    if (diffInMinutes < 60) return `${diffInMinutes}m left`
    const diffInHours = Math.floor(diffInMinutes / 60)
    if (diffInHours < 24) return `${diffInHours}h left`
    const diffInDays = Math.floor(diffInHours / 24)
    return `${diffInDays}d left`
  }

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-blue-600"></div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <Link href="/">
                <Button variant="ghost" size="sm">
                  <ArrowLeft className="h-4 w-4 mr-2" />
                  Back to Auctions
                </Button>
              </Link>
              <h1 className="text-2xl font-bold text-gray-900">Admin Dashboard</h1>
            </div>
            <Badge variant="secondary" className="bg-green-100 text-green-800">
              <Activity className="h-3 w-3 mr-1" />
              Live
            </Badge>
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-6 mb-8">
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600">Total Auctions</p>
                  <p className="text-2xl font-bold text-gray-900">{stats.totalAuctions}</p>
                </div>
                <Gavel className="h-8 w-8 text-blue-600" />
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600">Active Auctions</p>
                  <p className="text-2xl font-bold text-green-600">{stats.activeAuctions}</p>
                </div>
                <Clock className="h-8 w-8 text-green-600" />
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600">Total Bids</p>
                  <p className="text-2xl font-bold text-purple-600">{stats.totalBids}</p>
                </div>
                <TrendingUp className="h-8 w-8 text-purple-600" />
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600">Total Revenue</p>
                  <p className="text-2xl font-bold text-green-600">₹{(stats.totalRevenue / 100000).toFixed(1)}L</p>
                </div>
                <IndianRupee className="h-8 w-8 text-green-600" />
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600">Active Users</p>
                  <p className="text-2xl font-bold text-orange-600">{stats.activeUsers}</p>
                </div>
                <Users className="h-8 w-8 text-orange-600" />
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Tabs */}
        <Tabs defaultValue="overview" className="space-y-6">
          <TabsList>
            <TabsTrigger value="overview">Overview</TabsTrigger>
            <TabsTrigger value="auctions">Manage Auctions</TabsTrigger>
            <TabsTrigger value="users">Users</TabsTrigger>
          </TabsList>

          <TabsContent value="overview" className="space-y-6">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {/* Recent Bids */}
              <Card>
                <CardHeader>
                  <CardTitle>Recent Bids</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {recentBids.map((bid) => (
                      <div key={bid.id} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                        <div className="flex-1">
                          <p className="font-medium text-sm">{bid.auctionTitle}</p>
                          <p className="text-xs text-gray-500">by {bid.bidder}</p>
                        </div>
                        <div className="text-right">
                          <p className="font-semibold text-green-600">₹{bid.amount.toLocaleString()}</p>
                          <p className="text-xs text-gray-500">{formatTimeAgo(bid.timestamp)}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>

              {/* Top Auctions */}
              <Card>
                <CardHeader>
                  <CardTitle>Most Active Auctions</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {topAuctions.map((auction) => (
                      <div key={auction.id} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                        <div className="flex-1">
                          <p className="font-medium text-sm">{auction.title}</p>
                          <p className="text-xs text-gray-500">{auction.bidCount} bids</p>
                        </div>
                        <div className="text-right">
                          <p className="font-semibold text-blue-600">₹{auction.currentBid.toLocaleString()}</p>
                          <p className="text-xs text-gray-500">{formatTimeLeft(auction.endTime)}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          <TabsContent value="auctions">
            <Card>
              <CardHeader>
                <CardTitle>Manage Auctions</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {topAuctions.map((auction) => (
                    <div key={auction.id} className="flex items-center justify-between p-4 border rounded-lg">
                      <div className="flex-1">
                        <h3 className="font-medium">{auction.title}</h3>
                        <div className="flex items-center space-x-4 mt-1 text-sm text-gray-500">
                          <span>Current: ₹{auction.currentBid.toLocaleString()}</span>
                          <span>{auction.bidCount} bids</span>
                          <span>{formatTimeLeft(auction.endTime)}</span>
                        </div>
                      </div>
                      <div className="flex items-center space-x-2">
                        <Link href={`/auction/${auction.id}`}>
                          <Button variant="outline" size="sm">
                            <Eye className="h-4 w-4 mr-1" />
                            View
                          </Button>
                        </Link>
                        <Button variant="outline" size="sm" className="text-red-600 hover:text-red-700">
                          <Trash2 className="h-4 w-4 mr-1" />
                          Delete
                        </Button>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="users">
            <Card>
              <CardHeader>
                <CardTitle>User Management</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-500">User management features coming soon...</p>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </main>
    </div>
  )
}
