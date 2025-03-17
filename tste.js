function pika(nome, sobre){
    this.nome = nome;
    this.sobrenome = sobre;
}
pika.prototype.fala = function(){
    return `Meu nome é: ${this.nome} ${this.sobrenome}`;
}

const a = new pika('jean', 'carvalho');
console.log(a.fala());