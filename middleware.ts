import { clerkMiddleware, createRouteMatcher } from "@clerk/nextjs/server";

// Define route matchers
const isProfileRoute = createRouteMatcher(["/profile(.*)"]);
const isPublicRoute = createRouteMatcher([
  "/",
  "/features(.*)",
  "/sign-in(.*)",
  "/sign-up(.*)",
  "/api/webhooks(.*)",
]);

export default clerkMiddleware(async (auth, req) => {
  const { userId } = await auth();

  // Allow public routes
  if (isPublicRoute(req)) {
    return;
  }

  // Protect profile and app routes
  if (isProfileRoute(req)) {
    await auth.protect();
    // Sync user with database
    await fetch(new URL("/api/auth/sync", req.url), { method: "POST" });
  }

  // Redirect authenticated users from root to profile
  if (req.nextUrl.pathname === "/" && userId) {
    const profile = new URL("/profile", req.url);
    return Response.redirect(profile);
  }
});

export const config = {
  matcher: ["/((?!.+\\.[\\w]+$|_next).*)", "/", "/(api|trpc)(.*)"],
};
