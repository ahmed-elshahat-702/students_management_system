import GradesModel from "@/app/api/models/GradesModel";
import dbConnect from "@/app/api/utils/dbConnect";

export async function GET(request) {
  await dbConnect();

  // Extract the grade level from the URL path using RegExp
  const pathSegments = request.url.split("/");
  const level = pathSegments[5].match(/\d+/)?.[0];

  if (!level) {
    return new Response(JSON.stringify({ error: "Invalid grade level" }), {
      headers: { "Content-Type": "application/json" },
      status: 400, // Bad Request if the level isn't found in the URL
    });
  }

  try {
    const gradeTables = await GradesModel.findOne({ grade: level });

    if (!gradeTables) {
      return new Response(JSON.stringify({ error: "Grade table not found" }), {
        headers: { "Content-Type": "application/json" },
        status: 404,
      });
    }

    // Successfully found grade tables
    return new Response(JSON.stringify({ gradeTables }), {
      headers: { "Content-Type": "application/json" },
      status: 200,
    });
  } catch (error) {
    // Return a 500 status in case of server errors
    return new Response(JSON.stringify({ error: error.message }), {
      headers: { "Content-Type": "application/json" },
      status: 500,
    });
  }
}
