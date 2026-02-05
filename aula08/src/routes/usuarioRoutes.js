import { UsuarioController } from "../controllers/UsuarioController.js";
import { autenticarToken } from "../middlewares/authMiddleware.js";
import { autorizarPapeis } from "../middlewares/autorizarPapeis.js";
import express from "express";

const router = express.Router();

//Rotas publicas
router.get("/login", UsuarioController.paginaLogin);
router.post("/", UsuarioController.criarUsuario);
router.post("/login", UsuarioController.loginUsuario);


//Rotas privadas
router.get("/", autenticarToken, autorizarPapeis("ADMIN"), UsuarioController.listarUsuarios);

router.post("/admin/user", autorizarPapeis("ADMIN"), UsuarioController.criarUsuarioPorAdmin);

router.get("/:id", autenticarToken, autorizarPapeis("ADMIN", "MOD"), UsuarioController.buscarPorId);

router.delete("/:id", autenticarToken, autorizarPapeis("ADMIN", "MOD"),UsuarioController.deletarUser);

router.put("/:id", autenticarToken, UsuarioController.atualizarUsuario);

router.patch("/:id", autenticarToken, UsuarioController.atualizarParcialmente);


export default router;