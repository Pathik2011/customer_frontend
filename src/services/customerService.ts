import { fetchAuthSession } from 'aws-amplify/auth';

const API_URL = 'https://s5mbd1zyyj.execute-api.ap-south-1.amazonaws.com/dev/customers';

export const customerService = {
  syncUser: async () => {
    console.log("🟦 [customerService] syncUser() CALLED");

    try {
      // 1. Get Token
      const session = await fetchAuthSession();
      const idToken = session.tokens?.idToken?.toString();

      if (!idToken) {
        console.error("❌ [customerService] ABORT: No ID Token found.");
        throw new Error("No ID Token");
      }

      console.log("🟦 [customerService] Token Found. Sending POST to:", API_URL);

      // 2. Call API
      const response = await fetch(API_URL, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${idToken}` 
        },
        body: JSON.stringify({}), 
      });

      // 3. Log Result
      const text = await response.text(); // Read raw text first
      console.log(`🟦 [customerService] Response Status: ${response.status}`);
      console.log(`🟦 [customerService] Response Body: ${text}`);

      if (!response.ok) {
        throw new Error(`Server Error: ${response.status} ${text}`);
      }

      // Try to parse JSON if possible, otherwise return text
      try {
          return JSON.parse(text);
      } catch (e) {
          return { message: "Success", raw: text };
      }

    } catch (error) {
      console.error("❌ [customerService] FAILED:", error);
      throw error;
    }
  }
};