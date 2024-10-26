import TeacherModel from "../../models/TeacherModel";
import dbConnect from "../../utils/dbConnect";

export async function DELETE(request) {
  await dbConnect();
  try {
    // Parse the URL to get the "username" query parameter
    const url = new URL(request.url);
    const username = url.searchParams.get("username");

    // Handle missing username parameter
    if (!username) {
      return new Response(
        JSON.stringify({ error: "Username is required to delete teacher" }),
        {
          headers: { "Content-Type": "application/json" },
          status: 400, // Bad Request
        }
      );
    }

    // Attempt to delete the teacher based on the username
    const deletedTeacher = await TeacherModel.findOneAndDelete({ username });

    // If no teacher is found, return a 404
    if (!deletedTeacher) {
      return new Response(JSON.stringify({ error: "Teacher not found" }), {
        headers: { "Content-Type": "application/json" },
        status: 404,
      });
    }

    // Return a success response when the teacher is deleted
    return new Response(
      JSON.stringify({ message: "Teacher deleted successfully!" }),
      {
        headers: { "Content-Type": "application/json" },
        status: 200,
      }
    );
  } catch (error) {
    // Catch any errors and return a 500 status with the error message
    return new Response(JSON.stringify({ error: error.message }), {
      headers: { "Content-Type": "application/json" },
      status: 500,
    });
  }
}
