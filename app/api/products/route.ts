import { NextRequest, NextResponse } from "next/server";
import { query } from "@/lib/db";

export const GET = async (req: NextRequest) => {
  try {
    const { searchParams } = new URL(req.url);
    const category = searchParams.get("category");

    let sql = "SELECT * FROM products";
    const params: any[] = [];

    if (category) {
      sql += " WHERE category = $1";
      params.push(category);
    }

    sql += " ORDER BY created_at DESC";

    const result = await query(sql, params);

    return NextResponse.json({ products: result.rows }, { status: 200 });
  } catch (error) {
    return NextResponse.json({ message: "Server error" }, { status: 500 });
  }
};

export const POST = async (req: NextRequest) => {
  const { name, description, price, category, image_url, stock } = await req.json();

  if (!name || !price || !category || !image_url) {
    return NextResponse.json({ message: "Missing required fields" }, { status: 400 });
  }

  try {
    const result = await query(
      `INSERT INTO products
       (name, description, price, category, image_url, stock)
       VALUES ($1, $2, $3, $4, $5, $6)
       RETURNING *`,
      [name, description, price, category, image_url, stock || 0]
    );

    return NextResponse.json({ product: result.rows[0] }, { status: 201 });
  } catch (error) {
    return NextResponse.json({ message: "Server error" }, { status: 500 });
  }
};
