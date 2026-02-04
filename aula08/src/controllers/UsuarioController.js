import { UsuarioModel } from "../models/UsuarioModel.js";
import bcrypt from "bcrypt";
import { v4 as uuidv4 } from "uuid";
import jwt from "jsonwebtoken";


export class UsuarioController {
    static listarUsuarios(req, res) {
        try {
            const usuario = req.usuario;
            const usuarios = UsuarioModel.listarUsuarios();
            if (!usuarios || usuarios.length === 0) {
                res.status(404).json({ msg: "Nenhum usuário cadastrado!" });
            }
            res.status(200).json({ msg: "Usuários encontrados", solicitante: usuario.nome, usuarios});
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

            //gerar um token JWT
            const token = jwt.sign(
                {id: usuario.id, email:usuario.email, nome: usuario.nome}, //Informações/dados que ficarão no payload do Token
                process.env.JWT_SECRET, // Chave secreta para assinar o Token
                {expiresIn: "1h"} //Tempo de expiração do token
            )
            res.status(200).json({msg: "Login realizado com sucesso!", usuario: usuario.nome, token});
        } catch (error) {
            res.status(500).json({msg: "Erro interno ao realizar o login", erro: error.message});
        }
    }

    static buscarPorId(req, res){
        try {
            const {id} = req.params;
            const usuario = UsuarioModel.buscarPorId(id);
            if(!usuario){
                res.status(404).json({msg: "Nenhum usuário encontrado com esse ID"});
                return
            }
            res.status(200).json({msg: "Usuário encontrado", usuario});
        } catch (error) {
            res.status(500).json({msg: "Erro interno ao buscar o usuário por ID", erro: error.message});
        }
    }

    static deletarUser(req, res){
        try {
            const {id} = req.params;
            const usuario = UsuarioModel.deletarUsuario(id);
            if(!usuario){
                res.status(404).json({msg: "Usuário não encontrado."});
                return
            }
            res.status(200).json({msg:"Usuário deletado com sucesso!"});
        } catch (error) {
            res.status(500).json({msg:"Erro interno ao deletar o usuário.", erro: error.message});
        }
    }

    static async atualizarUsuario(req, res){
        try {
            const {id} = req.params;
            const {nome, email, senha} = req.body;
            if(!nome || !email || !senha){
                res.status(400).json({msg:"Todos os campos devem ser preenchidos"});
                return;
            }
            const senhaHash = await bcrypt.hash(senha, parseInt(process.env.SALT));
            const novosDados = {
                id: id,
                nome: nome,
                email: email,
                senha: senhaHash
            }
            const usuarioAtualizado = UsuarioModel.atualizarUsuario(id, novosDados);
            if(!usuarioAtualizado){
                res.status(404).json({msg: "Nenhum usuário encontrado"});
                return;
            }
            res.status(201).json({msg: "Usuario Atualizado com sucesso", usuarioAtualizado});
        } catch (error) {
            res.status(500).json({msg: "Erro interno ao atualizar usuário", erro: error.message});
        }
    }
    static async atualizarParcialmente(req, res){
        try {
            const {id} = req.params;
            const campos = {...req.body} //Pode conter nome, email, senha
            if(!campos){
                res.status(400).json({msg:"Nenhum valor recebido para atualizar"});
                return
            }
            if(campos.senha){
                campos.senha = await bcrypt.hash(campos.senha, parseInt(process.env.SALT));
            }
            const usuarioAtualizado = UsuarioModel.atualizarUsuario(id, campos);
            if(!usuarioAtualizado){
                res.status(404).json({msg: "Nenhum usuário encontrado"});
                return
            }
             res.status(201).json({msg: "Usuário atualizado com sucesso", usuarioAtualizado});
        } catch (error) {
            res.status(500).json({msg: "Erro interno ao atualizar parcialmente o usuário", erro : error.message});
        }
    }







}