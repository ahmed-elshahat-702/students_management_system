import StudentModel from "../models/StudentModel";
import dbConnect from "../utils/dbConnect";

export async function GET(request, response) {
  await dbConnect();

  try {
    const students = await StudentModel.find();
    if (students.length === 0) {
      return new Response(JSON.stringify({ message: "No students found" }), {
        headers: {
          "Content-Type": "application/json",
        },
        status: 404,
      });
    }
    return new Response(JSON.stringify({ students: students }), {
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
