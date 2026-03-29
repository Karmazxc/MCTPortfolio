// @ts-nocheck
import { mutation, query } from "./_generated/server";
import { v } from "convex/values";

export const addProject = mutation({
  args: {
    title: v.string(),
    description: v.string(),
    category: v.string(),
    tech: v.array(v.string()),
    image: v.string(),
    demoLink: v.string(),
  },
  handler: async (ctx, args) => {
    return await ctx.db.insert("projects", {
      ...args,
      createdAt: Date.now(),
    });
  },
});

export const deleteProject = mutation({
  args: { id: v.id("projects") },
  handler: async (ctx, args) => {
    await ctx.db.delete(args.id);
  },
});

export const getProjects = query({
  handler: async (ctx) => {
    return await ctx.db.query("projects").order("desc").collect();
  },
});
