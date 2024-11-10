import type { NextApiRequest, NextApiResponse } from "next";
import jwt from "jsonwebtoken";
import { JWT_SECRET } from "@/constant";

type Data = {
  status: number;
  message: string;
  data?: any;
};

export default function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data>
) {
  try {
    const { auth } = req.query as { auth: string };
    if (!auth) {
      return res.status(401).json({ status: 401, message: "Unauthorized" });
    }

    jwt.verify(auth, JWT_SECRET, (err, decoded) => {
      if (err) {
        return res.status(401).json({ status: 401, message: "Unauthorized" });
      }
      return res
        .status(200)
        .json({ status: 200, message: "OK", data: decoded });
    });
  } catch (error) {
    return res.status(401).json({ status: 401, message: "Unauthorized" });
  }
}
