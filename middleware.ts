import { clerkMiddleware, createRouteMatcher } from "@clerk/nextjs/server";

// Define route matchers
const isProfileRoute = createRouteMatcher(["/profile(.*)"]);
const isDashboardRoute = createRouteMatcher(["/dashboard(.*)"]);
const isPublicRoute = createRouteMatcher([
  "/",
  "/features(.*)",
  "/sign-in(.*)",
  "/sign-up(.*)",
  "/api/webhooks(.*)",
]);

export default clerkMiddleware(async (auth, req) => {
  // Allow public routes without any auth checks
  if (isPublicRoute(req)) {
    return;
  }

  // Protect profile and dashboard routes
  if (isProfileRoute(req) || isDashboardRoute(req)) {
    await auth.protect();
    // Sync user with database
    await fetch(new URL("/api/auth/sync", req.url), { method: "POST" });
  }

  // Redirect authenticated users from root to profile
  if (req.nextUrl.pathname === "/") {
    const { userId } = await auth();
    if (userId) {
      const profile = new URL("/profile", req.url);
      return Response.redirect(profile);
    }
  }
});

export const config = {
  matcher: [
    // Skip Next.js internals and all static files
    '/((?!_next|[^?]*\\.(?:html?|css|js(?!on)|jpe?g|webp|png|gif|svg|ttf|woff2?|ico|csv|docx?|xlsx?|zip|webmanifest)).*)',
    // Always run for API routes
    '/(api|trpc)(.*)',
  ],
};
