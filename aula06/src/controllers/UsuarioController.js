import { UsuarioModel } from "../models/UsuarioModel.js";
import axios from "axios";

export class UsuarioController{

    static listarUsuarios(req,res){
        try {
            const usuarios = UsuarioModel.lisatarUsuarios();
            if(!usuarios || usuarios.length === 0){
                res.status(404).json({msg: "Nenhum usuário cadastrado!"});
                return;
            }
            res.status(200).json({msg: "Usuários encontrados", usuarios});
        } catch (error) {
            res.status(500).json({msg: "Erro ao listar usuários", erro: error.message});
        }
    }

    //função assíncrona para buscar os dosado do viacep

    static async criarUsuario(req, res){
        try {
            const {nome, email, telefone, cep} = req.body;
            if(!nome || !email || !telefone || !cep){
                res.status(400).json({msg: "Todos os campos devem ser preenchidos"});
                return
            }
            const buscaCep = await axios.get(`https://viacep.com.br/ws/${cep}/json/`);
            if(buscaCep.erro){
                res.status(400).json({msg: "CEP inválido!"});
                return
            }
            console.log(buscaCep);
            const novoUsuario = {
                id: Date.now(),
                nome: nome,
                email: email,
                telefone: telefone,
                cep: cep,
                logradouro: buscaCep.data.logradouro,
                uf: buscaCep.data.uf
            }
            const userCriado = UsuarioModel.criarUsuario(novoUsuario);
            res.status(201).json({msg: "Usuário criado com sucesso!", userCriado});

        } catch (error) {
            res.status(500).json({msg: "Erro interno ao criar o usuário", erro: error.message});
        }
    }

}


