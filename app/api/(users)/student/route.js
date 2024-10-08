import StudentModel from "../../models/StudentModel";
import dbConnect from "../../utils/dbConnect";

export async function GET(request, response) {
  await dbConnect();
  try {
    const url = new URL(request.url);
    const username = url.searchParams.get("username");

    const student = await StudentModel.findOne({
      username: username,
    });
    return new Response(JSON.stringify({ student: student }), {
      status: 200,
    });
  } catch (error) {
    return new Response(JSON.stringify({ error: error.message }), {
      status: 500,
    });
  }
}

export async function POST(request, response) {
  await dbConnect();
  try {
    const StudentData = await request.formData();
    const StudentDataObject = Object.fromEntries(StudentData);
    const avatar = StudentDataObject.avatar;
    const student = await StudentModel.findOne({
      username: StudentDataObject.username,
    });
    if (student) {
      return new Response(JSON.stringify({ error: "Student already exists" }), {
        headers: {
          "Content-Type": "application/json",
        },
        status: 400,
      });
    } else {
      if (avatar) {
        const newStudent = new StudentModel({
          ...StudentDataObject,
          avatar: avatar,
        });
        await newStudent.save();
      } else {
        const newStudent = new StudentModel(StudentDataObject);
        await newStudent.save();
      }

      return new Response(
        JSON.stringify({ message: "Student added successfully" }),
        {
          headers: {
            "Content-Type": "application/json",
          },
          status: 201,
        }
      );
    }
  } catch (error) {
    return new Response(JSON.stringify({ error: error.message }), {
      headers: {
        "Content-Type": "application/json",
      },
      status: 500,
    });
  }
}

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
        status: 404,
      });
    }

    return new Response(
      JSON.stringify({ message: "Student deleted successfully!" }),
      { status: 200 }
    );
  } catch (error) {
    return new Response(JSON.stringify({ error: error.message }), {
      status: 500,
    });
  }
}
