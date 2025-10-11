// app/dashboard/unauthorized/page.js
// No "use client" needed - Server Component
import Link from "next/link";
import { Shield, Home, ArrowLeft } from "lucide-react";

export default function UnauthorizedPage() {
  return (
    <div className="min-h-screen bg-white flex items-center justify-center px-4">
      <div className="text-center max-w-md">
        <div className="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-4">
          <Shield className="w-8 h-8 text-red-600" />
        </div>
        <h1 className="text-2xl font-bold text-gray-900 mb-3">Access Denied</h1>
        <p className="text-gray-600 mb-6">
          You don't have permission to access the admin area.
        </p>
        <div className="flex flex-col sm:flex-row gap-3 justify-center">
          <Link
            href="/"
            className="flex items-center justify-center gap-2 bg-black hover:bg-gray-800 text-white font-semibold py-3 px-6 rounded-lg transition-all duration-200"
          >
            <Home size={16} />
            Go Home
          </Link>

        </div>
      </div>
    </div>
  );
}