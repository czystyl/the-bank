import { faker } from "@faker-js/faker";
import { createTransaction, getAllUsers } from "@the-bank/db";

const allUsers = await getAllUsers();

for (let i = 0; i < 600; i++) {
  const [senderUser, recipientUser] = allUsers
    .sort(() => Math.random() - 0.5)
    .slice(0, 2);

  if (!senderUser || (!recipientUser && senderUser !== recipientUser)) {
    throw new Error("No users found!");
  }

  const transactionTitleText = `${faker.word.adverb()} ${faker.word.adjective()} ${faker.word.noun()}`;
  const transactionTitle =
    transactionTitleText.at(0)?.toUpperCase() + transactionTitleText.slice(1);

  const transactionValue = faker.number.float({
    min: 1,
    max: 1000,
    precision: 0.01,
  });

  const createdAt = faker.date.between({
    from: "2023-01-01T00:00:00.000Z",
    to: new Date().toISOString(),
  });

  await createTransaction({
    skipValidation: true,
    data: {
      recipientUserId: recipientUser.clerkId,
      senderUserId: senderUser.clerkId,
      title: transactionTitle,
      value: transactionValue,
      createdAt,
    },
  });

  console.log("Created transaction!");
}

console.log("Done!");
