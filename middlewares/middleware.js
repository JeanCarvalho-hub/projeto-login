exports.csrfMiddleware = (req, res, next) =>{
    res.locals.csrfToken = req.csrfToken();
    next();
}
exports.requiredLogin = (req, res, next) => {
    if(!req.session.user){
        req.session.save(() => res.redirect('login'));
        return;
    }
    next();
}