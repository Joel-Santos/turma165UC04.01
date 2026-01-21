import express from "express";
import { UsuarioController } from "../../controllers/usuario/UsuarioController.js";

const router = express.Router();

//Rota para listar todos os usuários
router.get("/", UsuarioController.listarUsuarios);

//Rota para buscar um usuário por id
router.get("/:id", UsuarioController.buscarPorId);

//Rota para criar um novo usuário
router.post("/", UsuarioController.criarUsuario);

//Rota para atualizar um usuário
router.put("/:id", UsuarioController.atualizarUsuario);

//Rota para deletar um usuário
router.delete("/:id", UsuarioController.deletarUsuario);

export default router;
