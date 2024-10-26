import { cookies } from "next/headers";
import StudentModel from "../models/StudentModel";
import TeacherModel from "../models/TeacherModel";
import ModeratorModel from "../models/ModeratorModel";
import dbConnect from "../utils/dbConnect";
import jwt from "jsonwebtoken";

export async function POST(request, response) {
  await dbConnect();
  const cookieStore = cookies();
  const jwtSecret = process.env.NEXT_PUBLIC_JWT_SECRET;

  try {
    const { username, password, role } = await request.json();

    let user;

    // Find user based on role
    switch (role) {
      case "student":
        user = await StudentModel.findOne({ username });
        break;
      case "teacher":
        user = await TeacherModel.findOne({ username });
        break;
      case "moderator":
        user = await ModeratorModel.findOne({ username });
        break;
      default:
        return new Response(JSON.stringify({ error: "Invalid role" }), {
          headers: { "Content-Type": "application/json" },
          status: 400,
        });
    }

    if (!user) {
      return new Response(JSON.stringify({ error: "User not found" }), {
        headers: { "Content-Type": "application/json" },
        status: 400,
      });
    }

    // Check if the password is correct using bcrypt
    const isPasswordValid = password === user.password;

    if (!isPasswordValid) {
      return new Response(
        JSON.stringify({ error: "Wrong username or password" }),
        {
          headers: { "Content-Type": "application/json" },
          status: 400,
        }
      );
    }

    // Generate JWT token
    const token = jwt.sign(
      { username, role, avatar: user.avatar, level: user.level },
      jwtSecret,
      { expiresIn: "1d" }
    );

    // Set the cookie with the token
    cookieStore.set("token", token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production", // Secure in production
      sameSite: "strict",
      maxAge: 24 * 60 * 60, // 1 day
      path: "/",
    });

    // Return the user data minus the password
    const { password: _, ...userData } = user._doc; // exclude password
    return new Response(JSON.stringify({ user: userData }), {
      headers: { "Content-Type": "application/json" },
      status: 200,
    });
  } catch (error) {
    return new Response(JSON.stringify({ error: error.message }), {
      headers: { "Content-Type": "application/json" },
      status: 500,
    });
  }
}
