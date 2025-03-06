import { query } from "./_generated/server";

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
