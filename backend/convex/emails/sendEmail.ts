// @ts-nocheck
import { action, mutation } from "../_generated/server";
import { v } from "convex/values";

// Send email notification when a new quotation is submitted
export const sendQuotationNotification = action({
  args: {
    clientName: v.string(),
    email: v.string(),
    projectType: v.string(),
    budget: v.string(),
    deadline: v.string(),
    details: v.string(),
  },
  handler: async (ctx, args) => {
    const RESEND_API_KEY = process.env.RESEND_API_KEY;
    
    if (!RESEND_API_KEY) {
      console.error("RESEND_API_KEY not set — skipping email notification");
      return { success: false, reason: "no_api_key" };
    }

    try {
      const response = await fetch("https://api.resend.com/emails", {
        method: "POST",
        headers: {
          "Authorization": `Bearer ${RESEND_API_KEY}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          from: "New Quotation <onboarding@resend.dev>",
          to: ["trajano.mark0826@gmail.com"],
          subject: `🔥 New Quotation: ${args.clientName} - ${args.projectType}`,
          html: `
            <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
              <h2 style="color: #06b6d4; border-bottom: 2px solid #06b6d4; padding-bottom: 10px;">New Quotation Request</h2>
              
              <div style="background: #f8fafc; padding: 20px; border-radius: 8px; margin: 20px 0;">
                <p><strong>👤 Client Name:</strong> ${args.clientName}</p>
                <p><strong>📧 Email:</strong> ${args.email}</p>
                <p><strong>💼 Project Type:</strong> ${args.projectType}</p>
                <p><strong>💰 Budget:</strong> ${args.budget}</p>
                <p><strong>📅 Deadline:</strong> ${args.deadline}</p>
              </div>
              
              <div style="background: #ffffff; padding: 20px; border-radius: 8px; border: 1px solid #e2e8f0;">
                <h3 style="color: #1e293b; margin-top: 0;">Project Details:</h3>
                <p style="line-height: 1.6; color: #334155;">${args.details}</p>
              </div>
              
              <div style="margin-top: 20px; padding: 15px; background: #fef3c7; border-left: 4px solid #fbbf24; border-radius: 4px;">
                <p style="margin: 0; color: #92400e;"><strong>⚡ Action Required:</strong> Review this quotation request and respond within 1-2 hours.</p>
              </div>
              
              <hr style="margin: 30px 0; border: none; border-top: 1px solid #e2e8f0;" />
              <p style="color: #94a3b8; font-size: 12px;">This is an automated notification from your portfolio website.</p>
            </div>
          `,
        }),
      });

      if (!response.ok) {
        const error = await response.json();
        console.error("Resend API error:", error);
        return { success: false, reason: error.message };
      }

      return { success: true };
    } catch (error) {
      console.error("Failed to send email:", error);
      return { success: false, reason: error.message };
    }
  },
});

// Send contact form notification (kept for compatibility)
export const sendContactNotification = action({
  args: {
    name: v.string(),
    email: v.string(),
    projectType: v.string(),
    message: v.string(),
  },
  handler: async (ctx, args) => {
    const RESEND_API_KEY = process.env.RESEND_API_KEY;
    if (!RESEND_API_KEY) {
      console.warn("RESEND_API_KEY not set — skipping email notification");
      return { success: false, reason: "no_api_key" };
    }

    try {
      const response = await fetch("https://api.resend.com/emails", {
        method: "POST",
        headers: {
          "Authorization": `Bearer ${RESEND_API_KEY}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          from: "Portfolio Contact <onboarding@resend.dev>",
          to: ["trajano.mark0826@gmail.com"],
          subject: `New Contact: ${args.name} - ${args.projectType}`,
          html: `
            <h2>New Contact Form Submission</h2>
            <p><strong>Name:</strong> ${args.name}</p>
            <p><strong>Email:</strong> ${args.email}</p>
            <p><strong>Project Type:</strong> ${args.projectType}</p>
            <p><strong>Message:</strong></p>
            <p>${args.message}</p>
          `,
        }),
      });

      return { success: response.ok };
    } catch (error) {
      console.error("Failed to send contact email:", error);
      return { success: false, reason: error.message };
    }
  },
});
