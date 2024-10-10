import GradesModel from "@/app/api/models/GradesModel";
import dbConnect from "@/app/api/utils/dbConnect";

export async function GET(request, response) {
  await dbConnect();

  try {
    const grades = await GradesModel.find();
    if (grades.length === 0) {
      return new Response(JSON.stringify({ error: "No Data found" }), {
        headers: {
          "Content-Type": "application/json",
        },
        status: 404,
      });
    }
    return new Response(JSON.stringify({ grades: grades }), {
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
