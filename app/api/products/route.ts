import { NextRequest, NextResponse } from "next/server";
import { query } from "@/lib/db";

export const GET = async (req: NextRequest) => {
  try {
    const { searchParams } = new URL(req.url);
    const uuid = searchParams.get("id"); 
    const search = searchParams.get("search");

    if (uuid) {
      const result = await query(
        "SELECT * FROM products WHERE uuid = $1",
        [uuid]  
      );

      return NextResponse.json(
        { product: result.rows[0] || null },
        { status: 200 }
      );
    }

    if (search) {
      const result = await query(
        `SELECT * FROM products
         WHERE name ILIKE $1 OR category ILIKE $1 OR description ILIKE $1
         ORDER BY created_at DESC`,
        [`%${search}%`]
      );

      return NextResponse.json(
        { products: result.rows },
        { status: 200 }
      );
    }

    const categories = searchParams.getAll("category");
    const materials = searchParams.getAll("material");
    const prices = searchParams.getAll("price");

    const conditions: string[] = [];
    const values: (string | number | string[])[] = [];

    if (categories.length) {
      values.push(categories);
      conditions.push(`category = ANY($${values.length})`);
    }

    if (materials.length) {
      values.push(materials);
      conditions.push(`material = ANY($${values.length})`);
    }

    if (prices.length) {
      const priceConditions = prices.map((range) => {
        const [min, max] = range.split("-").map(Number);
        values.push(min, max);
        return `(price BETWEEN $${values.length - 1} AND $${values.length})`;
      });
      conditions.push(`(${priceConditions.join(" OR ")})`);
    }

    const whereClause = conditions.length
      ? `WHERE ${conditions.join(" AND ")}`
      : "";

    const result = await query(
      `SELECT * FROM products ${whereClause} ORDER BY created_at DESC`,
      values
    );

    return NextResponse.json(
      { products: result.rows },
      { status: 200 }
    );
  } catch (error: any) {
    console.error("GET /products error:", error);
    return NextResponse.json(
      { message: "Server error" },
      { status: 500 }
    );
  }
};
