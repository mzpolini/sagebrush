import { drizzle } from "drizzle-orm/neon-http";
import { neon } from "@neondatabase/serverless";
import * as schema from "./schema";

const sql = neon(process.env.DATABASE_URL!);
const db = drizzle(sql);

export const query = {
  ...db,
  users: {
    findFirst: async (params: any) => {
      const result = await db
        .select()
        .from(schema.users)
        .where(params.where)
        .limit(1);
      return result[0];
    },
  },
};
