import { currentUser } from "@clerk/nextjs";

export async function Test() {
  const user = await currentUser();

  if (!user) {
    return <div>Not logged in</div>;
  }

  return <div>Hello {user?.firstName}</div>;
}
