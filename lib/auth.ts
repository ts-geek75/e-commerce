import { NextRequest } from "next/server";
import jwt from "jsonwebtoken";

const SECRET = process.env.JWT_SECRET || "1234LABDHI5678";

export const getUserIdFromRequest = (req: NextRequest): number => {
  const authHeader = req.headers.get("authorization");
  if (!authHeader) throw new Error("Authorization header missing");

  const token = authHeader.split(" ")[1];
  if (!token) throw new Error("Bearer token missing");

  const payload = jwt.verify(token, SECRET) as { id: number };
  return payload.id;
};
