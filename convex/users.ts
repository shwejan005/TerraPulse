import { v } from "convex/values";
import { mutation, query } from "./_generated/server";

export const syncUser = mutation({
    args: {
        name: v.string(),
        email: v.string(),
        clerkId: v.string(),
        image: v.optional(v.string()),
    },
    handler: async(ctx,args) => {

        const existingUser = await ctx.db.query("users")
        .filter(q => q.eq(q.field("clerkId"), args.clerkId)).first()

        if (existingUser) return;

        return await ctx.db.insert("users",{
            ...args,
        })
    }
})

export const getUser = query({
    handler: async(ctx) => {
        const identity = await ctx.auth.getUserIdentity();
        if (!identity) throw new Error("User not found");
        
        const users = ctx.db.query("users").collect()

        return users;
    }
})

export const getUserByClerkId = query({
    args : { clerkId: v.string() },
    handler: async (ctx,args) => {
        const user = await ctx.db
            .query("users")
            .withIndex("by_clerk_id" , (q) => q.eq("clerkId",args.clerkId))
            .first()
        return user;
    }
})


export const updateLocation = mutation({
    args: {
        clerkId: v.string(),
        location: v.object({
            latitude: v.number(),
            longitude: v.number(),
        }),
    },
    handler: async (ctx, args) => {
        const { clerkId, location } = args;

        // Find the user by Clerk ID
        const existingUser = await ctx.db
            .query("users")
            .filter(q => q.eq(q.field("clerkId"), clerkId))
            .first();

        if (!existingUser) {
            throw new Error("User not found");
        }

        // Only update the location field
        await ctx.db.patch(existingUser._id, {
            location: location,  // Update only the location field
        });

        return { message: "User location updated successfully" };
    },
});
