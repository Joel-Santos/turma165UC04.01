import express from "express";
import { UsuarioController } from "../../controllers/usuario/UsuarioController.js";

const router = express.Router();

//Rota para listar todos os usuários
router.get("/", UsuarioController.listarUsuarios);

//Rota para buscar um usuário por id
router.get("/:id", UsuarioController.buscarPorId);


export default router;
