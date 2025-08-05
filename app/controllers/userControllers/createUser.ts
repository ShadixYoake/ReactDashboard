import { Router } from "express";
const router = Router();
import jwt from "jsonwebtoken";
import { users, logs } from "database/schema";
import { database } from "~/database/context";
import { genSaltSync, hashSync, compareSync } from "bcrypt-ts";

router.post("/create", async (req, res) => {
  const JWT_SECRET = process.env.JWT_SECRET as string;
  const JWT_EXPIRES_IN = process.env.JWT_EXPIRES_IN as string;
  const salt = genSaltSync(10);
  const hash = hashSync(req.body.password, salt);
  const user = req.body;

  console.log("Received request to create user:", user);

  user.password = hash;

  const db = database();
  try {
    const userId = (
      await db.insert(users).values(req.body).returning({ id: users.id })
    )[0];

    const log = {
      category: "user_creation",
      userId: userId.id,
      userName: user.name,
    };

    const userTokenInfo = {
      name: user.name,
      lastName: user.lastName,
      secondLastName: user.secondLastName,
      email: user.email,
    };

    const time: number = Number(JWT_EXPIRES_IN);

    const token = jwt.sign(userTokenInfo, JWT_SECRET, {
      expiresIn: `${time} hour`,
    });
    await db.insert(logs).values(log);

    res.cookie("token", token, {
      httpOnly: true, // 🔒 No accesible desde JS
      secure: true, // 🔐 Solo por HTTPS
      sameSite: "lax", // 🚧 Protege contra CSRF
      maxAge: 3600, // ⏱️ 1 hora
    });

    res.json(token);
  } catch (error) {
    console.log("Error while creating user", error);
    res.status(409)
  }
});

export default router;
