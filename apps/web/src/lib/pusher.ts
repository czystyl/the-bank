import { env } from "@the-bank/env";
import Pusher from "pusher-js";

export const PusherClient = new Pusher(env.NEXT_PUBLIC_PUSHER_KEY, {
  cluster: "eu",
});
