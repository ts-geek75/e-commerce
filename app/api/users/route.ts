import { NextRequest, NextResponse } from "next/server";

import { query } from "@/lib/db";
import { getUserIdFromRequest } from "@/lib/auth";

export const GET = async (req: NextRequest) => {
  let userId: number;

  try {
    userId = getUserIdFromRequest(req);
  } catch (err) {
    return NextResponse.json(
      { message: "Unauthorized" },
      { status: 401 }
    );
  }

  try {
    const result = await query(
      `
      SELECT
        email,
        first_name,
        last_name,
        phone,
        address,
        city,
        postal_code,
        country
      FROM users
      WHERE uuid = $1
      `,
      [userId]
    );

    return NextResponse.json({ user: result.rows[0] });
  } catch {
    return NextResponse.json(
      { message: "Failed to fetch user details" },
      { status: 500 }
    );
  }
};

export const POST = async (req: NextRequest) => {
  let userId: number;

  try {
    userId = getUserIdFromRequest(req);
  } catch {
    return NextResponse.json(
      { message: "Unauthorized" },
      { status: 401 }
    );
  }

  const {
    firstName,
    lastName,
    phone,
    address,
    city,
    postalCode,
    country,
  } = await req.json();

  try {
    await query(
      `
      UPDATE users SET
        first_name = $1,
        last_name = $2,
        phone = $3,
        address = $4,
        city = $5,
        postal_code = $6,
        country = $7
      WHERE uuid = $8
      `,
      [
        firstName,
        lastName,
        phone,
        address,
        city,
        postalCode,
        country,
        userId,
      ]
    );

    return NextResponse.json({ success: true });
  } catch {
    return NextResponse.json(
      { message: "Failed to update user details" },
      { status: 500 }
    );
  }
};
