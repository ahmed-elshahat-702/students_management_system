import TeacherModel from "../models/TeacherModel";
import dbConnect from "../utils/dbConnect";

export async function DELETE(request) {
  await dbConnect();
  try {
    const url = new URL(request.url);
    const username = url.searchParams.get("username");

    const deletedTeacher = await TeacherModel.findOneAndDelete({
      username,
    });
    if (!deletedTeacher) {
      return new Response(JSON.stringify({ error: "Teacher not found" }), {
        status: 404,
      });
    }

    return new Response(
      JSON.stringify({ message: "Teacher deleted successfully!" }),
      { status: 200 }
    );
  } catch (error) {
    return new Response(JSON.stringify({ error: error.message }), {
      status: 500,
    });
  }
}
