import TeacherModel from "../../models/TeacherModel";
import dbConnect from "../../utils/dbConnect";

export async function GET(request) {
  await dbConnect();

  try {
    const teachers = await TeacherModel.find();

    // Check if any teachers were found
    if (teachers.length === 0) {
      return new Response(JSON.stringify({ error: "No teachers found" }), {
        headers: {
          "Content-Type": "application/json",
        },
        status: 404,
      });
    }

    // Return the list of teachers
    return new Response(JSON.stringify({ teachers }), {
      headers: {
        "Content-Type": "application/json",
      },
      status: 200,
    });
  } catch (error) {
    // Handle unexpected errors
    return new Response(JSON.stringify({ error: error.message }), {
      headers: {
        "Content-Type": "application/json",
      },
      status: 500,
    });
  }
}
