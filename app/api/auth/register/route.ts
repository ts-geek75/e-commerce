import { NextRequest, NextResponse } from "next/server";
import { query } from "@/lib/db";
import bcrypt from "bcrypt";

export const POST = async (req: NextRequest) => {
  const { username, email, password } = await req.json();

  if (!username || !email || !password)
    return NextResponse.json({ message: "All fields are required" }, { status: 400 });

  const hashedPassword = await bcrypt.hash(password, 10);

  try {
    const result = await query(
      `INSERT INTO users (username, email, password, isAdmin)
       VALUES ($1, $2, $3, $4)
       RETURNING uuid, username, email, isAdmin`,
      [username, email, hashedPassword, false]
    );

    return NextResponse.json({ user: result.rows[0] }, { status: 201 });
  } catch (error: any) {
    console.error("Signup error:", error);

    if (error.code === "23505") 
      return NextResponse.json({ message: "User already exists" }, { status: 400 });

    return NextResponse.json({ message: "Server error" }, { status: 500 });
  }
};
