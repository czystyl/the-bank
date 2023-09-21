import { insertUser } from "@the-bank/db";

import "@the-bank/env";

import clerk from "@clerk/clerk-sdk-node";

const users = [];

const limit = 50;
let page = 0;
let fetchMore = true;

do {
  const offset = page * limit;

  console.log(`Fetching page ${page} with offset ${offset}...`);

  const userList = await clerk.users.getUserList({ limit, offset });

  const formattedUserList = userList.map((user) => ({
    clerkId: user.id,
    firstName: user.firstName,
    lastName: user.lastName,
    imageUrl: user.imageUrl,
    createdAt: new Date(user.createdAt),
  }));

  users.push(...formattedUserList);

  fetchMore = userList.length > 0;
  page++;
} while (fetchMore);

console.log(`Found ${users.length} users.`);

for (const user of users) {
  await insertUser(user);
}

console.log("Done!");
