// /pages/api/login.js
import { cookies } from "next/headers";
import StudentModel from "../models/StudentModel";
import TeacherModel from "../models/TeacherModel";
import ModeratorModel from "../models/ModeratorModel";
import dbConnect from "../utils/dbConnect";
import jwt from "jsonwebtoken";
import bcrypt from "bcryptjs";

export async function POST(request, response) {
  await dbConnect();
  const cookieStore = cookies();
  const jwtSecret = process.env.NEXT_PUBLIC_JWT_SECRET;
  console.log(jwtSecret);

  try {
    const { username, password, role } = await request.json();

    let user;
    let isPasswordValid;
    if (role === "student") {
      user = await StudentModel.findOne({ username });
      if (user) {
        isPasswordValid = password === user.password;
      }
    }
    if (role === "teacher") {
      user = await TeacherModel.findOne({ username });
      if (user) {
        isPasswordValid = password === user.password;
      }
    }
    if (role === "moderator") {
      user = await ModeratorModel.findOne({ username });
      if (user) {
        isPasswordValid = password === user.password;
      }
    }

    if (user) {
      if (isPasswordValid) {
        // Generate JWT
        const token = jwt.sign(
          { username, password, role, avatar: user.avatar, level: user.level },
          jwtSecret,
          {
            expiresIn: "1d",
          }
        );
        cookieStore.set("token", token);

        // Respond with user data (minus sensitive info)
        return new Response(JSON.stringify({ user: user }), {
          headers: {
            "Content-Type": "application/json",
          },
          status: 200,
        });
      } else {
        return new Response(
          JSON.stringify({ error: "Wrong username or password" }),
          {
            headers: {
              "Content-Type": "application/json",
            },
            status: 400,
          }
        );
      }
    } else {
      return new Response(JSON.stringify({ error: "User not found" }), {
        headers: {
          "Content-Type": "application/json",
        },
        status: 400,
      });
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
