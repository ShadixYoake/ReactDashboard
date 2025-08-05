import { Router } from "express"

import createFileRouter from "~/controllers/fileControllers/createFile";
import getFileRouter from "~/controllers/fileControllers/getFile";
import updateFileRouter from "~/controllers/fileControllers/updateFile";
import deleteFileRouter from "~/controllers/fileControllers/deleteFile";

const router = Router();

router.post("create", createFileRouter);
router.post("get", getFileRouter);
router.put("/", updateFileRouter);
router.delete("/", deleteFileRouter);

export default router