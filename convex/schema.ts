import { v } from 'convex/values'
import { defineSchema, defineTable } from "convex/server";

export default defineSchema({
    users : defineTable({
        name: v.string(),
        email: v.string(),
        image: v.optional(v.string()),
        clerkId: v.string(),
    }).index("by_clerk_id", ["clerkId"]),

    
})