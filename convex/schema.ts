import { v } from 'convex/values'
import { defineSchema, defineTable } from "convex/server";

export default defineSchema({
    users: defineTable({
        name: v.string(),
        email: v.string(),
        image: v.optional(v.string()),
        clerkId: v.string(),
        location: v.optional(  // Add location field here
            v.object({
                latitude: v.number(),
                longitude: v.number(),
            })
        ),
    }).index("by_clerk_id", ["clerkId"]),
    
    weatherDetails: defineTable({
        userId: v.string(),  // Link weather details to user (via Clerk ID or user ID)
        temperature: v.number(),
        humidity: v.number(),
        windSpeed: v.number(),
        pressure: v.number(),
        cloudCover: v.number(),
        timestamp: v.string(),
    }).index("by_user_id", ["userId"]),
});