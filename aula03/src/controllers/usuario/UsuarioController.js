import { UsuarioModel } from "../../models/usuario/UsuarioModel.js";

export class UsuarioController{

    static listarUsuarios(req, res){
        try {
            const usuarios = UsuarioModel.listarTodos();
            if(usuarios.length === 0 || !usuarios){
                res.status(400).json({msg: "Nenhum usuário no banco."});
                return
            }
            res.status(200).json({msg: "Usuarios Encontrados", usuarios});
        } catch (error) {
            res.status(500).json({msg: "Erro interno ao listar os usuários", erro: error.message});
        }
    }
    static buscarPorId(req, res){
        try {
            const {id} = req.params;
            if(!id){
                res.status(400).json({msg: "O id não pode ser vazio"});
                    return;
            }
            const usuario = UsuarioModel.buscarPorId(id);
            if(!usuario){
                res.status(404).json({msg: "Nenhum usuário com este ID"});
                return;
            }
            res.status(200).json({msg: "Usuário encontrado", usuario});
        } catch (error) {
               res.status(500).json({msg: "Erro interno ao buscar usuário por ID", erro: error.message});
        }
    }

}