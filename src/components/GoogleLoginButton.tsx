"use client";

import { signInWithRedirect } from 'aws-amplify/auth';

export default function GoogleLoginButton() {
  
  const handleLogin = async () => {
    try {
      await signInWithRedirect({ provider: 'Google' });
    } catch (error) {
      console.error("Error logging in with Google:", error);
    }
  };

  return (
    <button
      onClick={handleLogin}
      style={{
        padding: "12px 24px",
        backgroundColor: "#4285F4",
        color: "white",
        border: "none",
        borderRadius: "4px",
        fontSize: "16px",
        cursor: "pointer",
        fontWeight: "bold",
        marginTop: "20px"
      }}
    >
      Sign in with Google
    </button>
  );
}