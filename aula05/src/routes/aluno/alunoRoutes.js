import { AlunoController } from "../../controllers/aluno/AlunoController.js";
import express from "express";

const router = express.Router();

router.get("/", AlunoController.listarAlunos);
router.get("/email/:email", AlunoController.buscarAlunoPorEmail);
router.get("/matricula/:matricula", AlunoController.buscarAlunoPorMatricula);
router.get("/:id", AlunoController.buscarAlunoPorId);
router.post("/", AlunoController.criarAluno);
router.put("/:id", AlunoController.atualizarAluno);
router.delete("/:id", AlunoController.deletarAluno);

export default router;
