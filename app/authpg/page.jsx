import React from 'react'
import { RegisterLink, LoginLink } from "@kinde-oss/kinde-auth-nextjs/components";
const Authpage = () => {
  return (
    <div>
       <div className="bg-white shadow-lg rounded-2xl p-10 w-full max-w-md text-center">
        
        <h1 className="text-3xl font-bold mb-2">Welcome to My Kinde App</h1>
        <p className="text-gray-600 mb-8">Sign in or create an account to continue</p>

        <div className="flex flex-col gap-4">
          <LoginLink className="bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 px-4 rounded-lg shadow-md transition-all duration-200">
            Sign In
          </LoginLink>

          <RegisterLink className="bg-gray-100 hover:bg-gray-200 text-gray-800 font-semibold py-2 px-4 rounded-lg border border-gray-300 transition-all duration-200">
            Sign Up
          </RegisterLink>
        </div>
      </div>
    </div>
  )
}

export default Authpage