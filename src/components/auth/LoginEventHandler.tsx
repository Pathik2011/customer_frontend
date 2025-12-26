'use client';

import { useEffect, useState } from 'react';
import { useAuth } from '@/context/AuthContext';
import { Hub } from 'aws-amplify/utils';
import { fetchAuthSession } from 'aws-amplify/auth'; // [!code ++] Import this
import { mergeCart } from '@/services/cartService';
import { customerService } from '@/services/customerService';
import { useRouter } from 'next/navigation';

export default function LoginEventHandler() {
  const { user } = useAuth();
  const router = useRouter();
  const [pendingLoginAction, setPendingLoginAction] = useState(false);

  useEffect(() => {
    const hubListener = Hub.listen('auth', ({ payload }) => {
      if (payload.event === 'signedIn' || payload.event === 'signInWithRedirect') {
        console.log("🚀 [LoginEventHandler] Login Detected! Preparing to sync...");
        setPendingLoginAction(true);
      }
    });
    return () => hubListener();
  }, []);

  useEffect(() => {
    if (user && pendingLoginAction) {
      const executeLoginFlow = async () => {
        console.log("⚡ [LoginEventHandler] Executing Post-Login Flows...");
        
        try {
          // [!code ++] 1. GET THE TOKEN FIRST
          const session = await fetchAuthSession();
          const idToken = session.tokens?.idToken?.toString();

          if (!idToken) {
             console.error("❌ [LoginEventHandler] No ID Token found. Cannot merge.");
             return;
          }

          // 2. PARALLEL API CALLS
          const guestId = localStorage.getItem('guest-cart-id') || localStorage.getItem('guest_cart_id');
          
          await Promise.allSettled([
            // [!code changed] Pass idToken instead of userId
            guestId ? mergeCart(idToken, guestId) : Promise.resolve(),
            
            customerService.syncUser()
          ]);

          // 3. CLEANUP
          if (guestId) {
            localStorage.removeItem('guest-cart-id');
            localStorage.removeItem('guest_cart_id');
          }

          // 4. HANDLE REDIRECTS
          const redirectPath = localStorage.getItem('redirectAfterLogin');
          if (redirectPath) {
             console.log(`🔀 [LoginEventHandler] Redirecting to ${redirectPath}`);
             localStorage.removeItem('redirectAfterLogin');
             router.push(redirectPath);
          }

        } catch (error) {
          console.error("❌ [LoginEventHandler] Error during post-login flow:", error);
        } finally {
          setPendingLoginAction(false);
        }
      };

      executeLoginFlow();
    }
  }, [user, pendingLoginAction, router]);

  return null;
}