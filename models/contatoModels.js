const mongo = require('mongoose');
const validador = require('validator');

const schema = new mongo.Schema({
    titulo: {type: String, required: true},
    link: {type: String, required: true},
    userId: {type: mongo.Schema.Types.ObjectId, ref: 'login', required: true}
});

const linkList = mongo.model('link', schema);

class linkAdd{
    constructor(body, req){
        this.body = body,
        this.req = req;
        this.link = {};
        this.error = [];
    }
    async add(){
        this.valida();
        if(this.error.length > 0) return;
        this.link = await linkList.create(this.link);
        
    }
    async showLink(){
        const link = await linkList.find({userId: this.req.session.user._id}).populate('userId');
        return link;
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
            link: this.body.link.link,
            userId: this.req.session.user._id
        };
    }
    async update(id, titulo, link){
        if(typeof id !== 'string') return;
        const edit = await linkList.findByIdAndUpdate(id, {titulo: titulo, link: link}, {new: true});

    }
    async delete(id){
        if(typeof id !== 'string') return;
        const deleteLink = await linkList.findByIdAndDelete(id);
    }
}
module.exports = linkAdd;