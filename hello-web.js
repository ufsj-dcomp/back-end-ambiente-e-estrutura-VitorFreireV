var express = require('express')
var app = express()
var port = 3000

app.get('/aplicativo', function(req, res){
   res.send('Aplicativo Exemplo!') 
});

app.get('/html', function(req, res){

    var html = '<html><title>Hello World!</title><body>Lista 03 – Tecnologias Web</body></html>'
    res.send(html)

});

app.post('/imagens', function(req, res){
    res.send('Imagem 1 –Imagem 2 –Imagem 3')
});

app.delete('/clientes:id', function(req, res){
    var clienteID = req.params.id;
    res.send("Cliente  número " + clienteID +  " removido com sucesso")
});

app.get('/clientes/10', function(req, res){

    res.send("Cliente  número 10 removido com sucesso")
});

app.listen(port, function(){
    console.log("Executando na porta 3000")

});
