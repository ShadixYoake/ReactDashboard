import { Router } from "express";
import { users } from "database/schema";
import { sql } from "drizzle-orm";
import { database } from "~/database/context";
import { compare, compareSync } from "bcrypt-ts"
import { log } from "console";

const router = Router();

router.get("/", async (req, res) => {
  const loginData = req.body;
  console.log("Received request to get user:", loginData);


  const db = database();
  try {
    const dbLoginData =  await db.select(
      {email: users.email,
      password: users.password,
      }).from(users).where(sql`${users.email} = ${loginData.email}`);
    
      console.log("User found:", dbLoginData);
      const isPasswordCorrect = compareSync(loginData.password, dbLoginData[0].password)
      res.json({passwordComparision: isPasswordCorrect});

      log("Password comparison result:", compareSync(loginData.password, dbLoginData[0].password)); 


  } catch (error) {
    console.log("Error while login in the user", error);
  }
});


export default router;
