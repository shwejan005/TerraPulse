import { mutation, query } from "./_generated/server";
import { v } from "convex/values";

// Query to get weather details for a user by Clerk ID
export const getWeatherByClerkId = query({
    args: { clerkId: v.string() },
    handler: async (ctx, args) => {
      const user = await ctx.db
        .query("users")
        .filter(q => q.eq(q.field("clerkId"), args.clerkId))
        .first();
  
      if (!user) {
        throw new Error("User not found");
      }
  
      // Fetch the first weather data associated with the user (no need to order)
      const weatherDetails = await ctx.db
        .query("weatherDetails")
        .filter(q => q.eq(q.field("userId"), user._id))
        .first();  // Fetch the first result (this will be based on insertion order)
  
      if (!weatherDetails) {
        throw new Error("No weather details found for this user");
      }
      return weatherDetails;
    },
  });

// Mutation to store weather data for a user
export const storeWeatherDetails = mutation({
  args: {
    clerkId: v.string(),
    temperature: v.number(),
    humidity: v.number(),
    windSpeed: v.number(),
    pressure: v.number(),
    cloudCover: v.number(),
  },
  handler: async (ctx, args) => {
    // Fetch the user based on clerkId
    const user = await ctx.db
      .query("users")
      .filter(q => q.eq(q.field("clerkId"), args.clerkId))
      .first();

    if (!user) {
      throw new Error("User not found");
    }

    // Insert weather data for the user
    await ctx.db.insert("weatherDetails", {
      userId: user._id,  // Store the user's unique ID from the users table
      temperature: args.temperature,
      humidity: args.humidity,
      windSpeed: args.windSpeed,
      pressure: args.pressure,
      cloudCover: args.cloudCover,
      timestamp: String(new Date()),  // Store the timestamp of when the data was recorded
    });

    return { message: "Weather data stored successfully" };
  },
});