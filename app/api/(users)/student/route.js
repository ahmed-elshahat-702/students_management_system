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

// POST Request Handler
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

// DELETE Request Handler
export async function DELETE(request) {
  await dbConnect();
  try {
    const url = new URL(request.url);
    const username = url.searchParams.get("username");

    const deletedStudent = await StudentModel.findOneAndDelete({
      username,
    });

    if (!deletedStudent) {
      return new Response(JSON.stringify({ error: "Student not found" }), {
        headers: {
          "Content-Type": "application/json",
        },
        status: 404,
      });
    }

    return new Response(
      JSON.stringify({ message: "Student deleted successfully!" }),
      {
        headers: {
          "Content-Type": "application/json",
        },
        status: 200,
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
