import { cookies } from "next/headers";
import jwt from "jsonwebtoken";

export async function GET(request, response) {
  try {
    const cookieStore = cookies();
    const token = cookieStore.get("token")?.value;
    const jwtSecret = process.env.NEXT_PUBLIC_JWT_SECRET;
    let userData;

    if (!token) {
      return new Response(
        JSON.stringify({ error: "Access denied: Unauthorized" }),
        {
          headers: {
            "Content-Type": "application/json",
          },
          status: 401,
        }
      );
    }

    await jwt.verify(token, jwtSecret, (err, user) => {
      if (err) {
        return new Response(JSON.stringify({ error: "Invalid token" }), {
          status: 403,
        });
      }

      userData = user;
    });

    return new Response(JSON.stringify({ user: userData }), {
      status: 200,
    });
  } catch (error) {
    return new Response(
      JSON.stringify({ error: error.message || "Invalid token" }),
      {
        headers: {
          "Content-Type": "application/json",
        },
        status: 403,
      }
    );
  }
}
