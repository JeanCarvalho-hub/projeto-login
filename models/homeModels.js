const mongo = require('mongoose');
const validator = require('validator');
const bcrypt = require('bcryptjs');

const login = new mongo.Schema({
    username: {type: String, require: true},
    email: {type: String, require: true},
    pass: {type: String, require: true}
});
const model = mongo.model('login', login);

class Login{
    constructor(body){
        this.body = body;
        this.error = [];
        this.user = null;
    }
    async autenticar(){
        this.user = await model.findOne({email: this.body.user.email});
        if(!this.user || !bcrypt.compareSync(this.body.user.pass, this.user.pass)){
            this.error.push('Email ou senha inválida');
            this.user = null
            return;
        }
        
    }
    async register(){
        this.valida();
        if(this.error.length > 0) return;
        await this.Exists();

        if(this.error.length > 0) return;

        const salt = bcrypt.genSaltSync(10);
        this.body.user.pass = bcrypt.hashSync(this.body.user.pass, salt);
        this.user = await model.create(this.body.user); // estamos acessando o user de fora
    }

    valida(){
        this.cleanUp();
        if(!validator.isEmail(this.body.user.email)) this.error.push('invalid email');
        if(this.body.user.pass.trim() !== this.body.user.passcheck.trim()) this.error.push('diferent passwords');
        if(this.body.user.pass.lenght < 3 || this.body.user.pass.lenght > 50) this.error.push('Password must be between 3 and 50 characters');
    }
    cleanUp(){
        for(const key in this.body.user){
            if(typeof this.body.user[key] !== 'string'){
                this.body.user[key] = '';
            }
        }
        this.user = {
            username: this.body.user.username,
            email: this.body.user.email,
            pass: this.body.user.pass,
            passcheck: this.body.user.passcheck
        }
        
    }
    async Exists(){
        const user = await model.findOne({email: this.body.user.email});
        if(user) this.error.push('Email já está registrado');
    }

}
module.exports = Login;