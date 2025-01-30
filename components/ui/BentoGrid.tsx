"use client"

import {
  CloudSun,
  DropletsIcon as Drop,
  Leaf,
  RotateCcw,
  Satellite,
  Sun,
  Thermometer,
  Waves,
  Wind
} from "lucide-react"
import Link from "next/link"

import { Badge } from "@/components/ui/badge"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import BubbleButton from "./BubbleButton"

export default function FarmAnalyticsGrid() {
  return (
    <section className="container mx-auto p-4 py-8">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {/* Main Hero Card */}
        <Card className="md:col-span-2 bg-gradient-to-br from-primary/10 to-primary/20 border-primary/20">
          <CardContent className="p-8 space-y-6">
            <div className="flex items-center gap-6 mb-8">
              {[Satellite, Leaf].map((Icon, index) => (
                <div key={index} className="relative">
                  <div className="absolute inset-0 bg-primary/20 blur-xl rounded-full" />
                  <Icon className="w-12 h-12 text-primary relative" />
                </div>
              ))}
            </div>
            <div className="space-y-4">
            <h1 className="text-green-600 dark:text-white text-4xl md:text-5xl font-bold tracking-tight">
                AI-Powered Farming Insights
            </h1>

              <p className="text-xl text-muted-foreground">
                Optimize your crops with real-time weather analysis and smart rotation planning
              </p>
            </div>
            <div>
                <Link href="/dashboard">
                  <BubbleButton>
                    Get Started
                  </BubbleButton>
                </Link>
            </div>
          </CardContent>
        </Card>

        {/* Weather Analysis Card */}
        <Card className="group hover:shadow-lg transition-all duration-300">
          <CardHeader>
            <div className="flex items-center gap-3">
              <div className="p-2 rounded-lg bg-primary/10 text-primary">
                <CloudSun className="w-6 h-6" />
              </div>
              <CardTitle>Live Weather</CardTitle>
            </div>
            <CardDescription>Real-time field conditions</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="grid grid-cols-2 gap-2">
                <Card className="bg-card/50">
                  <CardContent className="p-3 flex items-center gap-2">
                    <Drop className="w-4 h-4 text-primary" />
                    <span className="text-sm font-medium">68% Humidity</span>
                  </CardContent>
                </Card>
                <Card className="bg-card/50">
                  <CardContent className="p-3 flex items-center gap-2">
                    <Thermometer className="w-4 h-4 text-primary" />
                    <span className="text-sm font-medium">24°C</span>
                  </CardContent>
                </Card>
              </div>
              <div className="flex gap-2 flex-wrap">
                <Badge variant="secondary">Rainfall Tracking</Badge>
                <Badge variant="secondary">Soil Temperature</Badge>
                <Badge variant="secondary">Wind Speed</Badge>
              </div>
            </div>
          </CardContent>
          <div className="flex items-center justify-center text-center">
            <Link href="/weather">
              <BubbleButton>
                Weather Forecast
              </BubbleButton>
            </Link>
          </div>
        </Card>

        {/* Marketplace card */}
        <Card className="md:col-span-3 group hover:shadow-lg transition-all duration-300 bg-card/50">
        <CardContent className="p-8 grid md:grid-cols-2 gap-8">
            <div className="space-y-6">
            <div className="p-3 rounded-lg bg-primary/10 w-fit">
                <RotateCcw className="w-8 h-8 text-primary" />
            </div>
            <div>
                <h2 className="text-3xl font-bold tracking-tight mb-3">Marketplace</h2>
                <p className="mt-2 text-muted-foreground text-lg">
                Farm to Table without any Middlemen
                </p>
                <p className="mt-4 text-muted-foreground text-lg">
                Maximised Profits for Farmers Minimised Expenditure and Minimised Expenditure for Customers
                </p>
            </div>
            </div>
            <Card>
            <CardHeader>
                <CardTitle>Top Sellers</CardTitle>
            </CardHeader>
            <CardContent>
                <div className="space-y-4">
                {[
                    { item: "Premium Seeds", price: "$100" },
                    { item: "Irrigation Equipment", price: "$500" },
                ].map((product, i) => (
                    <div
                    key={i}
                    className="flex items-center justify-between p-3 rounded-lg bg-primary/5 hover:bg-primary/10 transition-colors"
                    >
                    <div className="flex items-center gap-3">
                        <Leaf className="w-4 h-4 text-primary" />
                        <span className="font-medium">{product.item}</span>
                    </div>
                    <Badge variant="outline">{product.price}</Badge>
                    </div>
                ))}
                </div>
                {/* Go to Marketplace Button */}
                <Link href={'/marketplace'} className="mt-6 flex justify-center">
                    <BubbleButton>
                        Go to Marketplace
                    </BubbleButton>
                </Link>
            </CardContent>
            </Card>
        </CardContent>
        </Card>

        {/* Soil Health Card */}
        <Card className="group hover:shadow-lg transition-all duration-300">
          <CardHeader>
            <div className="flex items-center gap-3">
              <div className="p-2 rounded-lg bg-primary/10 text-primary">
                <Sun className="w-6 h-6" />
              </div>
              <CardTitle>Soil Health Monitoring</CardTitle>
            </div>
            <CardDescription>Track nutrients and pH levels</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="grid grid-cols-2 gap-2">
                <Card className="bg-card/50">
                  <CardContent className="p-3 flex items-center gap-2">
                    <Wind className="w-4 h-4 text-primary" />
                    <span className="text-sm font-medium">Balanced pH: 6.5</span>
                  </CardContent>
                </Card>
                <Card className="bg-card/50">
                  <CardContent className="p-3 flex items-center gap-2">
                    <Drop className="w-4 h-4 text-primary" />
                    <span className="text-sm font-medium">Adequate Moisture</span>
                  </CardContent>
                </Card>
              </div>
              <Badge variant="secondary">Nutrient Tracking</Badge>
            </div>
          </CardContent>
        </Card>

        {/* Irrigation Scheduler Card */}
        <Card className="group hover:shadow-lg transition-all duration-300">
          <CardHeader>
            <div className="flex items-center gap-3">
              <div className="p-2 rounded-lg bg-primary/10 text-primary">
                <Waves className="w-6 h-6" />
              </div>
              <CardTitle>Irrigation Scheduler</CardTitle>
            </div>
            <CardDescription>Optimize water usage</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="grid grid-cols-2 gap-2">
                <Card className="bg-card/50">
                  <CardContent className="p-3 flex items-center gap-2">
                    <Waves className="w-4 h-4 text-primary" />
                    <span className="text-sm font-medium">Last Watered: 2 Days Ago</span>
                  </CardContent>
                </Card>
                <Card className="bg-card/50">
                  <CardContent className="p-3 flex items-center gap-2">
                    <Thermometer className="w-4 h-4 text-primary" />
                    <span className="text-sm font-medium">Optimal Temp: 25°C</span>
                  </CardContent>
                </Card>
              </div>
              <Badge variant="secondary">Water Usage</Badge>
            </div>
          </CardContent>
        </Card>
        <Card className="group hover:shadow-lg transition-all duration-300">
            <CardHeader>
                <div className="flex items-center gap-3">
                <div className="p-2 rounded-lg bg-primary/10 text-primary">
                    <Satellite className="w-6 h-6" />
                </div>
                <CardTitle>Yield Forecasting</CardTitle>
                </div>
                <CardDescription>AI-powered production estimates</CardDescription>
            </CardHeader>
            <CardContent>
                <div className="space-y-4">
                <div className="grid grid-cols-2 gap-2">
                    <Card className="bg-card/50">
                    <CardContent className="p-3 flex items-center gap-2">
                        <Sun className="w-4 h-4 text-primary" />
                        <span className="text-sm font-medium">Projected Yield: 1200 kg</span>
                    </CardContent>
                    </Card>
                    <Card className="bg-card/50">
                    <CardContent className="p-3 flex items-center gap-2">
                        <Leaf className="w-4 h-4 text-primary" />
                        <span className="text-sm font-medium">Health Index: 85%</span>
                    </CardContent>
                    </Card>
                </div>
                <div className="space-x-4">
                    <Badge variant="secondary">Harvest Predictions</Badge>
                    <Badge variant="secondary">AI Analysis</Badge>
                </div>
            </div>
            </CardContent>
        </Card>
        {/* Crop Rotation Card */}
        <Card className="md:col-span-3 group hover:shadow-lg transition-all duration-300">
          <CardContent className="p-8 grid md:grid-cols-2 gap-8">
            <div className="space-y-6">
              <div className="p-3 rounded-lg bg-primary/10 w-fit">
                <RotateCcw className="w-8 h-8 text-primary" />
              </div>
              <div>
                <h2 className="text-3xl font-bold tracking-tight mb-3">Smart Crop Rotation</h2>
                <p className="text-muted-foreground text-lg">
                  AI-powered recommendations based on your field's history and soil health
                </p>
              </div>
            </div>
            <Card>
              <CardHeader>
                <CardTitle>Recommended Rotation Plan</CardTitle>
                <CardDescription>Based on soil analysis and weather patterns</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {[
                    { sequence: "Legumes → Grains → Leafy Greens", status: "Optimal" },
                    { sequence: "Root Crops → Brassicas", status: "Good" },
                  ].map((plan, i) => (
                    <div
                      key={i}
                      className="flex items-center justify-between p-3 rounded-lg bg-primary/5 hover:bg-primary/10 transition-colors"
                    >
                      <div className="flex items-center gap-3">
                        <Leaf className="w-4 h-4 text-primary" />
                        <span className="font-medium">{plan.sequence}</span>
                      </div>
                      <Badge variant="outline">{plan.status}</Badge>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </CardContent>
        </Card>
      </div>
    </section>
  )
}
