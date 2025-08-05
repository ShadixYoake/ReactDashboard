import { createRequestHandler } from "@react-router/express";
import { drizzle } from "drizzle-orm/postgres-js";
import express from "express";
import postgres from "postgres";
import cookieParser from "cookie-parser";
import "react-router";
import cors from 'cors'
import dotenv from "dotenv";

import userRouter from "routes/userRoutes"
import fileRouter from "routes/fileRoutes"


import { DatabaseContext } from "~/database/context";
import * as schema from "~/database/schema";

declare module "react-router" {
  interface AppLoadContext {
    VALUE_FROM_EXPRESS: string;
  }
}

export const app = express();

const JWT_SECRET = process.env.JWT_SECRET;

if (!process.env.DATABASE_URL) throw new Error("DATABASE_URL is required");

const client = postgres(process.env.DATABASE_URL);
const db = drizzle(client, { schema });
app.use(express.json());
app.use(cookieParser(JWT_SECRET));
dotenv.config();
app.use((_, __, next) => DatabaseContext.run(db, next));

app.use("/api/user", userRouter)
app.use("/api/file", fileRouter)


app.use(
  createRequestHandler({
    build: () => import("virtual:react-router/server-build"),
    getLoadContext() {
      return {
        VALUE_FROM_EXPRESS: "Hello from Express",
      };
    },
  }),
);
