import { NextRequest, NextResponse } from "next/server";
import { query } from "@/lib/db";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

export const POST = async (req: NextRequest) => {
  const { email, password } = await req.json();

  if (!email || !password)
    return NextResponse.json({ message: "All fields are required" }, { status: 400 });

  try {
    const result = await query("SELECT * FROM users WHERE email = $1", [email]);
    const user = result.rows[0];
    if (!user)
      return NextResponse.json({ message: "Invalid credentials" }, { status: 401 });

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch)
      return NextResponse.json({ message: "Invalid credentials" }, { status: 401 });

    const token = jwt.sign(
      {
        id: user.uuid,  
        isAdmin: user.isadmin,    
      },
      process.env.JWT_SECRET!,
      { expiresIn: "1h" }
    );

    return NextResponse.json(
      {
        token,
        user: {
          id: user.uuid,
          username: user.username,
          email: user.email,
          isadmin: user.isadmin,
        },
      },
      { status: 200 }
    );
  } catch (error: any) {
    console.error("Login error:", error);
    return NextResponse.json({ message: "Server error" }, { status: 500 });
  }
};
