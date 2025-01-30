"use client"

import { motion } from "framer-motion"
import { Calendar, ChevronDown, Clock, Filter, Search, Sprout, Users } from 'lucide-react'
import { useState } from "react"

import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"; // Import Label component
import { Progress } from "@/components/ui/progress"


const categories = [
  { name: "Fresh Produce", icon: "🥬", count: 156 },
  { name: "Grains", icon: "🌾", count: 89 },
  { name: "Fruits", icon: "🍎", count: 124 },
  { name: "Vegetables", icon: "🥕", count: 178 },
  { name: "Organic", icon: "🌱", count: 92 },
  { name: "Seasonal", icon: "🌺", count: 67 },
]

const products = [
  {
    id: 1,
    name: "Organic Tomatoes",
    description: "Fresh, locally grown organic tomatoes from Green Valley Farm",
    price: 4.99,
    unit: "kg",
    rating: 4.8,
    reviews: 127,
    image: "/placeholder.svg?height=200&width=200",
    farmer: "John Smith",
    farmName: "Green Valley Farm",
    category: "Vegetables",
    badge: "Popular",
    harvestDate: "2024-02-15",
    queueCount: 12,
    totalStock: 500,
    reservedStock: 320,
  },
  {
    id: 2,
    name: "Fresh Sweet Corn",
    description: "Non-GMO sweet corn, harvested at peak ripeness",
    price: 3.49,
    unit: "dozen",
    rating: 4.9,
    reviews: 84,
    image: "/placeholder.svg?height=200&width=200",
    farmer: "Maria Garcia",
    farmName: "Sunshine Fields",
    category: "Vegetables",
    badge: "In Season",
    harvestDate: "2024-02-10",
    queueCount: 8,
    totalStock: 1000,
    reservedStock: 750,
  },
  {
    id: 3,
    name: "Premium Rice",
    description: "Sustainably grown premium rice variety",
    price: 6.99,
    unit: "kg",
    rating: 4.7,
    reviews: 256,
    image: "/placeholder.svg?height=200&width=200",
    farmer: "David Chen",
    farmName: "Golden Paddy Fields",
    category: "Grains",
    harvestDate: "2024-03-01",
    queueCount: 25,
    totalStock: 2000,
    reservedStock: 1400,
  },
]

interface QueueDialogProps {
  product: typeof products[0]
  onClose: () => void
}

function QueueDialog({ product, onClose }: QueueDialogProps) {
  const availableStock = product.totalStock - product.reservedStock
  const stockPercentage = (product.reservedStock / product.totalStock) * 100
  const daysUntilHarvest = Math.ceil(
    (new Date(product.harvestDate).getTime() - new Date().getTime()) / (1000 * 60 * 60 * 24)
  )

  return (
    <DialogContent className="sm:max-w-[425px]">
      <DialogHeader>
        <DialogTitle>Join Harvest Queue</DialogTitle>
        <DialogDescription>
          Reserve your share of the harvest before it's gone
        </DialogDescription>
      </DialogHeader>
      <div className="grid gap-4 py-4">
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <span className="text-sm font-medium">Reserved Stock</span>
            <span className="text-sm text-muted-foreground">
              {product.reservedStock}/{product.totalStock} kg
            </span>
          </div>
          <Progress value={stockPercentage} className="h-2" />
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <div className="flex items-center gap-2">
                <Calendar className="h-4 w-4 text-primary" />
                <span className="text-sm font-medium">Harvest Date</span>
              </div>
              <div className="text-sm text-muted-foreground">
                {new Date(product.harvestDate).toLocaleDateString()}
                <br />
                ({daysUntilHarvest} days remaining)
              </div>
            </div>
            <div className="space-y-2">
              <div className="flex items-center gap-2">
                <Users className="h-4 w-4 text-primary" />
                <span className="text-sm font-medium">Queue Position</span>
              </div>
              <div className="text-sm text-muted-foreground">
                #{product.queueCount + 1}
                <br />
                ({availableStock}kg available)
              </div>
            </div>
          </div>
        </div>
        <div className="space-y-2">
          <Label>Reservation Amount (kg)</Label>
          <Input type="number" min="1" max={availableStock} defaultValue="1" />
          <p className="text-xs text-muted-foreground">
            Maximum {availableStock}kg available for reservation
          </p>
        </div>
        <div className="flex flex-col gap-2">
          <Button onClick={onClose}>
            Join Queue
          </Button>
          <Button variant="outline" onClick={onClose}>
            Cancel
          </Button>
        </div>
      </div>
    </DialogContent>
  )
}

export default function MarketplacePage() {
  const [searchQuery, setSearchQuery] = useState("")
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null)

  return (
    <div className="min-h-screen bg-gradient-to-b from-background to-background/80">
      {/* Hero Section */}
      <section className="relative h-[40vh] min-h-[400px] w-full overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-primary/10 to-primary/5" />
        <div
          className="absolute inset-0 bg-cover bg-center opacity-10"
          style={{
            backgroundImage: "url('/placeholder.svg?height=600&width=1200')",
          }}
        />
        <div className="relative flex h-full flex-col items-center justify-center space-y-8 px-4 text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="space-y-4"
          >
            <h1 className="text-4xl font-bold tracking-tighter sm:text-5xl md:text-6xl lg:text-7xl">
              Farm to Table Marketplace
            </h1>
            <p className="mx-auto max-w-[600px] text-muted-foreground md:text-xl">
              Reserve fresh produce directly from local farmers before harvest
            </p>
          </motion.div>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="w-full max-w-2xl"
          >
            <div className="relative">
              <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
              <Input
                placeholder="Search for fresh produce, grains, or seasonal items..."
                className="w-full bg-background/95 pl-9 backdrop-blur-sm"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>
          </motion.div>
        </div>
      </section>

      {/* Categories Grid */}
      <section className="container mx-auto px-4 py-12">
        <div className="mb-8 flex items-center justify-between">
          <h2 className="text-2xl font-bold tracking-tight">Categories</h2>
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="outline" size="sm">
                Sort by Harvest Date
                <ChevronDown className="ml-2 h-4 w-4" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuItem>Earliest Harvest</DropdownMenuItem>
              <DropdownMenuItem>Latest Harvest</DropdownMenuItem>
              <DropdownMenuItem>Most Reserved</DropdownMenuItem>
              <DropdownMenuItem>Least Reserved</DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
        <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-6">
          {categories.map((category, index) => (
            <motion.div
              key={category.name}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
            >
              <Button
                variant={selectedCategory === category.name ? "default" : "outline"}
                className="relative h-32 w-full overflow-hidden"
                onClick={() => setSelectedCategory(category.name)}
              >
                <div className="absolute inset-0 bg-gradient-to-b from-primary/5 to-primary/10" />
                <div className="relative space-y-2">
                  <span className="text-2xl">{category.icon}</span>
                  <div>
                    <div className="font-medium">{category.name}</div>
                    <div className="text-xs text-muted-foreground">
                      {category.count} items
                    </div>
                  </div>
                </div>
              </Button>
            </motion.div>
          ))}
        </div>
      </section>

      {/* Products Grid */}
      <section className="container mx-auto px-4 py-12">
        <div className="mb-8 flex items-center justify-between">
          <h2 className="text-2xl font-bold tracking-tight">Upcoming Harvests</h2>
          <Button variant="outline" size="sm">
            <Filter className="mr-2 h-4 w-4" />
            Filters
          </Button>
        </div>
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          {products.map((product, index) => (
            <motion.div
              key={product.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="group relative overflow-hidden rounded-lg border bg-card text-card-foreground shadow-sm transition-all hover:shadow-lg"
            >
              <div className="aspect-square overflow-hidden">
                <img
                  src={product.image || "/placeholder.svg"}
                  alt={product.name}
                  className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-110"
                />
              </div>
              <div className="p-4">
                <div className="mb-2 flex items-center justify-between">
                  <Badge variant="secondary" className="bg-primary/10">
                    {product.category}
                  </Badge>
                  {product.badge && (
                    <Badge variant="default" className="bg-primary text-primary-foreground">
                      {product.badge}
                    </Badge>
                  )}
                </div>
                <h3 className="mb-1 text-lg font-semibold tracking-tight">
                  {product.name}
                </h3>
                <p className="mb-3 line-clamp-2 text-sm text-muted-foreground">
                  {product.description}
                </p>
                <div className="mb-3 space-y-2">
                  <div className="flex items-center justify-between text-sm">
                    <div className="flex items-center gap-1">
                      <Sprout className="h-4 w-4 text-primary" />
                      <span>{product.farmName}</span>
                    </div>
                    <div className="flex items-center gap-1">
                      <Clock className="h-4 w-4 text-primary" />
                      <span>
                        {Math.ceil(
                          (new Date(product.harvestDate).getTime() - new Date().getTime()) /
                            (1000 * 60 * 60 * 24)
                        )}{" "}
                        days
                      </span>
                    </div>
                  </div>
                  <div className="space-y-1">
                    <div className="flex items-center justify-between text-sm">
                      <span className="text-muted-foreground">Reserved</span>
                      <span className="font-medium">
                        {product.reservedStock}/{product.totalStock} {product.unit}
                      </span>
                    </div>
                    <Progress
                      value={(product.reservedStock / product.totalStock) * 100}
                      className="h-1"
                    />
                  </div>
                </div>
                <div className="flex items-center justify-between">
                  <div className="space-y-1">
                    <div className="text-lg font-bold">
                      ${product.price}/{product.unit}
                    </div>
                    <div className="flex items-center text-sm text-muted-foreground">
                      <Users className="mr-1 h-3 w-3" />
                      {product.queueCount} in queue
                    </div>
                  </div>
                  <Dialog>
                    <DialogTrigger asChild>
                      <Button>Join Queue</Button>
                    </DialogTrigger>
                    <QueueDialog
                      product={product}
                      onClose={() => {
                        // Handle queue join
                      }}
                    />
                  </Dialog>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </section>

      {/* Newsletter Section */}
      <section className="border-t bg-card/50 py-12 backdrop-blur-sm">
        <div className="container mx-auto px-4">
          <div className="mx-auto max-w-2xl text-center">
            <h2 className="mb-4 text-2xl font-bold tracking-tight">
              Get Harvest Notifications
            </h2>
            <p className="mb-6 text-muted-foreground">
              Subscribe to receive updates about upcoming harvests and queue openings
            </p>
            <div className="flex gap-2">
              <Input placeholder="Enter your email" className="max-w-sm flex-1" />
              <Button>Subscribe</Button>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}
