// // 'use client';

// // import { useEffect, useState } from 'react';
// // import { useAuth } from '@/context/AuthContext';
// // import { Hub } from 'aws-amplify/utils';
// // import { fetchAuthSession } from 'aws-amplify/auth';
// // import { mergeCart } from '@/services/cartService';
// // import { customerService } from '@/services/customerService';
// // import { useRouter } from 'next/navigation';

// // export default function LoginEventHandler() {
// //   const { user } = useAuth();
// //   const router = useRouter();
// //   const [shouldRunSync, setShouldRunSync] = useState(false);

// //   // LOG: Verify Component is Mounting
// //   useEffect(() => {
// //     console.log("👀 [DEBUG] LoginEventHandler: Component MOUNTED.");
// //   }, []);

// //   useEffect(() => {
// //     // A. Check LocalStorage (Recovery from reload)
// //     if (localStorage.getItem('login_sync_pending') === 'true') {
// //       console.log("💾 [LoginHandler] Found pending sync flag in Storage.");
// //       setShouldRunSync(true);
// //       localStorage.removeItem('login_sync_pending');
// //     }

// //     // B. Listen to Amplify Hub (Live events)
// //     const hubListener = Hub.listen('auth', ({ payload }) => {
// //       if (payload.event === 'signedIn' || payload.event === 'signInWithRedirect') {
// //         console.log("✅ [LoginHandler] Login Event Detected! Triggering Flow.");
// //         setShouldRunSync(true);
// //       }
// //     });

// //     return () => hubListener();
// //   }, []);

// //   useEffect(() => {
// //     const runSequentialFlow = async () => {
// //       if (!user || !shouldRunSync) return;

// //       console.log("🚀 [LoginHandler] Starting SEQUENTIAL Sync Flow...");

// //       try {
// //         const session = await fetchAuthSession();
// //         const idToken = session.tokens?.idToken?.toString();
// //         if (!idToken) {
// //            console.error("❌ [LoginHandler] No ID Token found. Aborting.");
// //            return;
// //         }

// //         // --- STEP 1: Sync Customer ---
// //         console.log("1️⃣ [Step 1] Syncing Customer...");
// //         const customerRes = await customerService.syncUser(); 
// //         console.log("✅ [Step 1] Customer Synced Success:", customerRes);

// //         // --- STEP 2: Merge Cart ---
// //         const guestId = localStorage.getItem('guest-cart-id') || localStorage.getItem('guest_cart_id');
// //         if (guestId) {
// //            console.log(`2️⃣ [Step 2] Found Guest Cart (${guestId}). Merging...`);
// //            await mergeCart(idToken, guestId);
// //            console.log("✅ [Step 2] Cart Merged Successfully.");
           
// //            localStorage.removeItem('guest-cart-id');
// //            localStorage.removeItem('guest_cart_id');
// //         } else {
// //            console.log("⏭️ [Step 2] No Guest Cart to merge. Skipping.");
// //         }

// //         // --- STEP 3: Redirect ---
// //         const redirectPath = localStorage.getItem('redirectAfterLogin');
// //         if (redirectPath) {
// //            console.log(`🔀 [LoginHandler] Redirecting to ${redirectPath}`);
// //            localStorage.removeItem('redirectAfterLogin');
// //            router.push(redirectPath);
// //         }

// //       } catch (error) {
// //         console.error("❌ [LoginHandler] FLOW STOPPED due to Error:", error);
// //       } finally {
// //         setShouldRunSync(false);
// //       }
// //     };

// //     runSequentialFlow();
// //   }, [user, shouldRunSync, router]);

// //   return null;
// // }
// 'use client';

// import { useEffect, useState } from 'react';
// import { useAuth } from '@/context/AuthContext';
// // [!code ++] Import useCart
// import { useCart } from '@/context/CartContext';
// import { Hub } from 'aws-amplify/utils';
// import { fetchAuthSession } from 'aws-amplify/auth';
// import { mergeCart } from '@/services/cartService';
// import { customerService } from '@/services/customerService';
// import { useRouter } from 'next/navigation';

// export default function LoginEventHandler() {
//   const { user } = useAuth();
//   // [!code ++] Get the refresh function
//   const { refreshCart } = useCart(); 
//   const router = useRouter();
//   const [shouldRunSync, setShouldRunSync] = useState(false);

//   useEffect(() => {
//     if (localStorage.getItem('login_sync_pending') === 'true') {
//       setShouldRunSync(true);
//       localStorage.removeItem('login_sync_pending');
//     }

//     const hubListener = Hub.listen('auth', ({ payload }) => {
//       if (payload.event === 'signedIn' || payload.event === 'signInWithRedirect') {
//         setShouldRunSync(true);
//       }
//     });

//     return () => hubListener();
//   }, []);

//   useEffect(() => {
//     const runSequentialFlow = async () => {
//       if (!user || !shouldRunSync) return;

//       try {
//         const session = await fetchAuthSession();
//         const idToken = session.tokens?.idToken?.toString();
        
//         if (!idToken) return;

//         // --- STEP 1: Sync Customer ---
//         await customerService.syncUser(); 

//         // --- STEP 2: Merge Cart ---
//         const guestId = localStorage.getItem('guest-cart-id') || localStorage.getItem('guest_cart_id');
//         if (guestId) {
//            await mergeCart(idToken, guestId);
           
//            // Cleanup
//            localStorage.removeItem('guest-cart-id');
//            localStorage.removeItem('guest_cart_id');
//         }

//         // --- [!code ++] STEP 3: REFRESH CART (Critical) ---
//         // This fetches the merged/user cart from DB and updates the Bag Icon immediately
//         console.log("🔄 [LoginHandler] Refreshing Cart for User...");
//         await refreshCart();

//         // --- STEP 4: Redirect ---
//         const redirectPath = localStorage.getItem('redirectAfterLogin');
//         if (redirectPath) {
//            localStorage.removeItem('redirectAfterLogin');
//            router.push(redirectPath);
//         }

//       } catch (error) {
//         console.error("Post-Login Sync Failed:", error);
//       } finally {
//         setShouldRunSync(false);
//       }
//     };

//     runSequentialFlow();
//   }, [user, shouldRunSync, router, refreshCart]);

//   return null;
// }
'use client';

import { useEffect, useState } from 'react';
import { useAuth } from '@/context/AuthContext';
import { useCart } from '@/context/CartContext'; // [!code ++]
import { Hub } from 'aws-amplify/utils';
import { fetchAuthSession } from 'aws-amplify/auth';
import { mergeCart } from '@/services/cartService';
import { customerService } from '@/services/customerService';
import { useRouter } from 'next/navigation';

export default function LoginEventHandler() {
  const { user } = useAuth();
  // [!code changed] Use the new optimized function
  const { updateCartCountOnly } = useCart(); 
  const router = useRouter();
  const [shouldRunSync, setShouldRunSync] = useState(false);

  useEffect(() => {
    if (localStorage.getItem('login_sync_pending') === 'true') {
      setShouldRunSync(true);
      localStorage.removeItem('login_sync_pending');
    }

    const hubListener = Hub.listen('auth', ({ payload }) => {
      if (payload.event === 'signedIn' || payload.event === 'signInWithRedirect') {
        setShouldRunSync(true);
      }
    });

    return () => hubListener();
  }, []);

  useEffect(() => {
    const runSequentialFlow = async () => {
      if (!user || !shouldRunSync) return;

      try {
        const session = await fetchAuthSession();
        const idToken = session.tokens?.idToken?.toString();
        
        if (!idToken) return;

        // --- STEP 1: Sync Customer ---
        await customerService.syncUser(); 

        // --- STEP 2: Merge Cart ---
        const guestId = localStorage.getItem('guest-cart-id') || localStorage.getItem('guest_cart_id');
        if (guestId) {
           // [!code changed] Capture the response!
           const mergeResponse = await mergeCart(idToken, guestId);
           
           // [!code ++] OPTIMIZATION: Update Icon immediately from merge response
           if (mergeResponse && typeof mergeResponse.total_cart_items === 'number') {
              console.log(`✅ [LoginHandler] Merged! Updating Icon to: ${mergeResponse.total_cart_items}`);
              updateCartCountOnly(mergeResponse.total_cart_items);
           }
           
           // Cleanup
           localStorage.removeItem('guest-cart-id');
           localStorage.removeItem('guest_cart_id');
        } else {
            // Optional: If no guest cart, we might still want to refresh to show existing user items
            // But if you strictly want "On Click Only", do nothing here.
        }

        // --- STEP 3: Redirect ---
        const redirectPath = localStorage.getItem('redirectAfterLogin');
        if (redirectPath) {
           localStorage.removeItem('redirectAfterLogin');
           router.push(redirectPath);
        }

      } catch (error) {
        console.error("Post-Login Sync Failed:", error);
      } finally {
        setShouldRunSync(false);
      }
    };

    runSequentialFlow();
  }, [user, shouldRunSync, router, updateCartCountOnly]);

  return null;
}