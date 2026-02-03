import { UsuarioController } from "../controllers/UsuarioController.js";
import express from "express";

const router = express.Router();

router.get("/", UsuarioController.listarUsuarios);

router.post("/", UsuarioController.criarUsuario);

router.post("/login", UsuarioController.loginUsuario);

router.get("/:id", UsuarioController.buscarPorId);

router.delete("/:id", UsuarioController.deletarUser);

router.put("/:id", UsuarioController.atualizarUsuario);

router.patch("/:id", UsuarioController.atualizarParcialmente);


export default router;