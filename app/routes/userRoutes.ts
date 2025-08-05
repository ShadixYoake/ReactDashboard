import { Router } from "express"

import createUserRouter from "~/controllers/userControllers/createUser";
import getUserRouter from "~/controllers/userControllers/getUser";
import updateUserRouter from "~/controllers/userControllers/updateUser";
import deleteUserRouter from "~/controllers/userControllers/deleteUser";

const router = Router();

router.post("/create", createUserRouter);
router.post("/get", getUserRouter);
router.get("/", getUserRouter);
router.put("/", updateUserRouter);
router.delete("/", deleteUserRouter);

export default router