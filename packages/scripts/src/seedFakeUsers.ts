import { faker } from "@faker-js/faker";

import { insertUsers } from "@bank-brew/db";

const users = [];

for (let i = 0; i < 10; i++) {
  const clerkId = `fake_${faker.string.alpha(28)}`;
  const firstName = faker.person.firstName();
  const lastName = faker.person.lastName();
  const imageUrl = faker.image.avatar();

  const user = {
    clerkId,
    firstName,
    lastName,
    imageUrl,
  };

  users.push(user);
}

const results = await insertUsers(users);

if (!results) {
  console.log("No users were inserted");
} else {
  console.log(`Inserted ${results.rowsAffected} users.`);
}
