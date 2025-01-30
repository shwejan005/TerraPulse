import { v } from "convex/values";
import { defineSchema, defineTable } from "convex/server";

export default defineSchema({
  users: defineTable({
    name: v.string(),
    email: v.string(),
    image: v.optional(v.string()),
    clerkId: v.string(),
    location: v.optional(
      v.object({
        latitude: v.number(),
        longitude: v.number(),
      })
    ),
  }).index("by_clerk_id", ["clerkId"]),

  weatherDetails: defineTable({
    userId: v.string(), // Links weather details to user
    cityName: v.string(), // City name
    countryCode: v.string(), // Country code
    datetime: v.string(), // Date-time in ISO format
    weather: v.object({
      code: v.number(),
      description: v.string(), // Weather condition
      icon: v.string(), // Weather icon code
    }),
    temp: v.number(), // Temperature (°C)
    appTemp: v.number(), // Apparent temperature (°C)
    humidity: v.number(), // Relative humidity (%)
    windSpeed: v.number(), // Wind speed (m/s)
    pressure: v.number(), // Atmospheric pressure (hPa)
    cloudCover: v.number(), // Cloud coverage (%)
    precip: v.number(), // Precipitation (mm)
    dewpt: v.number(), // Dew point (°C)
    uvIndex: v.number(), // UV Index
    solarRad: v.number(), // Solar radiation (W/m²)
  }).index("by_user_id", ["userId"]),
});