const mongo = require('mongoose');
const validador = require('validator');

const schema = new mongo.schema({
    titulo: {type: String, required: true},
    link: {type: String, required: true}
});

const linkList = mongo.model('link', schema);

class linkAdd{
    constructor(body){
        this.body = body,
        this.link = {};
        this.error = [];
    }
    async add(){
        this.valida();
        if(this.error.length > 0) return;
        this.link = await linkList.create(this.body.link);
        
    }
    valida(){
        this.clean();
        if(!validador.isURL(this.body.link.link)) this.error.push('Link invalido');
    }
    clean(){
        for(const key in this.body.link){
            if(typeof this.body.link[key] !== 'string'){
                this.body.link[key] = '';
            }
        }
        this.link = {
            titulo: this.body.link.titulo,
            link: this.body.link.link
        };
    }
}