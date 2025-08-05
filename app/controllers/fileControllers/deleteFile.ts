import { Router } from "express";
const router = Router();
import { users, logs } from "database/schema";
import { database } from "~/database/context";
import { genSaltSync, hashSync, compareSync } from "bcrypt-ts";

router.post("/", async (req, res) => {
  const salt = genSaltSync(10);
  const hash = hashSync(req.body.password, salt);
  const file = req.body;

  file.password = hash;

  const db = database();
  try {
    const fileId = (await db
      .insert(users)
      .values(req.body)
      .returning({ id: users.id }))[0];

    res.json({ mensaje: `Usuario ${file.name} creado`, ok: true });
    console.log(`User created with ID: ${fileId.id}`);
    
    const log = {
      category: "user_creation",
      fileId: fileId.id, 
      userName: file.name,
    };

    await db.insert(logs).values(log)

  } catch (error) {
    console.log("Error while creating file", error);
  }
});

export default router;
