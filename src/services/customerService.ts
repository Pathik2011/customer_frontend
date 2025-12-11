import { getCurrentUser, fetchAuthSession } from 'aws-amplify/auth';

const API_URL = 'https://s5mbd1zyyj.execute-api.ap-south-1.amazonaws.com/dev/customers';

export interface CustomerUser {
  cognito_id: string;
  email: string;
  first_name: string;
  last_name: string;
  profile_pic_url: string;
}

export const customerService = {
  syncUser: async () => {
    try {
      // 1. Get User ID
      const currentUser = await getCurrentUser();
      
      // 2. Get User Details from Session (ID Token) instead of fetching from Cognito API
      // This bypasses the "Access Token does not have required scopes" error.
      const session = await fetchAuthSession();
      const idTokenPayload = session.tokens?.idToken?.payload;

      if (!idTokenPayload) {
        throw new Error("Could not retrieve user details from session tokens.");
      }

      // 3. Map the data
      const userData: CustomerUser = {
        cognito_id: currentUser.userId,
        email: (idTokenPayload.email as string) || '',
        first_name: (idTokenPayload.given_name as string) || '',
        last_name: (idTokenPayload.family_name as string) || '',
        profile_pic_url: (idTokenPayload.picture as string) || '',
      };

      console.log("🚀 Syncing User to DB:", userData);

      // 4. Send to Backend
      const response = await fetch(API_URL, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(userData),
      });

      if (!response.ok) {
        throw new Error(`DB Sync Failed: ${response.status}`);
      }

      const responseData = await response.json();
      console.log("✅ DB Sync Success:", responseData);
      return responseData;

    } catch (error) {
      console.error("❌ DB Sync Error:", error);
      throw error;
    }
  }
};