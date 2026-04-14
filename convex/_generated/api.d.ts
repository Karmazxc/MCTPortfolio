/* eslint-disable */
/**
 * Generated `api` utility.
 *
 * THIS CODE IS AUTOMATICALLY GENERATED.
 *
 * To regenerate, run `npx convex dev`.
 * @module
 */

import type * as emails_sendEmail from "../emails/sendEmail.js";
import type * as files_files from "../files/files.js";
import type * as http_http from "../http/http.js";
import type * as logs_logs from "../logs/logs.js";
import type * as payments_payments from "../payments/payments.js";
import type * as projects_projects from "../projects/projects.js";
import type * as proofs_proofs from "../proofs/proofs.js";
import type * as quotations_quotations from "../quotations/quotations.js";

import type {
  ApiFromModules,
  FilterApi,
  FunctionReference,
} from "convex/server";

declare const fullApi: ApiFromModules<{
  "emails/sendEmail": typeof emails_sendEmail;
  "files/files": typeof files_files;
  "http/http": typeof http_http;
  "logs/logs": typeof logs_logs;
  "payments/payments": typeof payments_payments;
  "projects/projects": typeof projects_projects;
  "proofs/proofs": typeof proofs_proofs;
  "quotations/quotations": typeof quotations_quotations;
}>;

/**
 * A utility for referencing Convex functions in your app's public API.
 *
 * Usage:
 * ```js
 * const myFunctionReference = api.myModule.myFunction;
 * ```
 */
export declare const api: FilterApi<
  typeof fullApi,
  FunctionReference<any, "public">
>;

/**
 * A utility for referencing Convex functions in your app's internal API.
 *
 * Usage:
 * ```js
 * const myFunctionReference = internal.myModule.myFunction;
 * ```
 */
export declare const internal: FilterApi<
  typeof fullApi,
  FunctionReference<any, "internal">
>;

export declare const components: {};
