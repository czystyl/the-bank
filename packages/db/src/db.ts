import { connect } from "@planetscale/database";
import { env } from "@the-bank/env";
import { drizzle } from "drizzle-orm/planetscale-serverless";

import * as schema from "./schema";

const connection = connect({ url: env.DATABASE_URL });
export const db = drizzle(connection, { schema: schema });
