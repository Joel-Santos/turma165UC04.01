export function autorizarPapeis(...papeisPermitidos){
    return(req, res, next)=>{
        const usuario = req.usuario; // veio do autenticarToken 
        if(!usuario?.role){
            res.status(403).json({msg: "Acesso negado"});
            return;
        }
        const permitido = papeisPermitidos.includes(usuario.role);
        if(!permitido){
              res.status(403).json({msg: "Acesso negado, você não tem permissão suficiente"});
              return;
        }
        return next();
    }
}

