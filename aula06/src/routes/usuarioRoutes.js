import { UsuarioController } from "../controllers/UsuarioController.js";
import express from "express";


const router = express.Router();


router.get("/", UsuarioController.listarUsuarios);
router.post("/", UsuarioController.criarUsuario);
router.get("/:id", UsuarioController.buscarPorId);
router.put("/:id", UsuarioController.atualizarUsuario);
router.delete("/:id", UsuarioController.deletarUsuario);


export default router;