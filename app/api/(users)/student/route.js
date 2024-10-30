import StudentModel from "../../models/StudentModel";
import dbConnect from "../../utils/dbConnect";

// GET Request Handler
export async function GET(request) {
  await dbConnect();
  try {
    const url = new URL(request.url);
    const username = url.searchParams.get("username");

    const student = await StudentModel.findOne({ username });

    if (!student) {
      return new Response(JSON.stringify({ error: "Student not found" }), {
        headers: {
          "Content-Type": "application/json",
        },
        status: 404,
      });
    }

    return new Response(JSON.stringify({ student }), {
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
