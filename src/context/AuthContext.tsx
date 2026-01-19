

"use client";

import React, { createContext, useContext, useEffect, useState, ReactNode } from 'react';
import { getCurrentUser, signOut } from 'aws-amplify/auth';
import { Hub } from 'aws-amplify/utils';
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

  const fetchUser = async (source: string) => {
    console.log(`🕵️ [DEBUG] AuthContext: fetchUser called from [${source}]`);
    try {
      const currentUser = await getCurrentUser();
      console.log(`👤 [DEBUG] AuthContext: User FOUND: ${currentUser.userId}`);
      setIsAuthenticated(true);
      setUser(currentUser);
    } catch (error) {
      console.log(`👻 [DEBUG] AuthContext: No User (Guest). Source: [${source}]`);
      setIsAuthenticated(false);
      setUser(null);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchUser('Mount');

    const hubListener = Hub.listen('auth', ({ payload }) => {
      console.log(`🔔 [DEBUG] AuthContext: Hub Event: ${payload.event}`);
      switch (payload.event) {
        case 'signedIn':
        case 'signInWithRedirect':
          // [!code highlight] FIX: Set a persistent flag that survives reload
          console.log("💾 [DEBUG] AuthContext: Setting 'login_sync_pending' flag in LocalStorage");
          localStorage.setItem('login_sync_pending', 'true');
          
          fetchUser(`Hub: ${payload.event}`); 
          break;
        case 'signedOut':
          setIsAuthenticated(false);
          setUser(null);
          setIsLoading(false);
          break;
      }
    });

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