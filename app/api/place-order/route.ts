import { NextRequest, NextResponse } from "next/server";
import { pool } from "@/lib/db";
import { getUserIdFromRequest } from "@/lib/auth";

export const POST = async (req: NextRequest) => {
  const userId = getUserIdFromRequest(req);
  const client = await pool.connect();

  try {
    await client.query("BEGIN");

    const cartItemsResult = await client.query(
      `
      SELECT
        ci.product_id,
        ci.quantity,
        p.stock
      FROM carts c
      JOIN cart_items ci ON c.id = ci.cart_id
      JOIN products p ON p.uuid = ci.product_id
      WHERE c.user_id = $1
      FOR UPDATE
      `,
      [userId]
    );

    if (cartItemsResult.rowCount === 0) {
      throw new Error("Cart is empty");
    }

    for (const item of cartItemsResult.rows) {
      if (item.stock < item.quantity) {
        throw new Error("Insufficient stock");
      }

      await client.query(
        `
        UPDATE products
        SET stock = stock - $1
        WHERE uuid = $2
        `,
        [item.quantity, item.product_id]
      );
    }

    await client.query(
      `
      DELETE FROM cart_items
      WHERE cart_id = (
        SELECT id FROM carts WHERE user_id = $1
      )
      `,
      [userId]
    );

    await client.query("COMMIT");

    return NextResponse.json({ success: true });
  } catch (error) {
    await client.query("ROLLBACK");

    return NextResponse.json(
      { message: (error as Error).message },
      { status: 400 }
    );
  } finally {
    client.release();
  }
};
