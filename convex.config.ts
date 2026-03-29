import { defineApp } from "@convex-dev/app";

export default defineApp({
  api: new URL("./convex").toString(),
});
