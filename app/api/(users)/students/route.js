import StudentModel from "../../models/StudentModel";
import dbConnect from "../../utils/dbConnect";

export async function GET() {
  await dbConnect();

  try {
    const students = await StudentModel.find();

    // If no students are found, return a successful response with an empty array
    if (students.length === 0) {
      return new Response(
        JSON.stringify({ message: "No students found", students: [] }),
        {
          headers: {
            "Content-Type": "application/json",
          },
          status: 200,
        }
      );
    }

    // Return the list of students
    return new Response(JSON.stringify({ students }), {
      headers: {
        "Content-Type": "application/json",
      },
      status: 200,
    });
  } catch (error) {
    // Return a 500 status in case of a server error
    return new Response(JSON.stringify({ error: error.message }), {
      headers: {
        "Content-Type": "application/json",
      },
      status: 500,
    });
  }
}

export async function POST(request) {
  await dbConnect();
  try {
    const studentData = await request.formData();
    const studentDataObject = Object.fromEntries(studentData);
    const avatar = studentDataObject.avatar;

    const existingStudent = await StudentModel.findOne({
      username: studentDataObject.username,
    });

    if (existingStudent) {
      return new Response(JSON.stringify({ error: "Student already exists" }), {
        headers: {
          "Content-Type": "application/json",
        },
        status: 400,
      });
    }

    const newStudent = new StudentModel({
      ...studentDataObject,
      avatar: avatar || undefined, // only set avatar if it exists
    });
    await newStudent.save();

    return new Response(
      JSON.stringify({ message: "Student added successfully" }),
      {
        headers: {
          "Content-Type": "application/json",
        },
        status: 201,
      }
    );
  } catch (error) {
    return new Response(JSON.stringify({ error: error.message }), {
      headers: {
        "Content-Type": "application/json",
      },
      status: 500,
    });
  }
}
