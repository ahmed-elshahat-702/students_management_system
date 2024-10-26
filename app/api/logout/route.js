import { cookies } from "next/headers";

export function POST(request, response) {
  try {
    const cookieStore = cookies();
    cookieStore.delete("token");
    return new Response(
      JSON.stringify({ message: "Logged out successfully" }),
      {
        headers: {
          "Content-Type": "application/json",
        },
        status: 200,
      }
    );
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
