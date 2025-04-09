import { v } from "convex/values";
import { mutation, query } from "./_generated/server";

export const getGlobalCount = query({
  args: {},
  handler: async (ctx) => {
    const count = await ctx.db.query("count").first();
    return count;
  },
});

export const list = query({
  args: {},
  handler: async (ctx) => {
    const users = await ctx.db.query("users").collect();
    return Promise.all(
      users.map(async (user) => {
        return {
          name: user.name,
          count: user.count,
        };
      }),
    );
  },
});

export const incrementGlobalCount = mutation({
  args: { amount: v.number() },
  handler: async (ctx, { amount }) => {
    const count = await ctx.db.query("count").first();
    count && (await ctx.db.patch(count._id, { count: count.count + amount }));
  },
});

export const incrementUserCount = mutation({
  args: { amount: v.number() },
  handler: async (ctx, { amount }) => {
    const identity = await ctx.auth.getUserIdentity();
    if (!identity) {
      throw new Error("Not authenticated");
    }

    const user = await ctx.db
      .query("users")
      .withIndex("byExternalId", (q) => q.eq("externalId", identity.subject))
      .first();

    if (!user) {
      throw new Error("User not found");
    }

    await ctx.db.patch(user._id, {
      count: (user.count ?? 0) + amount,
    });
  },
});
