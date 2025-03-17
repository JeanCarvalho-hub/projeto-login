const express = require('express');
const router = express.Router();
const page = require('./controls/form.js');
const dashboardPage = require('./controls/dashboard.js');
const middleware = require('./middlewares/middleware.js');
const {logout} = require('./controls/dashboard.js');

router.get("/", page.home);
router.get("/login", page.login);
router.get("/create", page.create);
router.get('/dashboard', page.dashboard);   
router.post('/admin', page.admin);
router.post('/autentic', page.autentic);
router.post('/logout', page.logout);
router.post('/added', dashboardPage.toadd);
router.post('/edit', dashboardPage.edit);
router.post('/delete', dashboardPage.delete);
router.use((req, res) => {
    res.status(404).send('<h1>404</h1><h2>not found</h2>')
})

module.exports = router;