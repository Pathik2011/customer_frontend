import { getCurrentUser, fetchAuthSession } from 'aws-amplify/auth';

const API_URL = 'https://6jk2hyyxsl.execute-api.ap-south-1.amazonaws.com/dev/customers';

export const customerService = {
  syncUser: async () => {
    try {
      console.log("🚀 [customerService] Syncing User to DB...");

      // 1. Get the Session Token (ID Token)
      const session = await fetchAuthSession();
      const idToken = session.tokens?.idToken?.toString();

      if (!idToken) throw new Error("Could not retrieve ID Token from session.");

      // 2. Send to Backend (Empty body, Token in header)
      const response = await fetch(API_URL, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${idToken}` 
        },
        body: JSON.stringify({}), 
      });

      if (!response.ok) {
        const errorText = await response.text();
        console.error(`❌ [customerService] Sync Failed (${response.status}):`, errorText);
        throw new Error(`DB Sync Failed: ${response.status} ${errorText}`);
      }

      const responseData = await response.json();
      console.log("✅ [customerService] Sync Success:", responseData);
      return responseData;

    } catch (error) {
      console.error("❌ [customerService] Error:", error);
      throw error;
    }
  }
};