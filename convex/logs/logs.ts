// @ts-nocheck
import { mutation, query } from "../_generated/server";
import { v } from "convex/values";

export const addLog = mutation({
  args: {
    action: v.string(),
    details: v.string(),
    userIdentifier: v.string(),
  },
  handler: async (ctx, args) => {
    return await ctx.db.insert("adminLogs", {
      ...args,
      timestamp: Date.now(),
    });
  },
});

export const getLogs = query({
  handler: async (ctx) => {
    return await ctx.db.query("adminLogs").order("desc").take(50);
  },
});
