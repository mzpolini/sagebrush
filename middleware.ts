import { clerkMiddleware, createRouteMatcher } from "@clerk/nextjs/server";
import { syncUserWithDatabase } from "@/app/actions/auth";

const isDashboardRoute = createRouteMatcher(["/profile(.*)"]);
const isPublicRoute = createRouteMatcher(["/", "/sign-in(.*)", "/sign-up(.*)"]);

export default clerkMiddleware(
  async (auth, req) => {
    const { userId, redirectToSignIn } = await auth();

    if (isPublicRoute(req)) return;

    // Protect dashboard and other private routes
    if (isDashboardRoute(req)) {
      await auth.protect();
      await fetch(new URL("/api/auth/sync", req.url), { method: "POST" });
    }

    // Optional: Redirect root to dashboard for authenticated users
    if (req.nextUrl.pathname === "/" && userId) {
      const dashboard = new URL(`/profile/${userId}/dashboard/`, req.url);
      return Response.redirect(dashboard);
    }
  }
  // { debug: true }
);

export const config = {
  matcher: ["/((?!.+\\.[\\w]+$|_next).*)", "/", "/(api|trpc)(.*)"],
};
