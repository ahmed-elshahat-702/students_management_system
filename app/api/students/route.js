import StudentModel from "../models/StudentModel";
import dbConnect from "../utils/dbConnect";

export async function GET() {
  await dbConnect();

  try {
    const students = await StudentModel.find();
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
