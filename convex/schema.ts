import { defineSchema, defineTable } from "convex/server";
import { v } from "convex/values";

const schema = defineSchema({
  users: defineTable({
    name: v.string(),
    // this the Clerk ID, stored in the subject JWT field
    externalId: v.string(),
    count: v.optional(v.number()),
  }).index("byExternalId", ["externalId"]),
  count: defineTable({
    count: v.number(),
  }),
});

export default schema;
