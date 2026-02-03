import { UsuarioModel } from "../models/UsuarioModel.js";
import bcrypt from "bcrypt";
import { v4 as uuidv4 } from "uuid";


export class UsuarioController {
    static listarUsuarios(req, res) {
        try {
            const usuarios = UsuarioModel.listarUsuarios();
            if (!usuarios || usuarios.length === 0) {
                res.status(404).json({ msg: "Nenhum usuário cadastrado!" });
            }
            res.status(200).json({ msg: "Usuários encontrados", usuarios });
        } catch (error) {
            res.status(500).json({ msg: "Erro interno ao listar usuários", erro: error.message });
        }
    }

    static async criarUsuario(req, res) {
        try {
            const { nome, email, senha } = req.body;
            if (!nome || !email || !senha) {
                res.status(400).json({ msg: "Todos os campos devem ser preenchidos" });
                return;
            }
            const senhaHash = await bcrypt.hash(senha, parseInt(process.env.SALT));
            const novoUsuario = {
                id: uuidv4(),
                nome: nome,
                email: email,
                senha: senhaHash
            }
            const usuarioCriado = UsuarioModel.criarUsuario(novoUsuario);
            if (usuarioCriado) {
                res.status(201).json({ msg: "Usuário criado com sucesso!", usuarioCriado });
                return;
            }
        } catch (error) {
            res.status(500).json({ msg: "Erro interno ao criar usuário", erro: error.message });
        }
    }

    static async loginUsuario(req, res) {
        try {
            const { email, senha } = req.body;
            if (!email || !senha) {
                res.status(400).json({ msg: "Todos devem ser preenchidos" });
                return;
            }
            const usuario = UsuarioModel.listarUsuarios().find(u => u.email === email);
            if (!usuario) {
                res.status(400).json({ msg: "Email ou senha inválidos." });
                return;
            }
            const senhaValida = await bcrypt.compare(senha, usuario.senha);
            if (!senhaValida) {
                res.status(400).json({ msg: "Email ou senha inválidos." });
                return;
            }
            res.status(200).json({msg: "Login realizado com sucesso!", usuario: usuario.nome});
        } catch (error) {
            res.status(500).json({msg: "Erro interno ao realizar o login", erro: error.message});
        }
    }



}