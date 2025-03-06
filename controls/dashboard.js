const link = require('../models/contatoModels');
const { csrfToken } = require("../middlewares/middleware");

exports.toadd = (req, res) => {
    const add = new link(req.body);
    awai add.add();
    if(add.error.length > 0) return;
    req.session.link = add.link;
    req.session.save(function(){
        res.redirect('dashboard');
    });
}