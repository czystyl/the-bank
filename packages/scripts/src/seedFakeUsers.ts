import { faker } from "@faker-js/faker";

import { insertUsers } from "@bank-brew/db";

const users = [];

for (let i = 0; i < 50; i++) {
  const clerkId = `fake_${faker.string.alpha(28)}`;
  const firstName = faker.person.firstName();
  const lastName = faker.person.lastName();
  const imageUrl = faker.image.avatar();
  const createdAt = faker.date.between({
    from: "2023-01-01T00:00:00.000Z",
    to: new Date().toISOString(),
  });

  users.push({
    clerkId,
    firstName,
    lastName,
    imageUrl,
    createdAt,
  });
}

const results = await insertUsers(users);

if (!results) {
  console.log("No users were inserted");
} else {
  console.log(`Inserted ${results.rowsAffected} users.`);
}
