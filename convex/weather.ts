import { mutation, query } from "./_generated/server";
import { v } from "convex/values";

export const updateWeather = mutation({
    args: {
      userId: v.string(),
      cityName: v.string(),
      countryCode: v.string(),
      datetime: v.string(),
      weather: v.object({
        code: v.number(),           // Include `code` as a number
        description: v.string(),
        icon: v.string(),
      }),
      temp: v.number(),
      appTemp: v.number(),
      humidity: v.number(),
      windSpeed: v.number(),
      pressure: v.number(),
      cloudCover: v.number(),
      precip: v.number(),
      dewpt: v.number(),
      uvIndex: v.number(),
      solarRad: v.number(),
    },
    handler: async (ctx, args) => {
      const { userId, datetime } = args;
  
      // Check if weather details already exist for this user
      const existingWeather = await ctx.db
        .query("weatherDetails")
        .withIndex("by_user_id", (q) => q.eq("userId", userId))
        .first();
  
      if (existingWeather) {
        // Update the existing record
        await ctx.db.patch(existingWeather._id, {
          ...args,
        });
      } else {
        // Insert a new weather record
        await ctx.db.insert("weatherDetails", { ...args });
      }
    },
});

export const getWeatherDetails = query({
  args: {
    userId: v.string(),
  },
  handler: async (ctx, args) => {
    const { userId } = args;

    // Query the weatherDetails collection to find data for the given userId
    const weatherDetails = await ctx.db
      .query("weatherDetails")
      .withIndex("by_user_id", (q) => q.eq("userId", userId))
      .first();  // Use .first() if you expect a single result, or .collect() for multiple

    return weatherDetails;
  },
});