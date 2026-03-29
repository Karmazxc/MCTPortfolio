// @ts-nocheck
import { httpRouter } from "convex/server";
import { httpAction } from "./_generated/server";
import { api } from "./_generated/api";

const http = httpRouter();

http.route({
  path: "/log",
  method: "POST",
  handler: httpAction(async (ctx, request) => {
    const { action, details, userIdentifier, secret } = await request.json();
    
    // Quick internal 'secret' check (this should be replaced with a real key if possible)
    if (secret !== process.env.ADMIN_SECRET_KEY) {
      return new Response("Unauthorized", { status: 401 });
    }

    await ctx.runMutation(api.logs.addLog, { action, details, userIdentifier });
    return new Response(null, { status: 200 });
  }),
});

export default http;
