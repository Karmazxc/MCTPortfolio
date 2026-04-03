// @ts-nocheck
// @ts-nocheck
import { action } from "./_generated/server";
import { v } from "convex/values";

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
  },
});
