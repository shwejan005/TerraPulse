"use client"

import { Brain, Calendar, CloudSun, Droplet, Leaf, MapPin, Plus, Sprout, Users, Zap } from 'lucide-react'
import { useState } from "react"
import { motion } from "framer-motion"
import React from 'react'; // Added import for React

import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Progress } from "@/components/ui/progress"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"

// Sample data
const fields = [
  {
    id: 1,
    name: "North Field",
    size: "5.2 acres",
    crop: "Tomatoes",
    harvestDate: "2024-02-15",
    progress: 75,
    weather: {
      temp: "24°C",
      humidity: "68%",
    },
    soilType: "Clay loam",
  },
  {
    id: 2,
    name: "South Field",
    size: "3.8 acres",
    crop: "Sweet Corn",
    harvestDate: "2024-02-20",
    progress: 60,
    weather: {
      temp: "23°C",
      humidity: "65%",
    },
    soilType: "Sandy loam",
  },
  {
    id: 3,
    name: "East Field",
    size: "4.5 acres",
    crop: "Rice",
    harvestDate: "2024-03-01",
    progress: 45,
    weather: {
      temp: "25°C",
      humidity: "70%",
    },
    soilType: "Silty clay",
  },
]

const marketData = [
  {
    crop: "Tomatoes",
    demand: "High",
    price: "$4.99/kg",
    buyers: 12,
  },
  {
    crop: "Sweet Corn",
    demand: "Medium",
    price: "$3.49/dozen",
    buyers: 8,
  },
  {
    crop: "Rice",
    demand: "High",
    price: "$6.99/kg",
    buyers: 25,
  },
]

// Mock AI-generated farming practices suggestions
const getAISuggestions = (field: (typeof fields)[0]): string => {
  const suggestions = {
    Tomatoes: {
      cropRotation: "Follow tomatoes with legumes or brassicas to improve soil nitrogen and break disease cycles.",
      fertilizer: "Use a balanced NPK fertilizer with higher potassium for fruit development.",
      waterManagement: "Implement drip irrigation to maintain consistent soil moisture.",
    },
    "Sweet Corn": {
      cropRotation: "Rotate with legumes or small grains to improve soil structure and nutrient balance.",
      fertilizer: "Apply nitrogen-rich fertilizer, split into multiple applications throughout the growing season.",
      waterManagement: "Use furrow irrigation, ensuring adequate water during tasseling and ear formation stages.",
    },
    Rice: {
      cropRotation: "Consider rotating with legumes or cover crops to improve soil fertility and reduce pest pressure.",
      fertilizer: "Apply phosphorus and potassium before planting, and split nitrogen applications.",
      waterManagement: "Maintain flooded conditions during most of the growing season, with periodic draining.",
    },
  }

  const cropSuggestions = suggestions[field.crop as keyof typeof suggestions]

  return `
    Based on the current conditions of ${field.name} (${field.size}, ${field.soilType} soil):

    1. Crop Rotation: ${cropSuggestions.cropRotation}
    2. Fertilizer Usage: ${cropSuggestions.fertilizer}
    3. Water Management: ${cropSuggestions.waterManagement}
    4. Soil Health: Consider soil testing to monitor nutrient levels and pH. Adjust practices based on results.
    5. Weather Considerations: Current temperature (${field.weather.temp}) and humidity (${field.weather.humidity}) are suitable for ${field.crop}. Monitor for any extreme weather events.
  `
}

interface Field {
  id: number
  name: string
  size: string
  crop: string
  harvestDate: string
  progress: number
  weather: {
    temp: string
    humidity: string
  }
  soilType: string
}

// Mock function to simulate image processing
const processFieldImage = async (file: File): Promise<Partial<Field>> => {
  // Simulate API call delay
  await new Promise((resolve) => setTimeout(resolve, 1500))
  return {
    size: "4.7 acres",
    soilType: "Loamy sand",
  }
}

// Mock function to simulate Twilio integration
const processTwilioInput = async (phoneNumber: string): Promise<Partial<Field>> => {
  // Simulate API call delay
  await new Promise((resolve) => setTimeout(resolve, 1500))
  return {
    name: "West Field",
    size: "3.2 acres",
    crop: "Wheat",
    soilType: "Clay loam",
  }
}

export default function DashboardPage() {
  const [isAddFieldOpen, setIsAddFieldOpen] = useState(false)
  const [selectedField, setSelectedField] = useState<Field | null>(null)
  const [newField, setNewField] = useState<Partial<Field>>({})
  const [isProcessing, setIsProcessing] = useState(false)

  const handleManualInput = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    setNewField({ ...newField, [e.target.name]: e.target.value })
  }

  const handleImageUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setIsProcessing(true)
      try {
        const result = await processFieldImage(e.target.files[0])
        setNewField({ ...newField, ...result })
      } catch (error) {
        console.error("Error processing image:", error)
      } finally {
        setIsProcessing(false)
      }
    }
  }

  const handleTwilioInput = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    const phoneNumber = (e.currentTarget.elements.namedItem("phoneNumber") as HTMLInputElement).value
    setIsProcessing(true)
    try {
      const result = await processTwilioInput(phoneNumber)
      setNewField({ ...newField, ...result })
    } catch (error) {
      console.error("Error processing Twilio input:", error)
    } finally {
      setIsProcessing(false)
    }
  }

  const handleAddField = () => {
    // Here you would typically send the newField data to your backend
    console.log("New field data:", newField)
    setIsAddFieldOpen(false)
    setNewField({})
  }

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
      }
    }
  }

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        type: "spring",
        stiffness: 100
      }
    }
  }

  const MotionCard = motion(Card)

  return (
    <div className="container mx-auto p-6">
      <div className="flex flex-col gap-6">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold tracking-tight">Field Dashboard</h1>
            <p className="text-muted-foreground">Overview of your agricultural fields</p>
          </div>
          <div className="flex items-center gap-4">
            <Dialog open={isAddFieldOpen} onOpenChange={setIsAddFieldOpen}>
              <DialogTrigger asChild>
                <Button className="gap-2">
                  <Plus className="h-4 w-4" />
                  Add Field
                </Button>
              </DialogTrigger>
              <DialogContent className="sm:max-w-[425px]">
                <DialogHeader>
                  <DialogTitle>Add New Field</DialogTitle>
                  <DialogDescription>Choose a method to add a new field to your dashboard.</DialogDescription>
                </DialogHeader>
                <Tabs defaultValue="manual" className="w-full">
                  <TabsList className="grid w-full grid-cols-3">
                    <TabsTrigger value="manual">Manual</TabsTrigger>
                    <TabsTrigger value="image">Image</TabsTrigger>
                    <TabsTrigger value="twilio">Twilio</TabsTrigger>
                  </TabsList>
                  <TabsContent value="manual">
                    <div className="grid gap-4 py-4">
                      <div className="grid grid-cols-4 items-center gap-4">
                        <Label htmlFor="name" className="text-right">
                          Name
                        </Label>
                        <Input id="name" name="name" className="col-span-3" onChange={handleManualInput} />
                      </div>
                      <div className="grid grid-cols-4 items-center gap-4">
                        <Label htmlFor="size" className="text-right">
                          Size (acres)
                        </Label>
                        <Input
                          id="size"
                          name="size"
                          type="number"
                          className="col-span-3"
                          onChange={handleManualInput}
                        />
                      </div>
                      <div className="grid grid-cols-4 items-center gap-4">
                        <Label htmlFor="crop" className="text-right">
                          Crop
                        </Label>
                        <Select
                          name="crop"
                          onValueChange={(value) => handleManualInput({ target: { name: "crop", value } } as any)}
                        >
                          <SelectTrigger className="col-span-3">
                            <SelectValue placeholder="Select a crop" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="tomatoes">Tomatoes</SelectItem>
                            <SelectItem value="corn">Sweet Corn</SelectItem>
                            <SelectItem value="rice">Rice</SelectItem>
                            <SelectItem value="wheat">Wheat</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                      <div className="grid grid-cols-4 items-center gap-4">
                        <Label htmlFor="soilType" className="text-right">
                          Soil Type
                        </Label>
                        <Input id="soilType" name="soilType" className="col-span-3" onChange={handleManualInput} />
                      </div>
                      <div className="grid grid-cols-4 items-center gap-4">
                        <Label htmlFor="harvestDate" className="text-right">
                          Harvest Date
                        </Label>
                        <Input
                          id="harvestDate"
                          name="harvestDate"
                          type="date"
                          className="col-span-3"
                          onChange={handleManualInput}
                        />
                      </div>
                    </div>
                  </TabsContent>
                  <TabsContent value="image">
                    <div className="grid gap-4 py-4">
                      <div className="grid grid-cols-4 items-center gap-4">
                        <Label htmlFor="fieldImage" className="text-right">
                          Field Image
                        </Label>
                        <Input
                          id="fieldImage"
                          type="file"
                          accept="image/*"
                          className="col-span-3"
                          onChange={handleImageUpload}
                        />
                      </div>
                      {isProcessing && <p>Processing image...</p>}
                      {newField.size && (
                        <div className="grid grid-cols-4 items-center gap-4">
                          <Label className="text-right">Size</Label>
                          <span className="col-span-3">{newField.size}</span>
                        </div>
                      )}
                      {newField.soilType && (
                        <div className="grid grid-cols-4 items-center gap-4">
                          <Label className="text-right">Soil Type</Label>
                          <span className="col-span-3">{newField.soilType}</span>
                        </div>
                      )}
                      <div className="grid grid-cols-4 items-center gap-4">
                        <Label htmlFor="name" className="text-right">
                          Name
                        </Label>
                        <Input id="name" name="name" className="col-span-3" onChange={handleManualInput} />
                      </div>
                      <div className="grid grid-cols-4 items-center gap-4">
                        <Label htmlFor="crop" className="text-right">
                          Crop
                        </Label>
                        <Select
                          name="crop"
                          onValueChange={(value) => handleManualInput({ target: { name: "crop", value } } as any)}
                        >
                          <SelectTrigger className="col-span-3">
                            <SelectValue placeholder="Select a crop" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="tomatoes">Tomatoes</SelectItem>
                            <SelectItem value="corn">Sweet Corn</SelectItem>
                            <SelectItem value="rice">Rice</SelectItem>
                            <SelectItem value="wheat">Wheat</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                    </div>
                  </TabsContent>
                  <TabsContent value="twilio">
                    <form onSubmit={handleTwilioInput} className="grid gap-4 py-4">
                      <div className="grid grid-cols-4 items-center gap-4">
                        <Label htmlFor="phoneNumber" className="text-right">
                          Phone Number
                        </Label>
                        <Input id="phoneNumber" name="phoneNumber" type="tel" className="col-span-3" />
                      </div>
                      <Button type="submit" disabled={isProcessing}>
                        {isProcessing ? "Processing..." : "Get Field Data"}
                      </Button>
                      {Object.entries(newField).map(([key, value]) => (
                        <div key={key} className="grid grid-cols-4 items-center gap-4">
                          <Label className="text-right">{key}</Label>
                          <span className="col-span-3">{typeof value === 'object' ? JSON.stringify(value) : value}</span>
                        </div>
                      ))}
                    </form>
                  </TabsContent>
                </Tabs>
                <div className="flex justify-end mt-4">
                  <Button onClick={handleAddField}>Add Field</Button>
                </div>
              </DialogContent>
            </Dialog>
            <Button variant="outline" className="gap-2">
              <MapPin className="h-4 w-4" />
              Uppal Kalan
            </Button>
          </div>
        </div>

        {/* Stats Overview */}
        <motion.div
          className="grid gap-4 md:grid-cols-3"
          variants={containerVariants}
          initial="hidden"
          animate="visible"
        >
          <MotionCard variants={itemVariants}>
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-sm font-medium">Total Fields</CardTitle>
              <Leaf className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">3 Fields</div>
              <p className="text-xs text-muted-foreground">13.5 acres total</p>
            </CardContent>
          </MotionCard>
          <MotionCard variants={itemVariants}>
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-sm font-medium">Active Crops</CardTitle>
              <CloudSun className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">3 Types</div>
              <p className="text-xs text-muted-foreground">All growing well</p>
            </CardContent>
          </MotionCard>
          <MotionCard variants={itemVariants}>
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-sm font-medium">Market Interest</CardTitle>
              <Users className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">45 Buyers</div>
              <p className="text-xs text-muted-foreground">Across all crops</p>
            </CardContent>
          </MotionCard>
        </motion.div>

        {/* Fields Grid */}
        <motion.div
          className="grid gap-4 md:grid-cols-2 lg:grid-cols-3"
          variants={containerVariants}
          initial="hidden"
          animate="visible"
        >
          {fields.map((field) => (
            <MotionCard key={field.id} variants={itemVariants}>
              <CardHeader>
                <div className="flex items-center justify-between">
                  <CardTitle>{field.name}</CardTitle>
                  <Badge variant="outline">{field.size}</Badge>
                </div>
                <CardDescription>{field.crop}</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-center justify-between text-sm">
                  <div className="flex items-center gap-2">
                    <Calendar className="h-4 w-4 text-muted-foreground" />
                    <span>Harvest: {field.harvestDate}</span>
                  </div>
                  <Badge variant="secondary" className="font-normal">
                    {field.progress}% Ready
                  </Badge>
                </div>
                <Progress value={field.progress} />
                <div className="grid grid-cols-2 gap-2">
                  <div className="flex items-center gap-2 text-sm">
                    <CloudSun className="h-4 w-4 text-muted-foreground" />
                    <span>{field.weather.temp}</span>
                  </div>
                  <div className="flex items-center gap-2 text-sm">
                    <MapPin className="h-4 w-4 text-muted-foreground" />
                    <span>{field.weather.humidity}</span>
                  </div>
                </div>
                <Button variant="outline" className="w-full" onClick={() => setSelectedField(field)}>
                  <Brain className="mr-2 h-4 w-4" />
                  AI Suggestions
                </Button>
              </CardContent>
            </MotionCard>
          ))}
        </motion.div>

        {/* AI Suggestions Dialog */}
        <Dialog open={!!selectedField} onOpenChange={() => setSelectedField(null)}>
          <DialogContent className="max-w-[800px]">
            <DialogHeader>
              <DialogTitle>AI-Generated Farming Practices Suggestions</DialogTitle>
              <DialogDescription>Tailored recommendations for {selectedField?.name}</DialogDescription>
            </DialogHeader>
            <div className="mt-4 whitespace-pre-wrap">{selectedField && getAISuggestions(selectedField)}</div>
          </DialogContent>
        </Dialog>

        {/* Market Overview */}
        <MotionCard variants={itemVariants}>
          <CardHeader>
            <CardTitle>Market Overview</CardTitle>
            <CardDescription>Current demand and pricing</CardDescription>
          </CardHeader>
          <CardContent>
            <motion.div
              className="grid gap-4 md:grid-cols-3"
              variants={containerVariants}
              initial="hidden"
              animate="visible"
            >
              {marketData.map((item, i) => (
                <MotionCard key={i} variants={itemVariants}>
                  <CardContent className="pt-6">
                    <div className="flex items-center justify-between mb-4">
                      <span className="font-medium">{item.crop}</span>
                      <Badge>{item.demand}</Badge>
                    </div>
                    <div className="space-y-2">
                      <div className="text-2xl font-bold">{item.price}</div>
                      <div className="flex items-center gap-2 text-sm text-muted-foreground">
                        <Users className="h-4 w-4" />
                        <span>{item.buyers} interested buyers</span>
                      </div>
                    </div>
                  </CardContent>
                </MotionCard>
              ))}
            </motion.div>
          </CardContent>
        </MotionCard>

        {/* AI-Generated Summary */}
        <MotionCard className="mt-8" variants={itemVariants}>
          <CardHeader>
            <CardTitle className="text-2xl font-bold">AI-Powered Farming Insights</CardTitle>
            <CardDescription>
              Comprehensive analysis and recommendations based on local agricultural conditions
            </CardDescription>
          </CardHeader>
          <CardContent>
            <motion.div
              className="grid gap-6 md:grid-cols-2 lg:grid-cols-3"
              variants={containerVariants}
              initial="hidden"
              animate="visible"
            >
              <MotionCard variants={itemVariants}>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">Crop Rotation</CardTitle>
                  <Sprout className="h-4 w-4 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">3-Year Plan</div>
                  <p className="text-xs text-muted-foreground">
                    Optimized for soil health and yield
                  </p>
                  <div className="mt-4 space-y-2">
                    <div className="flex items-center">
                      <div className="w-16 text-sm">Year 1:</div>
                      <Badge>Corn</Badge>
                    </div>
                    <div className="flex items-center">
                      <div className="w-16 text-sm">Year 2:</div>
                      <Badge>Soybeans</Badge>
                    </div>
                    <div className="flex items-center">
                      <div className="w-16 text-sm">Year 3:</div>
                      <Badge>Wheat</Badge>
                    </div>
                  </div>
                </CardContent>
              </MotionCard>
              <MotionCard variants={itemVariants}>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">Land Usage</CardTitle>
                  <MapPin className="h-4 w-4 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">85% Efficiency</div>
                  <p className="text-xs text-muted-foreground">
                    Improved from 72% last season
                  </p>
                  <div className="mt-4">
                    <Progress value={85} className="h-2" />
                    <div className="mt-2 flex text-xs text-muted-foreground justify-between">
                      <span>Crops: 75%</span>
                      <span>Conservation: 10%</span>
                      <span>Fallow: 15%</span>
                    </div>
                  </div>
                </CardContent>
              </MotionCard>
              <MotionCard variants={itemVariants}>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">Fertilizer Usage</CardTitle>
                  <Leaf className="h-4 w-4 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">Precision Application</div>
                  <p className="text-xs text-muted-foreground">
                    20% reduction in overall usage
                  </p>
                  <div className="mt-4 space-y-2">
                    <div className="flex items-center justify-between">
                      <span className="text-sm">Nitrogen (N):</span>
                      <Badge variant="outline">120 lbs/acre</Badge>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-sm">Phosphorus (P):</span>
                      <Badge variant="outline">40 lbs/acre</Badge>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-sm">Potassium (K):</span>
                      <Badge variant="outline">60 lbs/acre</Badge>
                    </div>
                  </div>
                </CardContent>
              </MotionCard>
              <MotionCard variants={itemVariants}>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">Water Management</CardTitle>
                  <Droplet className="h-4 w-4 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">Smart Irrigation</div>
                  <p className="text-xs text-muted-foreground">
                    30% water savings compared to traditional methods
                  </p>
                  <div className="mt-4 space-y-2">
                    <div className="flex items-center justify-between">
                      <span className="text-sm">Method:</span>
                      <Badge>Drip Irrigation</Badge>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-sm">Frequency:</span>
                      <Badge variant="outline">Every 3 days</Badge>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-sm">Duration:</span>
                      <Badge variant="outline">2 hours</Badge>
                    </div>
                  </div>
                </CardContent>
              </MotionCard>
              <MotionCard variants={itemVariants}>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">Weather Patterns</CardTitle>
                  <CloudSun className="h-4 w-4 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">Seasonal Forecast</div>
                  <p className="text-xs text-muted-foreground">
                    Predictions for the next 3 months
                  </p>
                  <div className="mt-4 space-y-2">
                    <div className="flex items-center justify-between">
                      <span className="text-sm">Temperature:</span>
                      <Badge variant="outline">2°C above average</Badge>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-sm">Rainfall:</span>
                      <Badge variant="outline">10% below average</Badge>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-sm">Growing Degree Days:</span>
                      <Badge variant="outline">5% increase</Badge>
                    </div>
                  </div>
                </CardContent>
              </MotionCard>
              <MotionCard variants={itemVariants}>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">Soil Health</CardTitle>
                  <Zap className="h-4 w-4 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">Improving</div>
                  <p className="text-xs text-muted-foreground">
                    15% increase in organic matter
                  </p>
                  <div className="mt-4 space-y-2">
                    <div className="flex items-center justify-between">
                      <span className="text-sm">pH Level:</span>
                      <Badge variant="outline">6.5</Badge>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-sm">Organic Matter:</span>
                      <Badge variant="outline">3.8%</Badge>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-sm">Microbial Activity:</span>
                      <Badge>High</Badge>
                    </div>
                  </div>
                </CardContent>
              </MotionCard>
            </motion.div>
            <motion.div
              className="mt-6"
              variants={itemVariants}
              initial="hidden"
              animate="visible"
            >
              <h3 className="text-2xl font-semibold mb-2">AI Recommendations:</h3>
              <ul className="list-disc list-inside space-y-2 text-lg text-muted-foreground">
                <li>Implement cover cropping during fallow periods to improve soil structure and prevent erosion.</li>
                <li>Consider adopting no-till practices to enhance soil health and reduce operational costs.</li>
                <li>Explore precision agriculture technologies for targeted fertilizer and pesticide applications.</li>
                <li>Invest in drought-resistant crop varieties to mitigate risks associated with predicted lower rainfall.</li>
                <li>Establish windbreaks or shelterbelts to protect crops from wind damage and improve microclimate.</li>
              </ul>
            </motion.div>
          </CardContent>
        </MotionCard>
      </div>
    </div>
  )
}
