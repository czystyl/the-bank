import type { PusherEvent } from "@pusher/pusher-websocket-react-native";
import { Pusher } from "@pusher/pusher-websocket-react-native";

export const pusher = Pusher.getInstance();

await pusher.init({
  apiKey: "ed7ec9fd7aff78d89c28",
  cluster: "eu",
});

await pusher.connect();
await pusher.subscribe({
  channelName: "my-channel",
  onEvent: (event: PusherEvent) => {
    console.log(`Event received: ${event}`);
  },
});
