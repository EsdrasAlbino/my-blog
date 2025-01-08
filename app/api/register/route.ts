import { prismaInstance } from "@/lib/prismaClient";
import bcrypt from "bcrypt";
import { check, validationResult } from "express-validator";
import { NextApiRequest, NextApiResponse } from "next";
import initMiddleware from "../../../lib/init-middleware";
import validateMiddleware from "../../../lib/validation-middleware";

const validateBody = initMiddleware(
  validateMiddleware(
    [
      check("first_name").isLength({ min: 1, max: 40 }),
      check("day").isInt({ min: 1, max: 31 }),
      check("gender").isIn(["male", "female"]),
      check("mobile_phone").isMobilePhone(["th-TH"]),
      check("boolean").isBoolean(),
    ],
    validationResult
  )
);

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method !== "POST") {
    return res.status(405).json({ msg: "Method not allowed" });
  }

  await validateBody(req, res);

  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  const { username, email, password } = req.body;

  try {
    const existUser = await prismaInstance.user.findUnique({ where: { email } });
    if (existUser) {
      return res.status(400).json({ msg: "User already exists" });
    }

    const salt = await bcrypt.genSalt(10);
    const hashPassword = await bcrypt.hash(password, salt);

    const newUser = await prismaInstance.user.create({
        data: {
            username,
            email,
            password: hashPassword,
        },
    })

    res.status(201).json({ msg: "User registered successfully", user: newUser });
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server error");
  }
}
