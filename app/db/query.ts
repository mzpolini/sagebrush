import { drizzle } from "drizzle-orm/neon-http";
import { neon } from "@neondatabase/serverless";
import * as schema from "./schema";
import { SQL } from "drizzle-orm";

const sql = neon(process.env.DATABASE_URL!);
const db = drizzle(sql);

export const query = {
  ...db,
  users: {
    findFirst: async (params: { where: SQL | undefined }) => {
      const result = await db
        .select()
        .from(schema.users)
        .where(params.where)
        .limit(1);
      return result[0];
    },
  },
};
