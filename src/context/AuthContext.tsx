// // 'use client';

// // import React, { createContext, useContext, useEffect, useState, ReactNode } from 'react';
// // import { getCurrentUser, signOut } from 'aws-amplify/auth';
// // import { Hub } from 'aws-amplify/utils';
// // import { customerService } from '@/services/customerService';

// // interface AuthContextType {
// //   isAuthenticated: boolean;
// //   isLoading: boolean;
// //   logout: () => Promise<void>;
// //   user: any; 
// // }

// // const AuthContext = createContext<AuthContextType | undefined>(undefined);

// // export const AuthProvider = ({ children }: { children: ReactNode }) => {
// //   const [isAuthenticated, setIsAuthenticated] = useState(false);
// //   const [user, setUser] = useState<any>(null);
// //   const [isLoading, setIsLoading] = useState(true);

// //   // --- Main Auth Logic ---
// //   const checkSession = async (shouldSyncDB = false) => {
// //     try {
// //       const currentUser = await getCurrentUser();
// //       setIsAuthenticated(true);
// //       setUser(currentUser);

// //       // Only sync to DB if explicitly requested (e.g. after a fresh login event)
// //       if (shouldSyncDB) {
// //         console.log("🔄 Triggering DB Sync...");
// //         await customerService.syncUser();
// //       }
// //     } catch (error) {
// //       console.log("⚪ No active session.");
// //       setIsAuthenticated(false);
// //       setUser(null);
// //     } finally {
// //       setIsLoading(false);
// //     }
// //   };

// //   useEffect(() => {
// //     // 1. Check if user is already logged in on mount
// //     checkSession(false);

// //     // 2. Listen for the 'signedIn' event from Amplify (Redirect success)
// //     const hubListener = Hub.listen('auth', ({ payload }) => {
// //       if (payload.event === 'signedIn') {
// //         console.log('🔔 Auth Event: User Signed In');
// //         // This is the critical moment to sync with your DB
// //         checkSession(true); 
// //       }
// //       if (payload.event === 'signedOut') {
// //         console.log('🔔 Auth Event: User Signed Out');
// //         setIsAuthenticated(false);
// //         setUser(null);
// //       }
// //     });

// //     return () => hubListener();
// //   }, []);

// //   const logout = async () => {
// //     try {
// //       await signOut();
// //       setIsAuthenticated(false);
// //       setUser(null);
// //     } catch (error) {
// //       console.error("Error signing out:", error);
// //     }
// //   };

// //   return (
// //     <AuthContext.Provider value={{ isAuthenticated, user, isLoading, logout }}>
// //       {children}
// //     </AuthContext.Provider>
// //   );
// // };

// // export const useAuth = () => {
// //   const context = useContext(AuthContext);
// //   if (!context) throw new Error('useAuth must be used within an AuthProvider');
// //   return context;
// // };
// 'use client';

// import React, { createContext, useContext, useEffect, useState, ReactNode } from 'react';
// import { getCurrentUser, signOut } from 'aws-amplify/auth';
// import { Hub } from 'aws-amplify/utils';
// import { customerService } from '@/services/customerService';
// import { useRouter } from 'next/navigation'; // [!code ++]

// interface AuthContextType {
//   isAuthenticated: boolean;
//   isLoading: boolean;
//   logout: () => Promise<void>;
//   user: any; 
// }

// const AuthContext = createContext<AuthContextType | undefined>(undefined);

// export const AuthProvider = ({ children }: { children: ReactNode }) => {
//   const [isAuthenticated, setIsAuthenticated] = useState(false);
//   const [user, setUser] = useState<any>(null);
//   const [isLoading, setIsLoading] = useState(true);
//   const router = useRouter(); // [!code ++]

//   // --- Main Auth Logic ---
//   const checkSession = async (shouldSyncDB = false) => {
//     try {
//       const currentUser = await getCurrentUser();
//       setIsAuthenticated(true);
//       setUser(currentUser);

//       // Only sync to DB if explicitly requested (e.g. after a fresh login event)
//       if (shouldSyncDB) {
//         console.log("🔄 Triggering DB Sync...");
//         await customerService.syncUser();
        
//         // [!code ++] Check for redirect intent after successful login
//         const redirectPath = localStorage.getItem('redirectAfterLogin');
//         if (redirectPath) {
//           localStorage.removeItem('redirectAfterLogin'); // Clear it so it doesn't run again
//           router.push(redirectPath);
//         }
//       }
//     } catch (error) {
//       console.log("⚪ No active session.");
//       setIsAuthenticated(false);
//       setUser(null);
//     } finally {
//       setIsLoading(false);
//     }
//   };

//   useEffect(() => {
//     // 1. Check if user is already logged in on mount
//     checkSession(false);

//     // 2. Listen for the 'signedIn' event from Amplify (Redirect success)
//     const hubListener = Hub.listen('auth', ({ payload }) => {
//       if (payload.event === 'signedIn') {
//         console.log('🔔 Auth Event: User Signed In');
//         // This is the critical moment to sync with your DB
//         checkSession(true); 
//       }
//       if (payload.event === 'signedOut') {
//         console.log('🔔 Auth Event: User Signed Out');
//         setIsAuthenticated(false);
//         setUser(null);
//       }
//     });

//     return () => hubListener();
//   }, []);

//   const logout = async () => {
//     try {
//       await signOut();
//       setIsAuthenticated(false);
//       setUser(null);
//     } catch (error) {
//       console.error("Error signing out:", error);
//     }
//   };

//   return (
//     <AuthContext.Provider value={{ isAuthenticated, user, isLoading, logout }}>
//       {children}
//     </AuthContext.Provider>
//   );
// };

// export const useAuth = () => {
//   const context = useContext(AuthContext);
//   if (!context) throw new Error('useAuth must be used within an AuthProvider');
//   return context;
// };
'use client';

import React, { createContext, useContext, useEffect, useState, ReactNode } from 'react';
import { getCurrentUser, signOut } from 'aws-amplify/auth';
import { Hub } from 'aws-amplify/utils';
import { customerService } from '@/services/customerService';
import { useRouter } from 'next/navigation';
import Spinner from '@/components/shared/Spinner';

interface AuthContextType {
  isAuthenticated: boolean;
  isLoading: boolean;
  logout: () => Promise<void>;
  user: any; 
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [user, setUser] = useState<any>(null);
  const [isLoading, setIsLoading] = useState(true);
  const router = useRouter();

  const checkSession = async (trigger: string, shouldSyncDB = false) => {
    console.log(`[AuthContext] 🔍 checkSession triggered by: ${trigger}`);
    try {
      // Race condition protection: Timeout after 4s
      const currentUser = await Promise.race([
        getCurrentUser(),
        new Promise((_, reject) => setTimeout(() => reject(new Error("Timeout")), 4000))
      ]) as any;

      console.log("[AuthContext] ✅ User found:", currentUser.userId);
      setIsAuthenticated(true);
      setUser(currentUser);

      if (shouldSyncDB) {
        console.log("[AuthContext] 🔄 Syncing DB...");
        customerService.syncUser().catch(err => console.error("DB Sync failed", err));
      }
    } catch (error) {
      console.log("[AuthContext] ⚪ No active session.");
      setIsAuthenticated(false);
      setUser(null);
    } finally {
      // ALWAYS stop loading. If on callback page, that page will handle the "Waiting" UI.
      setIsLoading(false);
    }
  };

  useEffect(() => {
    const hubListener = Hub.listen('auth', ({ payload }) => {
      console.log(`[AuthContext] 📢 Hub Event: ${payload.event}`);
      switch (payload.event) {
        case 'signedIn':
        case 'signInWithRedirect':
          checkSession('Hub: signedIn', true); 
          break;
        case 'signedOut':
          setIsAuthenticated(false);
          setUser(null);
          setIsLoading(false);
          break;
        case 'signIn_failure':
        case 'tokenRefresh_failure':
        case 'signInWithRedirect_failure':
          console.error("[AuthContext] ❌ Auth Failure:", payload.data);
          // If failure happens, ensure we aren't stuck loading
          setIsLoading(false);
          break;
      }
    });

    checkSession('Mount');

    return () => hubListener();
  }, []);

  const logout = async () => {
    try {
      await signOut();
      setIsAuthenticated(false);
      setUser(null);
      router.push('/'); 
    } catch (error) {
      console.error("Logout error", error);
    }
  };

  if (isLoading) {
    return (
      <div className="h-screen w-full flex flex-col items-center justify-center bg-white">
        <Spinner className="w-10 h-10 text-[#003C22]" />
      </div>
    );
  }

  return (
    <AuthContext.Provider value={{ isAuthenticated, user, isLoading, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) throw new Error('useAuth must be used within an AuthProvider');
  return context;
};