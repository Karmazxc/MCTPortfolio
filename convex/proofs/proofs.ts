// @ts-nocheck
import { mutation, query } from "../_generated/server";
import { v } from "convex/values";

export const saveProof = mutation({
  args: {
    title: v.string(),
    fileId: v.string(),
    category: v.string(),
  },
  handler: async (ctx, args) => {
    return await ctx.db.insert("portfolioProofs", {
      ...args,
      uploadedAt: Date.now(),
    });
  },
});

export const getProofs = query({
  args: { category: v.optional(v.string()) },
  handler: async (ctx, args) => {
    let q = ctx.db.query("portfolioProofs");
    if (args.category) {
      q = q.withIndex("by_category", (q) => q.eq("category", args.category!));
    }
    const proofs = await q.order("desc").collect();

    return await Promise.all(
      proofs.map(async (p) => ({
        ...p,
        url: await ctx.storage.getUrl(p.fileId),
      }))
    );
  },
});

export const generateUploadUrl = mutation({
  handler: async (ctx) => {
    return await ctx.storage.generateUploadUrl();
  },
});

export const deleteProof = mutation({
  args: { id: v.id("portfolioProofs") },
  handler: async (ctx, args) => {
    // Delete the metadata
    await ctx.db.delete(args.id);
  },
});

export const deleteAllTransactionProofs = mutation({
  handler: async (ctx) => {
    const proofs = await ctx.db
      .query("portfolioProofs")
      .withIndex("by_category", (q) => q.eq("category", "transactions"))
      .collect();

    // Delete storage files first, then metadata
    for (const proof of proofs) {
      try {
        await ctx.storage.delete(proof.fileId);
      } catch {
        // File may already be deleted
      }
      await ctx.db.delete(proof._id);
    }

    return { deleted: proofs.length };
  },
});
