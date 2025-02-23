import { testInsertUser } from "@/app/actions/user";

export async function GET() {
  const user = await testInsertUser();
  return Response.json(user);
}
