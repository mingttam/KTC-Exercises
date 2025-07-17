import { withAuth } from "next-auth/middleware";

export default withAuth({
  callbacks: {
    authorized: ({ token }) => !!token,
  },
  pages: {
    signIn: "/Day13/afternoon",
  },
});

export const config = {
  matcher: ['/Day13/afternoon/pages/DashBoard/:path*'],
}