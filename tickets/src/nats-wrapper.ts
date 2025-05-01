import nats, { Stan } from "node-nats-streaming";

class NatsWrapper {
  private _client?: Stan;

  get client() {
    if (!this._client) {
      throw new Error("Cannot access NATS client before connecting");
    }
    return this._client;
  }

  connect(clusterId: string, clientId: string, url: string) {
    this._client = nats.connect(clusterId, clientId, {
      url,
      waitOnFirstConnect: true, // Ensures it waits for initial connection
      reconnect: true, // Auto-reconnect if connection drops
      reconnectTimeWait: 1000, // 1 second between retries
      maxReconnectAttempts: -1, // Retry indefinitely
      ackTimeout: 5000, // 5s timeout for publish acknowledgments
    });

    return new Promise<void>((resolve, reject) => {
      this._client!.on("connect", () => {
        console.log("Connected to NATS Streaming");
        resolve();
      });

      this._client!.on("error", (err) => {
        console.error("NATS connection error:", err);
        reject(err);
      });

      this._client!.on("close", () => {
        console.log("NATS connection closed");
      });
    });
  }
}

export const natsWrapper = new NatsWrapper();
