import { clerkMiddleware, createRouteMatcher } from "@clerk/nextjs/server";
import { NextResponse } from "next/server";

// Define routes that should be protected
const isProtectedRoute = createRouteMatcher([
  '/', // Add any additional routes here
  '/dashboard', // Example of another protected route
  '/profile',   // Another example
]);

// Update clerkMiddleware to manually protect routes
export default clerkMiddleware(async (auth, req) => {
  // Await the auth call to get the user information
  const { userId } = await auth();

  // Check if the requested route is protected
  if (isProtectedRoute(req)) {
    if (!userId) {
      // If user is not authenticated, redirect to the sign-in page
      const signInUrl = req.nextUrl.clone();
      signInUrl.pathname = '/sign-in'; // Change this to your actual sign-in route
      return NextResponse.redirect(signInUrl);
    }
  }

  // Allow the request to proceed for authenticated users or public routes
  return NextResponse.next();
});

// Define matcher for all routes except those ending with certain extensions and internal routes
export const config = {
  matcher: [
    // Match all routes except for Next.js internals and static files
    '/((?!_next|static|favicon.ico|[^?]*\\.(?:html?|css|js(?!on)|jpe?g|webp|png|gif|svg|ttf|woff2?|ico|csv|docx?|xlsx?|zip|webmanifest)).*)',
    // Always run for API routes
    '/(api|trpc)(.*)',
  ],
};
