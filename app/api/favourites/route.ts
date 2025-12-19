import { NextRequest, NextResponse } from "next/server";

import { query } from "@/lib/db";
import { getUserIdFromRequest } from "@/lib/auth";

export const GET = async (req: NextRequest) => {
  try {
    const userId = getUserIdFromRequest(req);

    const result = await query(
      `SELECT p.*
       FROM favourites f
       JOIN products p ON p.uuid = f.product_uuid
       WHERE f.user_id = $1
       ORDER BY f.created_at DESC`,
      [userId]
    );

    return NextResponse.json(
      { products: result.rows },
      { status: 200 }
    );
  } catch (error) {
    return NextResponse.json(
      { message: "Unauthorized" },
      { status: 401 }
    );
  }
};

export const POST = async (req: NextRequest) => {
  try {
    const userId = getUserIdFromRequest(req);
    const { productUuid } = await req.json();

    if (!productUuid) {
      return NextResponse.json(
        { message: "Product UUID required" },
        { status: 400 }
      );
    }

    await query(
      `INSERT INTO favourites (user_id, product_uuid)
       VALUES ($1, $2)
       ON CONFLICT DO NOTHING`,
      [userId, productUuid]
    );

    return NextResponse.json(
      { message: "Added to favourites" },
      { status: 201 }
    );
  } catch (error) {
    return NextResponse.json(
      { message: "Unauthorized" },
      { status: 401 }
    );
  }
};

export const DELETE = async (req: NextRequest) => {
  try {
    const userId = getUserIdFromRequest(req);
    const { productUuid } = await req.json();

    await query(
      `DELETE FROM favourites
       WHERE user_id = $1 AND product_uuid = $2`,
      [userId, productUuid]
    );

    return NextResponse.json(
      { message: "Removed from favourites" },
      { status: 200 }
    );
  } catch (error) {
    return NextResponse.json(
      { message: "Unauthorized" },
      { status: 401 }
    );
  }
};
