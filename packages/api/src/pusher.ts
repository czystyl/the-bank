import { env } from "@the-bank/env";
import Pusher from "pusher";

export const PusherServer = new Pusher({
  appId: env.PUSHER_APP_ID,
  key: env.PUSHER_KEY,
  secret: env.PUSHER_SECRET,
  cluster: "eu",
  useTLS: true,
});
