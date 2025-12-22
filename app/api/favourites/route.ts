import { NextRequest, NextResponse } from "next/server";
import { query } from "@/lib/db";
import { getUserIdFromRequest } from "@/lib/auth";

export const GET = async (req: NextRequest) => {
  let userId: number;

  try {
    userId = getUserIdFromRequest(req);
    console.log("USER ID:", userId);
  } catch (err) {
    return NextResponse.json(
      { message: (err as Error).message },
      { status: 401 }
    );
  }

  try {
    const result = await query(
      `
  SELECT 
    f.product_uuid,
    p.name,
    p.price,
	  p.image_url,
	  p.category
    FROM favourites f
    JOIN users u ON f.user_id = u.uuid
    JOIN products p ON f.product_uuid = p.uuid
    WHERE u.uuid = $1
      `,
      [userId]
    );

    return NextResponse.json(
      { products: result.rows },
      { status: 200 }
    );
  } catch (err) {
    console.error("FAVOURITES GET ERROR:", err);
    return NextResponse.json(
      { message: "Failed to fetch favourites" },
      { status: 500 }
    );
  }
};


export const POST = async (req: NextRequest) => {
  let userId: number;

  try {
    userId = getUserIdFromRequest(req);
  } catch (err) {
    return NextResponse.json(
      { message: (err as Error).message },
      { status: 401 }
    );
  }

  let productUuid: string;

  try {
    const body = await req.json();
    productUuid = body.productUuid;
  } catch {
    return NextResponse.json(
      { message: "Invalid JSON body" },
      { status: 400 }
    );
  }

  if (!productUuid) {
    return NextResponse.json(
      { message: "Product UUID required" },
      { status: 400 }
    );
  }

  try {
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
  } catch {
    return NextResponse.json(
      { message: "Failed to add favourite" },
      { status: 500 }
    );
  }
};

export const DELETE = async (req: NextRequest) => {
  let userId: number;

  try {
    userId = getUserIdFromRequest(req);
  } catch (err) {
    return NextResponse.json(
      { message: (err as Error).message },
      { status: 401 }
    );
  }

  let productUuid: string;

  try {
    const body = await req.json();
    productUuid = body.productUuid;
  } catch {
    return NextResponse.json(
      { message: "Invalid JSON body" },
      { status: 400 }
    );
  }

  if (!productUuid) {
    return NextResponse.json(
      { message: "Product UUID required" },
      { status: 400 }
    );
  }

  try {
    await query(
      `DELETE FROM favourites
       WHERE user_id = $1 AND product_uuid = $2`,
      [userId, productUuid]
    );

    return NextResponse.json(
      { message: "Removed from favourites" },
      { status: 200 }
    );
  } catch {
    return NextResponse.json(
      { message: "Failed to remove favourite" },
      { status: 500 }
    );
  }
};
