//Esse função "authenticated" valida se existe um usuário logado na sessão, 
//assim só permitindo acessar certar rotas caso esteja logado
module.exports = {
    authenticated: function(req, res, next){
        if(req.isAuthenticated()){
            return next();
        } else {
            return res.status(401).json({message: "Precisa estar logado para acessar essa rota"})
        }
    }
}