import { Router } from "express";
import { users } from "database/schema";
import { sql } from "drizzle-orm";
import { database } from "~/database/context";
import { compareSync } from "bcrypt-ts";
import { log } from "console";
import jwt from "jsonwebtoken";

const router = Router();
const JWT_SECRET = process.env.JWT_SECRET as string;
const JWT_EXPIRES_IN = process.env.JWT_EXPIRES_IN as string;

router.post("/get", async (req, res) => {
  const loginData = req.body;
  console.log("Received request to get user:", loginData);

  const db = database();
  try {
    const dbLoginData = (
      await db
        .select({
          name: users.name,
          lastName: users.lastName,
          secondLastName: users.secondLastName,
          email: users.email,
          password: users.password,
        })
        .from(users)
        .where(sql`${users.email} = ${loginData.email}`)
    )[0];

    const userTokenInfo = {
      name: dbLoginData.name,
      lastName: dbLoginData.lastName,
      secondLastName: dbLoginData.secondLastName,
      email: dbLoginData.email,
    };

    const time:number = Number(JWT_EXPIRES_IN);

    const token = jwt.sign(userTokenInfo, JWT_SECRET, {
      expiresIn: `${time} hour`,
    });

    res.cookie("token", token, {
      httpOnly: true, // 🔒 No accesible desde JS
      secure: true, // 🔐 Solo por HTTPS
      sameSite: "lax", // 🚧 Protege contra CSRF
      maxAge: 3600000, // ⏱️ 1 hora
    });
    
    const isPasswordCorrect = compareSync(
      loginData.password,
      dbLoginData.password
    );

    res.json({ passwordComparision: isPasswordCorrect });

    log(
      "Password comparison result:",
      compareSync(loginData.password, dbLoginData.password)
    );
  } catch (error) {
    console.log("Error while login in the user", error);
  }
});

router.get("/", async (req, res) => {
  const cookieData = req.cookies;

  try {
    jwt.verify(cookieData.token, JWT_SECRET);
    console.log(jwt.verify(cookieData.token, JWT_SECRET));
    console.log(cookieData.token);
    res.status(200).json({ ok: true });
  } catch (error) {
    if ((error = "JsonWebTokenError: invalid signature")) {
      console.log("token invalido");
    } else {
      console.log(error);
    }
    res.status(401);
  }

  /*
  const db = database();
  try {
    const dbLoginData =  await db.select(
      {email: users.email,
      password: users.password,
      }).from(users).where(sql`${users.email} = ${cookieData.email}`);
    
      console.log("User found:", dbLoginData);
      const isPasswordCorrect = compareSync(cookieData.password, dbLoginData[0].password)
      res.json({passwordComparision: isPasswordCorrect});

      log("Password comparison result:", compareSync(cookieData.password, dbLoginData[0].password)); 


  } catch (error) {
    console.log("Error while login in the user", error);
  }
    */
});

export default router;
