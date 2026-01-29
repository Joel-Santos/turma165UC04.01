import { UsuarioController } from "../controllers/UsuarioController.js";
import express from "express";

const router = express.Router();


router.get("/", UsuarioController.listarUsuarios);
router.post("/", UsuarioController.criarUsuario);


export default router;