// // 'use client';

// // import { useEffect, useRef } from 'react';
// // import { useRouter } from 'next/navigation';
// // import { useAuth } from '@/context/AuthContext';
// // import Spinner from '@/components/shared/Spinner';
// // import { Hub } from 'aws-amplify/utils';

// // export default function AuthCallbackPage() {
// //   const router = useRouter();
// //   const { isAuthenticated, isLoading } = useAuth();
// //   const processedRef = useRef(false);

// //   useEffect(() => {
// //     console.log(`[CallbackPage] Status Update -> Loading: ${isLoading}, Auth: ${isAuthenticated}`);

// //     // 1. SUCCESS: AuthContext confirms we are logged in
// //     if (isAuthenticated) {
// //       console.log("[CallbackPage] ✅ User is Authenticated. Finishing login...");
// //       finishLogin();
// //       return; // Stop here
// //     }

// //     // 2. FALLBACK LISTENERS (In case AuthContext is slow)
// //     const hubListener = Hub.listen('auth', ({ payload }) => {
// //         console.log(`[CallbackPage] 📢 Hub Event: ${payload.event}`);
// //         if (payload.event === 'signedIn' || payload.event === 'signInWithRedirect') {
// //             console.log("[CallbackPage] Hub says SignedIn! Triggering redirect...");
// //             finishLogin();
// //         }
// //     });

// //     // 3. SAFETY TIMEOUT (5 Seconds)
// //     // If nothing happens (no auth update, no hub event), go home.
// //     const timeoutId = setTimeout(() => {
// //         if (!processedRef.current && !isAuthenticated) {
// //             console.warn("[CallbackPage] ⏰ TIMEOUT. Login took too long or failed. Redirecting to home.");
// //             router.replace('/');
// //         }
// //     }, 5000);

// //     return () => {
// //         hubListener();
// //         clearTimeout(timeoutId);
// //     };
// //   }, [isAuthenticated, isLoading, router]);

// //   const finishLogin = () => {
// //     if (processedRef.current) return; // Prevent double redirects
// //     processedRef.current = true;

// //     const destination = localStorage.getItem('redirectAfterLogin') || '/';
// //     localStorage.removeItem('redirectAfterLogin');
    
// //     console.log(`[CallbackPage] 🚀 Redirecting to destination: ${destination}`);
// //     router.replace(destination);
// //   };

// //   return (
// //     <div className="h-screen w-full flex flex-col items-center justify-center bg-white">
// //       <Spinner className="w-10 h-10 text-[#003C22]" />
// //       <p className="mt-4 text-gray-600 font-medium animate-pulse">Finalizing login...</p>
// //       <p className="text-xs text-gray-400 mt-2">Please wait...</p>
// //     </div>
// //   );
// // }
// // src/app/auth-callback/page.tsx
// 'use client';

// import { useEffect, useRef } from 'react';
// import { useRouter } from 'next/navigation';
// import { useAuth } from '@/context/AuthContext';
// import Spinner from '@/components/shared/Spinner';
// import { Hub } from 'aws-amplify/utils';
// import { getCurrentUser } from 'aws-amplify/auth';
// // [!code ++] Import Layout Components
// import TopBar from '@/components/layout/TopBar';
// import Header from '@/components/layout/Header';
// import NavBar from '@/components/layout/NavBar';
// import Footer from '@/components/layout/Footer';

// export default function AuthCallbackPage() {
//   const router = useRouter();
//   const { isAuthenticated } = useAuth();
//   const processedRef = useRef(false);

//   useEffect(() => {
//     // 1. Check if we are already authenticated
//     if (isAuthenticated) {
//       finishLogin("AuthContext");
//       return;
//     }

//     // 2. Listen for Amplify Hub events
//     const hubListener = Hub.listen('auth', ({ payload }) => {
//         if (payload.event === 'signedIn' || payload.event === 'signInWithRedirect') {
//             finishLogin("Hub Event");
//         }
//     });

//     // 3. Active Polling (every 500ms) for faster detection
//     const intervalId = setInterval(async () => {
//         try {
//             await getCurrentUser();
//             finishLogin("Polling Success");
//         } catch (e) {
//             // Waiting...
//         }
//     }, 500);

//     // 4. Safety Timeout (Fallback)
//     const timeoutId = setTimeout(() => {
//         if (!processedRef.current) {
//             console.warn("[CallbackPage] ⏰ Login timed out. Redirecting home.");
//             router.replace('/');
//         }
//     }, 6000);

//     return () => {
//         hubListener();
//         clearInterval(intervalId);
//         clearTimeout(timeoutId);
//     };
//   }, [isAuthenticated, router]);

//   const finishLogin = (source: string) => {
//     if (processedRef.current) return;
//     processedRef.current = true;

//     console.log(`[CallbackPage] ✅ Login Confirmed via ${source}`);
//     const destination = localStorage.getItem('redirectAfterLogin') || '/';
//     localStorage.removeItem('redirectAfterLogin');
    
//     console.log(`[CallbackPage] 🚀 Redirecting to: ${destination}`);
//     // Use window.location.replace for a "hard" redirect to clear history/state cleanly
//     window.location.replace(destination); 
//   };

//   return (
//     <div className="min-h-screen bg-[#FAFAFA] font-sans flex flex-col">
//       {/* [!code ++] Standard Layout Header */}
//       <TopBar />
//       <Header />
//       <NavBar />
      
//       {/* [!code ++] Friendly Loading Content */}
//       <main className="flex-1 flex flex-col items-center justify-center py-20">
//         <div className="bg-white p-8 rounded-2xl shadow-sm border border-gray-100 flex flex-col items-center max-w-sm w-full mx-4">
//             <Spinner className="w-10 h-10 text-[#003C22] mb-4" />
//             <h2 className="text-xl font-bold text-[#003C22] mb-2">Welcome Back!</h2>
//             <p className="text-gray-500 text-center text-sm">
//                 We are securing your session and redirecting you to checkout...
//             </p>
//         </div>
//       </main>

//       {/* [!code ++] Standard Footer */}
//       <Footer />
//     </div>
//   );
// }



'use client';

import { useEffect, useRef } from 'react';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/context/AuthContext';
import Spinner from '@/components/shared/Spinner';
import { Hub } from 'aws-amplify/utils';
import { getCurrentUser } from 'aws-amplify/auth';
import TopBar from '@/components/layout/TopBar';
import Header from '@/components/layout/Header';
import NavBar from '@/components/layout/NavBar';
import Footer from '@/components/layout/Footer';

export default function AuthCallbackPage() {
  const router = useRouter();
  const { isAuthenticated } = useAuth();
  const processedRef = useRef(false);

  useEffect(() => {
    // 1. Check if we are already authenticated
    if (isAuthenticated) {
      finishLogin("AuthContext");
      return;
    }

    // 2. Listen for Amplify Hub events
    const hubListener = Hub.listen('auth', ({ payload }) => {
        if (payload.event === 'signedIn' || payload.event === 'signInWithRedirect') {
            finishLogin("Hub Event");
        }
    });

    // 3. Active Polling (Faster detection)
    const intervalId = setInterval(async () => {
        try {
            await getCurrentUser();
            finishLogin("Polling Success");
        } catch (e) {
            // Waiting...
        }
    }, 500);

    // 4. Safety Timeout
    const timeoutId = setTimeout(() => {
        if (!processedRef.current) {
            console.warn("[CallbackPage] ⏰ Login timed out. Redirecting home.");
            router.replace('/');
        }
    }, 6000);

    return () => {
        hubListener();
        clearInterval(intervalId);
        clearTimeout(timeoutId);
    };
  }, [isAuthenticated, router]);

  const finishLogin = (source: string) => {
    if (processedRef.current) return;
    processedRef.current = true;

    // [!code highlight] THIS IS THE CRITICAL FIX:
    console.log("[CallbackPage] 💾 Setting Sync Flag for Next Page");
    localStorage.setItem('login_sync_pending', 'true');

    console.log(`[CallbackPage] ✅ Login Confirmed via ${source}`);
    const destination = localStorage.getItem('redirectAfterLogin') || '/';
    localStorage.removeItem('redirectAfterLogin');
    
    console.log(`[CallbackPage] 🚀 Redirecting to: ${destination}`);
    window.location.replace(destination); 
  };

  return (
    <div className="min-h-screen bg-[#FAFAFA] font-sans flex flex-col">
      <TopBar />
      <Header />
      <NavBar />
      <main className="flex-1 flex flex-col items-center justify-center py-20">
        <div className="bg-white p-8 rounded-2xl shadow-sm border border-gray-100 flex flex-col items-center max-w-sm w-full mx-4">
            <Spinner className="w-10 h-10 text-[#003C22] mb-4" />
            <h2 className="text-xl font-bold text-[#003C22] mb-2">Welcome Back!</h2>
            <p className="text-gray-500 text-center text-sm">
                We are securing your session and redirecting you...
            </p>
        </div>
      </main>
      <Footer />
    </div>
  );
}