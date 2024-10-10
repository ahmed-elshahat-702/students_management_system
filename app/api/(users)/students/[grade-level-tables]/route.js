import GradesModel from "@/app/api/models/GradesModel";
import dbConnect from "@/app/api/utils/dbConnect";

export async function GET(request, response) {
  await dbConnect();

  const level = request.url.split("/")[5].match(/\d+/)[0];

  try {
    const gradeTables = await GradesModel.findOne({
      grade: level,
    });
    if (!gradeTables) {
      return new Response(JSON.stringify({ error: "Grade table not found" }), {
        headers: {
          "Content-Type": "application/json",
        },
        status: 404,
      });
    }
    return new Response(JSON.stringify({ gradeTables: gradeTables }), {
      headers: {
        "Content-Type": "application/json",
      },
      status: 200,
    });
  } catch (error) {
    return new Response(JSON.stringify({ error: error.message }), {
      headers: {
        "Content-Type": "application/json",
      },
      status: 500,
    });
  }
}
