// middleware.js
import { withAuth } from "@kinde-oss/kinde-auth-nextjs/middleware";
import { getKindeServerSession } from "@kinde-oss/kinde-auth-nextjs/server";
import { NextResponse } from "next/server";

export default withAuth(
  async function middleware(request) {
    const { getUser, getRoles } = getKindeServerSession();
    const user = await getUser();
    const roles = await getRoles();
    
    console.log('=== MIDDLEWARE DEBUG ===');
    console.log('User:', user?.email);
    console.log('Full roles object:', JSON.stringify(roles, null, 2));
    console.log('Roles array:', roles?.roles);
    console.log('Path:', request.nextUrl.pathname);
    
    // Check if accessing admin routes
    if (request.nextUrl.pathname.startsWith('/dashboard/admin')) {
      // Better role checking - handle different cases
      const roleArray = roles?.roles || [];
      const isAdmin = roleArray.some(role => 
        role.toLowerCase() === 'admin'
      );
      
      console.log('Is admin?', isAdmin);
      console.log('Role check details:', {
        roleArray,
        lowercaseRoles: roleArray.map(r => r.toLowerCase()),
        foundAdmin: roleArray.find(r => r.toLowerCase() === 'admin')
      });
      
      if (!isAdmin) {
        console.log(`❌ Non-admin user ${user?.email} attempted to access admin area`);
        return NextResponse.redirect(new URL('/dashboard/unauthorized', request.url));
      }
      
      console.log(`✅ Admin user ${user?.email} accessing admin area`);
    }
    
    return NextResponse.next();
  },
  {
    isReturnToCurrentPage: false
  }
);

export const config = {
  matcher: [
    "/dashboard/:path*",
    "/dashboard/cart", 
    "/dashboard/checkout/:path*",
    "/api/cart/:path*",
    "/api/payment/:path*",
    "/api/orders/:path*",
  ]
};