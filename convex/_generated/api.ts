/**
 * !! CAUTION !!: This is a TEMPORARY DUMMY FILE created by Antigravity to unblock the Next.js build.
 * It provides a basic structure for Convex API calls so your dashboard doesn't crash.
 * 
 * TO FIX PROPERLY: Run `npx convex dev` in your terminal to overwrite this with real types.
 */

export const api: any = {
  quotations: {
    getQuotations: "quotations:getQuotations",
    saveQuotation: "quotations:saveQuotation",
    updateStatus: "quotations:updateStatus",
    deleteQuotation: "quotations:deleteQuotation",
  },
  projects: {
    addProject: "projects:addProject",
    getProjects: "projects:getProjects",
    deleteProject: "projects:deleteProject",
  },
  payments: {
    savePaymentProof: "payments:savePaymentProof",
    getPaymentProofs: "payments:getPaymentProofs",
    updateProofStatus: "payments:updateProofStatus",
  },
  files: {
    generateUploadUrl: "files:generateUploadUrl",
  },
  proofs: {
    generateUploadUrl: "proofs:generateUploadUrl",
    saveProof: "proofs:saveProof",
    getProofs: "proofs:getProofs",
    deleteProof: "proofs:deleteProof",
  }
};
