import { faker } from "@faker-js/faker";

import { createTransaction, getAllUsers } from "@bank-brew/db";
import { users } from "@bank-brew/db/src/schema";

const allUsers = await getAllUsers();

for (let i = 0; i < 100; i++) {
  const [senderUser, recipientUser] = allUsers
    .sort(() => Math.random() - 0.5)
    .slice(0, 2);

  if (!senderUser || !recipientUser) {
    throw new Error("No users found!");
  }

  const transactionTitle = `${faker.word.adverb()} ${faker.word.adjective()} ${faker.word.noun()}`;
  const transactionValue = faker.number.float({
    min: 1,
    max: 1000,
    precision: 0.01,
  });

  console.log({
    recipientUserId: recipientUser.clerkId,
    senderUserId: senderUser.clerkId,
    title: transactionTitle,
    value: transactionValue,
  });

  await createTransaction(
    {
      recipientUserId: recipientUser.clerkId,
      senderUserId: senderUser.clerkId,
      title: transactionTitle,
      value: transactionValue,
    },
    true,
  );

  console.log("Transaction created!");
}
