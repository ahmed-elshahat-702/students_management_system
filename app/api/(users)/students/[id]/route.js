import StudentModel from "../../../models/StudentModel";
import dbConnect from "../../../utils/dbConnect";

// GET Request Handler
export async function GET(request, { params }) {
  await dbConnect();
  try {
    const student = await StudentModel.findById(params.id);

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

// PUT Request Handler
export async function PUT(request, { params }) {
  await dbConnect();
  try {
    const formData = await request.formData();
    const studentData = Object.fromEntries(formData);

    const updatedStudent = await StudentModel.findByIdAndUpdate(
      params.id,
      studentData,
      { new: true }
    );

    if (!updatedStudent) {
      return new Response(JSON.stringify({ error: "Student not found" }), {
        headers: {
          "Content-Type": "application/json",
        },
        status: 404,
      });
    }

    return new Response(
      JSON.stringify({ message: "Student updated successfully!" }),
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

// DELETE Request Handler
export async function DELETE(request, { params }) {
  await dbConnect();
  try {
    const deletedStudent = await StudentModel.findByIdAndDelete(params.id);

    if (!deletedStudent) {
      return new Response(JSON.stringify({ error: "Student not found" }), {
        headers: {
          "Content-Type": "application/json",
        },
        status: 404,
      });
    }

    return new Response(
      JSON.stringify({ message: "Student deleted successfully" }),
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
