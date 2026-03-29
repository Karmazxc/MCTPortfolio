// @ts-nocheck
import { mutation, query } from "./_generated/server";
import { v } from "convex/values";

export const saveQuotation = mutation({
  args: {
    clientName: v.string(),
    email: v.string(),
    projectType: v.string(),
    features: v.array(v.string()),
    budgetRange: v.string(),
    deadline: v.string(),
    estimatedPrice: v.number(),
    estimatedDays: v.number(),
  },
  handler: async (ctx, args) => {
    const quoteId = await ctx.db.insert("quotations", {
      ...args,
      status: "pending",
    });
    return quoteId;
  },
});

export const updateStatus = mutation({
  args: { id: v.id("quotations"), status: v.string() },
  handler: async (ctx, args) => {
    await ctx.db.patch(args.id, { status: args.status });
  },
});

export const deleteQuotation = mutation({
  args: { id: v.id("quotations") },
  handler: async (ctx, args) => {
    await ctx.db.delete(args.id);
  },
});

export const getQuotations = query({
  handler: async (ctx) => {
    return await ctx.db.query("quotations").order("desc").collect();
  },
});
