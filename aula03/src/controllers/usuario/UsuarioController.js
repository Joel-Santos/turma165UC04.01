import { UsuarioModel } from "../../models/usuario/UsuarioModel.js";

export class UsuarioController {

    static listarUsuarios(req, res) {
        try {
            const usuarios = UsuarioModel.listarTodos();
            if (usuarios.length === 0 || !usuarios) {
                res.status(400).json({ msg: "Nenhum usuário no banco." });
                return
            }
            res.status(200).json({ msg: "Usuarios Encontrados", usuarios });
        } catch (error) {
            res.status(500).json({ msg: "Erro interno ao listar os usuários", erro: error.message });
        }
    }
    static buscarPorId(req, res) {
        try {
            const { id } = req.params;
            if (!id) {
                res.status(400).json({ msg: "O id não pode ser vazio" });
                return;
            }
            const usuario = UsuarioModel.buscarPorId(id);
            if (!usuario) {
                res.status(404).json({ msg: "Nenhum usuário com este ID" });
                return;
            }
            res.status(200).json({ msg: "Usuário encontrado", usuario });
        } catch (error) {
            res.status(500).json({ msg: "Erro interno ao buscar usuário por ID", erro: error.message });
        }
    }

    static criarUsuario(req, res) {
        try {
            const { nome, email, telefone } = req.body;
            if (!nome || !email || !telefone) {
                res.status(400).json({ msg: "Todos os campos devem ser preenchidos no cadastro" });
                return;
            }
            const novoUsuario = UsuarioModel.criarUsuario(nome, email, telefone);
            res.status(201).json({ msg: "Usuário criado com sucesso!", novoUsuario });

        } catch (error) {
            res.status(500).json({msg: "Erro interno ao cadastrar usuário.", erro: error.message});
        }
    }

    static atualizarUsuario(req, res){
        try {
            const {id} = req.params;
            const{nome, email, telefone} = req.body;
            if(!nome || !email || !telefone){
                res.status(400).json({msg: "Todos os campos devem ser preenhcidos na atualização."});
                return;
            }
            if(!id){
                res.status(400).json({msg: "Nenhum id fornecido na atualização."});
                return
            }
            const usuarioId = UsuarioModel.buscarPorId(id);
            if(!usuarioId){
                res.status(404).json({msg: "Usuário não encontrado."});
                return;
            }
            const novoUsuario = UsuarioModel.atualizarUsuario(id, nome,email, telefone);
            res.status(201).json({msg: "Usuário atualizado com sucesso!", novoUsuario});
        } catch (error) {
            res.status(500).json({msg: "Erro interno ao atualizar", erro: error.message});            
        }
    }

    static deletarUsuario(req, res){
        try {
            const {id} = req.params;
            if(!id){
                res.status(400).json({msg: "Id deve ser fornecido na deleção"});
                return;
            }
            const delUsuario = UsuarioModel.deletarUsuario(id);
            if(!delUsuario){
                res.status(404).json({msg: "Usuário não encontrado com este id."});
                return;
            } 
            res.status(200).json({msg:"Usuário deletado com sucesso!"});

        } catch (error) {
            res.status(500).json({msg:"Erro interno ao deletar o usuário", erro: error.message});
        }
    }



}