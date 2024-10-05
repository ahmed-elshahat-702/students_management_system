import { cookies } from "next/headers";
import dbConnect from "../utils/dbConnect";
import jwt from "jsonwebtoken";

export async function POST(request, response) {
  await dbConnect();
  try {
    const cookieStore = cookies();
    cookieStore.delete("token");
    return new Response(JSON.stringify({ message: "cookie cleared" }), {
      headers: {
        "Content-Type": "application/json",
      },
      status: 200,
    });
  } catch (error) {
    return new Response(JSON.stringify({ error: error.message }), {
      headers: {
        "Content-Type": "application/json",
        "Set-Cookie": ``,
      },
      status: 500,
    });
  }
}
