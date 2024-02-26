import type { NextAuthConfig } from 'next-auth';
 
export const authConfig = {
  pages: {
    signIn: '/login',
  },
  callbacks: {
    authorized({ auth, request: { nextUrl } }) {
      const isLoggedIn = !!auth?.user;
      const isOnDashboard = nextUrl.pathname.startsWith('/dashboard');
      const isOnTesting = nextUrl.pathname.startsWith('/Testing');
      console.log(isOnTesting);
      
      if (isOnDashboard) {
        if (isLoggedIn) return true;
        return false; // Redirect unauthenticated users to login page
      } else if (isOnTesting) {
        if (isLoggedIn) return true;
        return Response.redirect(new URL('/login', nextUrl)); // Redirect unauthenticated users to login page for /Testing route
      } else if (isLoggedIn) {
        return Response.redirect(new URL('/dashboard', nextUrl)); // Redirect authenticated users to dashboard for other routes
      }
      return true;
    },
  },
  providers: [], // Add providers with an empty array for now
} satisfies NextAuthConfig;