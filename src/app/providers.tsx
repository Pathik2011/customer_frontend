// "use client";

// import { Amplify } from "aws-amplify";
// import { useEffect, useState } from "react";
// import { CartProvider } from "@/context/CartContext";
// import { AuthProvider } from "@/context/AuthContext";
// import { QueryClient, QueryClientProvider } from "@tanstack/react-query"; // [!code ++]
// import { QUERY_CONFIG } from "@/config/queryConfig"; // [!code ++]

// // [!code ++] Create a client
// const queryClient = new QueryClient({
//   defaultOptions: {
//     queries: {
      
//       staleTime: QUERY_CONFIG.PRODUCTS.STALE_TIME, 
//       gcTime: QUERY_CONFIG.PRODUCTS.GC_TIME,
//       refetchOnWindowFocus: false,
//     },
//   },
// });

// // Define the base URL dynamically (Default to localhost)
// // const APP_URL = process.env.NEXT_PUBLIC_APP_URL || "http://localhost:3000";
// const getAppUrl = () => {
//   if (typeof window !== "undefined") {
//     // This dynamically grabs the current domain (e.g., localhost or main.d123...amplifyapp.com)
//     return window.location.origin;
//   }
//   // Fallback for server-side rendering
//   return process.env.NEXT_PUBLIC_APP_URL || "http://localhost:3000";
// };

// const APP_URL = getAppUrl();

// Amplify.configure({
//   Auth: {
//     Cognito: {
//       userPoolId: process.env.NEXT_PUBLIC_COGNITO_USER_POOL_ID!,
//       userPoolClientId: process.env.NEXT_PUBLIC_COGNITO_CLIENT_ID!,
//       loginWith: {
//         oauth: {
//           domain: process.env.NEXT_PUBLIC_COGNITO_DOMAIN!,
//           scopes: ["openid", "email", "profile"],
          
//           // [!code highlight] FIX: Append '/auth-callback' to the redirect URL
//           redirectSignIn: [`${APP_URL}/auth-callback`], 
          
//           redirectSignOut: [APP_URL],
//           responseType: "code",
//         },
//       },
//     },
//   },
// });

// export function Providers({ children }: { children: React.ReactNode }) {
//   const [mounted, setMounted] = useState(false);

//   useEffect(() => {
//     setMounted(true);
//   }, []);

//   return (
//     <QueryClientProvider client={queryClient}>
//     <AuthProvider>
//       <CartProvider>
//         {mounted ? children : <>{children}</>}
//       </CartProvider>
//     </AuthProvider>
//    </QueryClientProvider>
//    );
// }
"use client";

import { Amplify } from "aws-amplify";
import { useEffect, useState } from "react";
import { CartProvider } from "@/context/CartContext";
import { AuthProvider } from "@/context/AuthContext";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { QUERY_CONFIG } from "@/config/queryConfig";
// [!code highlight] 1. IMPORT THIS
import LoginEventHandler from "@/components/auth/LoginEventHandler"; 

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: QUERY_CONFIG.PRODUCTS.STALE_TIME, 
      gcTime: QUERY_CONFIG.PRODUCTS.GC_TIME,
      refetchOnWindowFocus: false,
    },
  },
});

const getAppUrl = () => {
  if (typeof window !== "undefined") {
    return window.location.origin;
  }
  return process.env.NEXT_PUBLIC_APP_URL || "http://localhost:3000";
};

const APP_URL = getAppUrl();

Amplify.configure({
  Auth: {
    Cognito: {
      userPoolId: process.env.NEXT_PUBLIC_COGNITO_USER_POOL_ID!,
      userPoolClientId: process.env.NEXT_PUBLIC_COGNITO_CLIENT_ID!,
      loginWith: {
        oauth: {
          domain: process.env.NEXT_PUBLIC_COGNITO_DOMAIN!,
          scopes: ["openid", "email", "profile"],
          redirectSignIn: [`${APP_URL}/auth-callback`], 
          redirectSignOut: [APP_URL],
          responseType: "code",
        },
      },
    },
  },
});

export function Providers({ children }: { children: React.ReactNode }) {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    console.log("🏗️ [DEBUG] Providers: Mounted.");
  }, []);

  return (
    <QueryClientProvider client={queryClient}>
      <AuthProvider>
        {/* [!code highlight] 2. ADD THIS LINE. Without it, no APIs will call. */}
        <LoginEventHandler />
        
        <CartProvider>
          {mounted ? children : <>{children}</>}
        </CartProvider>
      </AuthProvider>
   </QueryClientProvider>
   );
}