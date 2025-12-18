import { NextRequest, NextResponse } from "next/server";

import { query } from "@/lib/db";

export const GET = async (req: NextRequest) => {
  try {
    const { searchParams } = new URL(req.url);

    const id = searchParams.get("id");
    const category = searchParams.get("category");

    if (id) {
      const result = await query(
        "SELECT * FROM products WHERE id = $1",
        [Number(id)]
      );

      return NextResponse.json(
        { product: result.rows[0] || null },
        { status: 200 }
      );
    }

    if (category) {
      const result = await query(
        "SELECT * FROM products WHERE category = $1 ORDER BY created_at DESC",
        [category]
      );

      return NextResponse.json(
        { products: result.rows },
        { status: 200 }
      );
    }

    const result = await query(
      "SELECT * FROM products ORDER BY created_at DESC",
      []
    );

    return NextResponse.json(
      { products: result.rows },
      { status: 200 }
    );
  } catch {
    return NextResponse.json(
      { message: "Server error" },
      { status: 500 }
    );
  }
};

export const POST = async (req: NextRequest) => {
  try {
    const {
      name,
      description,
      price,
      category,
      image_url,
      stock,
    } = await req.json();

    if (!name || !price || !category || !image_url) {
      return NextResponse.json(
        { message: "Missing required fields" },
        { status: 400 }
      );
    }

    const result = await query(
      `INSERT INTO products
       (name, description, price, category, image_url, stock)
       VALUES ($1, $2, $3, $4, $5, $6)
       RETURNING *`,
      [
        name,
        description || "",
        price,
        category,
        image_url,
        stock || 0,
      ]
    );

    return NextResponse.json(
      { product: result.rows[0] },
      { status: 201 }
    );
  } catch {
    return NextResponse.json(
      { message: "Server error" },
      { status: 500 }
    );
  }
};
