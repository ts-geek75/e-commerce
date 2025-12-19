import { NextRequest, NextResponse } from "next/server";
import { query } from "@/lib/db";
import { getUserIdFromRequest } from "@/lib/auth";

export const GET = async (req: NextRequest) => {
  try {
    const userId = getUserIdFromRequest(req);

    await query(
      `INSERT INTO carts (user_id)
       VALUES ($1)
       ON CONFLICT (user_id) DO NOTHING`,
      [userId]
    );

    const { rows } = await query(
      `
      SELECT
        p.uuid AS id,
        p.name,
        p.category,
        p.price,
        p.image_url,
        ci.quantity
      FROM carts c
      JOIN cart_items ci ON ci.cart_id = c.id
      JOIN products p ON p.uuid = ci.product_id
      WHERE c.user_id = $1
      `,
      [userId]
    );

    return NextResponse.json({ cartItems: rows }, { status: 200 });
  } catch (error: any) {
    console.error("GET /api/cart error:", error);
    return NextResponse.json(
      { message: error.message || "Internal server error" },
      { status: 500 }
    );
  }
};

export const POST = async (req: NextRequest) => {
  try {
    const userId = getUserIdFromRequest(req);
    const { productId, quantity } = await req.json();

    if (!productId || !quantity) {
      return NextResponse.json({ message: "Invalid data" }, { status: 400 });
    }

    await query(
      `INSERT INTO carts (user_id)
       VALUES ($1)
       ON CONFLICT (user_id) DO NOTHING`,
      [userId]
    );

    await query(
      `INSERT INTO cart_items (cart_id, product_id, quantity)
       VALUES (
         (SELECT id FROM carts WHERE user_id = $1),
         $2,
         $3
       )
       ON CONFLICT (cart_id, product_id)
       DO UPDATE SET quantity = EXCLUDED.quantity`,
      [userId, productId, quantity]
    );

    return NextResponse.json({ success: true }, { status: 200 });
  } catch (error: any) {
    console.error("POST /api/cart/items error:", error);
    return NextResponse.json({ message: error.message || "Server error" }, { status: 500 });
  }
};


export const DELETE = async (req: NextRequest) => {
  try {
    const userId = getUserIdFromRequest(req);
    const { productId } = await req.json();

    if (!productId) {
      return NextResponse.json({ message: "productId required" }, { status: 400 });
    }

    await query(
      `DELETE FROM cart_items
       WHERE cart_id = (SELECT id FROM carts WHERE user_id = $1)
       AND product_id = $2`,
      [userId, productId]
    );

    return NextResponse.json({ success: true }, { status: 200 });
  } catch (error: any) {
    console.error("DELETE /api/cart/items error:", error);
    return NextResponse.json({ message: error.message || "Server error" }, { status: 500 });
  }
};
