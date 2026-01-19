import { API_CONFIG } from '@/config/apiConfig';

// Define the shape of messages we expect
type WSMessage = {
  type: string;
  connection_id?: string;
  razorpay_order_id?: string;
  payable_amount?: number;
  [key: string]: any;
};

class WebSocketService {
  private ws: WebSocket | null = null;
  private connectionId: string | null = null;
  private messageListeners: ((msg: WSMessage) => void)[] = [];
  
  private WS_URL = "wss://qwjbpwp188.execute-api.ap-south-1.amazonaws.com/dev"; 

  // 1. Connect & Get ID (The "Handshake")
  async connect(authToken: string): Promise<string> {
    if (this.ws && this.ws.readyState === WebSocket.OPEN && this.connectionId) {
      console.log("♻️ Reusing existing WebSocket Connection ID:", this.connectionId);
      return this.connectionId;
    }

    return new Promise((resolve, reject) => {
      // KEPT YOUR ORIGINAL REQUEST STRUCTURE (?token=)
      const wsUrlWithToken = `${this.WS_URL}?token=${encodeURIComponent(authToken)}`;

      console.log("🔌 Attempting WebSocket Connection...");
      
      this.ws = new WebSocket(wsUrlWithToken); 

      this.ws.onopen = () => {
        console.log("✅ WebSocket Handshake Success! Registering...");
        this.ws?.send(JSON.stringify({ type: "register_connection" }));
      };

      this.ws.onmessage = (event) => {
        try {
          const data = JSON.parse(event.data);
          console.log("📩 WS Message:", data);

          if (data.connection_id) {
            this.connectionId = data.connection_id;
            resolve(data.connection_id);
          }
          this.messageListeners.forEach(listener => listener(data));
        } catch (e) {
          console.error("WS Parse Error", e);
        }
      };

      this.ws.onerror = (err) => {
        console.error("❌ WebSocket Handshake Failed. Check your Token or AWS Logs.", err);
        reject(new Error("Connection Failed: Possible Auth Error"));
      };

      this.ws.onclose = (event) => {
        console.log(`⚠️ WebSocket Closed: Code ${event.code}, Reason: ${event.reason}`);
        this.connectionId = null;
      };
    });
  }

  // 2. Wait for a specific message
  waitForPaymentDetails(): Promise<any> {
    return new Promise((resolve, reject) => {
      
      const timeout = setTimeout(() => {
        reject(new Error("Timeout waiting for order response"));
      }, 30000);

      const listener = (data: any) => {
        console.log("🔍 WebSocket Listener saw:", data.type); 

        // ACCEPT BOTH ONLINE AND OFFLINE ORDERS
        if (data.type === 'PAYMENT_ORDER_CREATED' || data.type === 'OFFLINE_PAYMENT_ORDER') {
          clearTimeout(timeout);
          resolve(data); 
          
          // Remove listener
          this.messageListeners = this.messageListeners.filter(l => l !== listener);
        }
        
        if (data.type === 'error') {
          clearTimeout(timeout);
          reject(new Error(data.message || "Order creation failed"));
          this.messageListeners = this.messageListeners.filter(l => l !== listener);
        }
      };

      // [!code highlight] This was the missing part causing the error
      this.addMessageListener(listener);
    });
  }

  // 3. Cleanup
  disconnect() {
    if (this.ws) {
      console.log("🔌 Disconnecting WebSocket...");
      this.ws.close(1000, "Transaction Complete");
      this.ws = null;
      this.connectionId = null;
      this.messageListeners = []; 
    }
  }

  // [!code highlight] 4. HELPER METHODS (Added to fix the TypeError)
  addMessageListener(listener: (msg: WSMessage) => void) {
    this.messageListeners.push(listener);
  }
}

// Export as a Singleton
export const webSocketService = new WebSocketService();