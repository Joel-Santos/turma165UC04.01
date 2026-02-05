import { UsuarioController } from "../controllers/UsuarioController.js";
import { autenticarToken } from "../middlewares/authMiddleware.js";
import express from "express";

const router = express.Router();

//Rotas publicas
router.get("/login", UsuarioController.paginaLogin);
router.post("/", UsuarioController.criarUsuario);
router.post("/login", UsuarioController.loginUsuario);


//Rotas privadas
router.get("/", autenticarToken, UsuarioController.listarUsuarios);

router.get("/:id", autenticarToken, UsuarioController.buscarPorId);

router.delete("/:id", autenticarToken, UsuarioController.deletarUser);

router.put("/:id", autenticarToken, UsuarioController.atualizarUsuario);

router.patch("/:id", autenticarToken, UsuarioController.atualizarParcialmente);


export default router;