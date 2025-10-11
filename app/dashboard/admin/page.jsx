// app/dashboard/admin/page.js
"use client";
import { useKindeAuth } from "@kinde-oss/kinde-auth-nextjs";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { Users, Package, BarChart3, DollarSign, Settings, Shield, Loader2 } from "lucide-react";

export default function AdminPage() {
  const { getRoles, getUser, isAuthenticated, isLoading } = useKindeAuth();
  const router = useRouter();
  const [isAdmin, setIsAdmin] = useState(false);
  const [checking, setChecking] = useState(true);

  useEffect(() => {
    if (!isLoading) {
      const checkAdminAccess = async () => {
        if (!isAuthenticated) {
          router.push('/api/auth/login');
          return;
        }

        const roles = getRoles();
        const user = getUser();
        
        console.log('Client-side roles check:', {
          user: user?.email,
          roles: roles,
          rolesArray: roles?.roles
        });

        const hasAdminRole = roles?.roles?.includes('admin');
        
        if (!hasAdminRole) {
          console.log('Client: Not admin, redirecting');
          router.push('/dashboard/unauthorized');
        } else {
          console.log('Client: Admin access granted');
          setIsAdmin(true);
        }
        setChecking(false);
      };

      checkAdminAccess();
    }
  }, [isLoading, isAuthenticated, getRoles, getUser, router]);

  if (isLoading || checking) {
    return (
      <div className="min-h-screen bg-white flex items-center justify-center">
        <div className="text-center">
          <Loader2 className="w-8 h-8 animate-spin text-black mx-auto mb-4" />
          <p className="text-gray-600">Checking permissions...</p>
        </div>
      </div>
    );
  }

  if (!isAdmin) {
    return (
      <div className="min-h-screen bg-white flex items-center justify-center">
        <p className="text-gray-600">Redirecting...</p>
      </div>
    );
  }

  // Your admin dashboard content here
  const [activeView, setActiveView] = useState("overview");

  const adminCards = [
    {
      title: "User Management",
      description: "Manage users and permissions",
      icon: Users,
      count: "1,234"
    },
    {
      title: "Product Catalog", 
      description: "Manage products and inventory",
      icon: Package,
      count: "567"
    },
    {
      title: "Orders",
      description: "View and manage orders",
      icon: BarChart3,
      count: "892"
    },
    {
      title: "Revenue",
      description: "Sales analytics and reports", 
      icon: DollarSign,
      count: "$12,456"
    },
    {
      title: "Settings",
      description: "System configuration",
      icon: Settings,
      count: ""
    }
  ];

  return (
    <div className="min-h-screen bg-white p-6">
      {/* Header */}
      <div className="mb-8">
        <div className="flex items-center gap-3 mb-2">
          <Shield className="w-8 h-8 text-black" />
          <h1 className="text-3xl font-bold text-black">Admin Dashboard</h1>
        </div>
        <p className="text-gray-600">Full administrative control panel</p>
      </div>

      {/* Rest of your admin dashboard */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {adminCards.map((card, index) => (
          <div key={index} className="bg-white border border-gray-300 rounded-xl p-6">
            <div className="flex items-start justify-between mb-4">
              <div>
                <h3 className="text-lg font-semibold text-black">{card.title}</h3>
                <p className="text-gray-600 text-sm mt-1">{card.description}</p>
              </div>
              <card.icon className="w-8 h-8 text-gray-400" />
            </div>
            {card.count && (
              <p className="text-2xl font-bold text-black">{card.count}</p>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}