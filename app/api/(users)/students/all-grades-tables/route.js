import GradesModel from "@/app/api/models/GradesModel";
import dbConnect from "@/app/api/utils/dbConnect";

export async function GET() {
  await dbConnect();

  try {
    const grades = await GradesModel.find();

    // Return an empty array if no grades are found, with a 200 status
    if (grades.length === 0) {
      return new Response(
        JSON.stringify({ message: "No grades found", grades: [] }),
        {
          headers: {
            "Content-Type": "application/json",
          },
          status: 200,
        }
      );
    }

    // Return the list of grades
    return new Response(JSON.stringify({ grades }), {
      headers: {
        "Content-Type": "application/json",
      },
      status: 200,
    });
  } catch (error) {
    // Return a 500 status in case of an error
    return new Response(JSON.stringify({ error: error.message }), {
      headers: {
        "Content-Type": "application/json",
      },
      status: 500,
    });
  }
}
