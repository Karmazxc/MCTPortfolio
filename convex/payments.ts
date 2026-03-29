// @ts-nocheck
import { mutation, query } from "./_generated/server";
import { v } from "convex/values";

export const savePaymentProof = mutation({
  args: {
    quoteId: v.id("quotations"),
    fileId: v.string(),
    amount: v.optional(v.number()),
    notes: v.optional(v.string()),
  },
  handler: async (ctx, args) => {
    return await ctx.db.insert("paymentProofs", {
      ...args,
      uploadedAt: Date.now(),
      status: "pending",
    });
  },
});

export const getPaymentProofs = query({
  args: { quoteId: v.id("quotations") },
  handler: async (ctx, args) => {
    const proofs = await ctx.db
      .query("paymentProofs")
      .withIndex("by_quote", (q) => q.eq("quoteId", args.quoteId))
      .collect();

    // Get signed URLs for each proof
    return await Promise.all(
      proofs.map(async (p) => ({
        ...p,
        url: await ctx.storage.getUrl(p.fileId),
      }))
    );
  },
});

export const updateProofStatus = mutation({
  args: { 
    proofId: v.id("paymentProofs"),
    status: v.string(),
  },
  handler: async (ctx, args) => {
    await ctx.db.patch(args.proofId, { status: args.status });
  },
});
