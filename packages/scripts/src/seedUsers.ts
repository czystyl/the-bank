import { faker } from "@faker-js/faker";
import { insertUser } from "@the-bank/db";

const count = faker.number.int({ min: 30, max: 80 });

for (let i = 0; i < count; i++) {
  const clerkId = `fake_${faker.string.alpha(28)}`;
  const firstName = faker.person.firstName();
  const lastName = faker.person.lastName();
  const imageUrl = faker.image.avatar();
  const createdAt = faker.date.between({
    from: "2023-01-01T00:00:00.000Z",
    to: new Date().toISOString(),
  });

  await insertUser({
    clerkId,
    firstName,
    lastName,
    imageUrl,
    createdAt,
  });
}

console.log("Done!");
