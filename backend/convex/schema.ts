import { defineSchema, defineTable } from "convex/server";
import { v } from "convex/values";

export default defineSchema({
  quotations: defineTable({
    clientName: v.string(),
    email: v.string(),
    projectType: v.string(),
    features: v.array(v.string()),
    budgetRange: v.string(),
    deadline: v.string(),
    estimatedPrice: v.number(),
    estimatedDays: v.number(),
    status: v.string(), // e.g., "pending", "contacted"
  }).index("by_email", ["email"]),
  
  projects: defineTable({
    title: v.string(),
    description: v.string(),
    category: v.string(),
    tech: v.array(v.string()),
    image: v.string(),
    demoLink: v.string(),
    createdAt: v.number(),
  }),

  paymentProofs: defineTable({
    quoteId: v.id("quotations"),
    fileId: v.string(), // Convex Storage ID
    uploadedAt: v.number(),
    status: v.string(), // "pending", "verified", "rejected"
    amount: v.optional(v.number()),
    notes: v.optional(v.string()),
  }).index("by_quote", ["quoteId"]),
  portfolioProofs: defineTable({
    title: v.string(),
    fileId: v.string(),
    category: v.string(),
    uploadedAt: v.number(),
  }).index("by_category", ["category"]),

  adminLogs: defineTable({
    action: v.string(),
    details: v.string(),
    userIdentifier: v.string(),
    timestamp: v.number(),
  }).index("by_timestamp", ["timestamp"]),
});
