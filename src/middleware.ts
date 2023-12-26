import { withAuth } from "next-auth/middleware"

export default withAuth

// Applies next-auth only to matching routes - can be regex
// Ref: https://nextjs.org/docs/app/building-your-application/routing/middleware#matcher
export const config = { matcher: ["/admin", "/admin/registration/:id*"] }