"use client";
import { KindeProvider } from "@kinde-oss/kinde-auth-nextjs";

export default function KindeClientProvider({ children }) {
  return <KindeProvider>{children}</KindeProvider>;
}