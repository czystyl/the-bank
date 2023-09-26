import { getUser } from "@the-bank/db";

// Run any task from DB example
const user = await getUser("123");
console.log(user);
