const link = require('../models/contatoModels');
const { csrfToken } = require("../middlewares/middleware");

exports.toadd = async (req, res) => {
    const add = new link(req.body, req);
    await add.add();
    if(add.error.length > 0) return;
    req.session.save(await function(){
        res.redirect('dashboard');
        add.showLink();
    });
}
exports.edit = async(req, res) => {
    try{
        const {id, titulo, url} = req.body.link
        const edit = new link(req.body.link);
        await edit.update(id, titulo, url);
        res.redirect('dashboard');
    }catch(e){
        console.log('erro em atualizar: ', e)
    }

}
exports.delete = async(req, res) =>{
    try{
        const{id} = req.body.link;
        const del = new link(req.body.link);
        await del.delete(id);
        res.redirect('dashboard');
    }catch(e){
        console.log('deu erro em deletar', e);
    }
}