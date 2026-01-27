import { CursoController } from "../../controllers/curso/CursoController.js";
import express from "express";

const router = express.Router();

router.get("/", CursoController.listarCursos);

router.get("/:id", CursoController.buscarCursoPorId);


export default router;