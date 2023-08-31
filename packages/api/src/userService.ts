import { clerkClient } from "@clerk/nextjs";

export function getPaginatedClerkUsers(limit: number, offset: number) {
  return clerkClient.users.getUserList({ limit, offset });
}

export async function getClerkUser(id: string) {
  try {
    const user = await clerkClient.users.getUser(id);

    return user;
  } catch (error) {
    return null;
  }
}
