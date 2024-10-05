import TeacherModel from "../models/TeacherModel";
import dbConnect from "../utils/dbConnect";

export async function GET(request, response) {
  await dbConnect();

  try {
    const teachers = await TeacherModel.find();
    return new Response(JSON.stringify({ teachers: teachers }), {
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
