import { Router } from "express";
const router = Router();
import { files, logs } from "database/schema";
import { database } from "database/context";
import multer from "multer";
const upload = multer({ dest: 'files/' })


router.post("/", upload.single('jsonFile'), async (req, res) => {
  const file = req.body;

  
  console.log("Received request to create file:", file);
  
  
  const db = database();
  try {
    const fileId = (await db
      .insert(files)
      .values(req.body)
      .returning({ id: files.id }))[0];

    res.json({ mensaje: `Archivo ${file.name} creado`, ok: true });
    console.log(`file created with ID: ${fileId.id}`);
    
    const log = {
      category: "file_creation",
      fileId: fileId.id, 
      userName: file.name,
    };

    await db.insert(logs).values(log)

  } catch (error) {
    console.log("Error while creating file", error);
  }
});

export default router;
