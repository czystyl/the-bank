import { insertUsers } from "@bank-brew/db";

import "@bank-brew/env";

import clerk from "@clerk/clerk-sdk-node";

const users = [];

const limit = 2;
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
  }));

  users.push(...formattedUserList);

  fetchMore = userList.length > 0;
  page++;
} while (fetchMore);

console.log(`Found ${users.length} users.`);

const results = await insertUsers(users);

if (!results) {
  console.log("No users were inserted");
} else {
  console.log(`Inserted ${results.rowsAffected} users.`);
}
