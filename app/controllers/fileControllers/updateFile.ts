import { Router } from "express";
const router = Router();
import { users, logs } from "database/schema";
import { database } from "~/database/context";
import { genSaltSync, hashSync, compareSync } from "bcrypt-ts";

router.post("/", async (req, res) => {
  const salt = genSaltSync(10);
  const hash = hashSync(req.body.password, salt);
  const user = req.body;
  console.log("Received request to create user:", user);

  user.password = hash;

  const db = database();
  try {
    const userId = (await db
      .insert(users)
      .values(req.body)
      .returning({ id: users.id }))[0];

    res.json({ mensaje: `Usuario ${user.name} creado`, ok: true });
    console.log(`User created with ID: ${userId.id}`);
    
    const log = {
      category: "user_creation",
      userId: userId.id, 
      userName: user.name,
    };

    await db.insert(logs).values(log)

  } catch (error) {
    console.log("Error while creating user", error);
  }
});

export default router;
