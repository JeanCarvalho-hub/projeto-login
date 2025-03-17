const { csrfToken } = require("../middlewares/middleware");
const Login = require('../models/homeModels');
const Link = require('../models/contatoModels');

exports.home = (req, res) => {
    res.send(`
        <h1>hello, word!</h1>
        <p>faça login <a href="login">aqui</a><p>
        `)
}
exports.dashboard = async (req, res) => {
    if(req.session.user){
        const link = new Link(req.session.user, req)
        const linkTable = await link.showLink()
        res.render('dashboard', {
            user: req.session.user.username,
            showMessage: req.query.q === 'logout',
            links: linkTable
        });
        return
    }
    res.redirect('login');
}
exports.login = (req, res) => {
    if(req.session.user){
        res.redirect('dashboard');
        return
    }
    res.render('login.ejs', {
        csrfToken: res.locals.csrfToken,
        success: req.flash('success'),
        errors: req.flash('errors')
    });
}
exports.autentic = async(req, res) => {
    try{
        const login = new Login(req.body);
        await login.autenticar();
        if(login.error.length > 0){
            req.flash('errors', login.error);
            req.session.save(function(){
                return res.redirect('login');
            })
            return;
        }
        req.session.user = login.user
        console.log(req.session);
        req.session.save(function(){
            res.redirect('dashboard')
        })
    }catch(e){
        console.log(e);
    }

}
exports.create = (req, res) => {
    res.render('create.ejs', {
        csrfToken: res.locals.csrfToken,
        errors: req.flash('errors'),
        success: req.flash('success')
    });
}
exports.admin = async(req, res) => {
    try{
        const login = new Login(req.body);
        await login.register();
        if(login.error.length > 0){
            req.flash('errors', login.error);
            req.session.save(function(){
                return res.redirect('create');
            });
            return
        }
        req.flash('success', 'Account create!');
        req.session.save(function(){
            res.redirect('create');
        })
    }catch(e){
        console.log(e);
    }
        }
exports.logout = (req, res) =>{
    if(req.body.btn_logout === 'yes_logout'){
        req.session.destroy();
        res.redirect('login');
    }else{
        res.redirect('dashboard');
    }

}