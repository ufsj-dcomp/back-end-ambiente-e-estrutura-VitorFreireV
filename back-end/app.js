const { response } = require('express');
var express = require('express')
var app = express()
var port = 3004
var mysql = require("mysql");
var cors = require("cors");
var jwt = require("jsonwebtoken");
const { createSecurePair } = require('tls');
const { connect } = require('http2');

var con = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "8907742",
    database: "tecweb_myapp"
});

con.connect((err) => {
    if (err) {
        console.log('Erro connecting to database...', err)
        return
    }
    console.log('Connection established!')
})

app.use(cors());
app.use(express.json());


app.post('/auth', (req, res) => {
    var user = req.body;

    con.query("SELECT * FROM Usuario WHERE first_name = ? and senha = ?", [user.nome, user.senha], (err, result)=>{
        
        var usuario = result[0];

        if(result.length == 0){
            res.status(401);
            res.send({token:null, usuario: usuario, success: false});
        }else{
            let token = jwt.sign({id: usuario.first_name}, 'tecmarket_web', {expiresIn: 6000});
            res.status(200);
            res.send({token:token, usuario:usuario, success:true});
        }
    });

});


verifica_token = (req, resp, next) => {
    var token = req.headers['x-access-token'];

    if(!token){
        return resp.status(401).end();
    }

    jwt.verify(token, 'tecmarket_web', (err, docoded) => {
        if(err){
            return res.status(401).end();
        }

        req.usuario = decoded.id;
        next();
    });
}


// **************************** USUARIO
app.post('/user', verifica_token, (req, res) => {
    var user = req.body;
    console.log(user)
    console.log("POST --- USER");
    
    con.query("INSERT INTO Usuario SET ?", [user], (err, result) => {
        if (err){
            console.log(err);
            res.status(404).end();
        }else{
            res.status(200);
            res.json(result).end();
        }

    });
});

app.get('/user/:userId', verifica_token, (req, res) => {
    var userId = req.params.userId
    console.log("GET --- USER  " + userId);
    con.query("SELECT * FROM Usuario WHERE id = ?", [userId], (err, result) => {
        if (err){
            console.log(err);
            res.status(404).end();
        } else {
            res.status(200);
            res.json(result);
        }
    });
});

app.put('/user/:userId', verifica_token, (req, res) => {
    var userId = req.params.userId;
    var user = req.body;
    console.log("PUT --- USER");
    console.log('user')
    con.query("UPDATE Usuario SET ? WHERE id = ?", [user, userId], (err, result) => {
        if (err){
            console.log(err);
            res.status(404).end();
        } else {
            res.status(200);
            res.json(result);
        }
    });
});


app.delete('/user/:userId', verifica_token, (req, res)=>{
    var userId = req.params.userId;
    console.log("DELETE -- USER");
    con.query("DELETE FROM Usuario WHERE id = ?",[userId] ,(err, result) => {
        if (err){
            console.log(err);
            res.status(404).end();
        } else {
            res.status(200);
            res.json(result);
        }
    });
});



// **************************** PRODUTO

app.post('/product', verifica_token, (req, res) => {
    var prod = req.body;
    console.log(prod)
    console.log("POST --- PRODUCT");
    
    con.query("INSERT INTO Produto SET ?", [prod], (err, result) => {
        if (err){
            console.log(err);
            res.status(404).end();
        }else{
            //res.status(200);
            console.log(result);
            res.json(result.insertId);
        }

    });
});


app.get('/product/:productId', verifica_token, (req, res) => {
    var productId = req.params.productId;
    
    console.log("GET --- PROD  " + productId);

    con.query("SELECT * FROM Produto WHERE id = ?", [productId], (err, result) => {
        if (err){
            console.log(err);
            res.status(404).end();
        } else {
            res.status(200);
            res.json(result);
        }
    });
});

app.put('/product/:productId', verifica_token, (req, res) => {
    var productId = req.params.productId;
    var product = req.body;
    console.log("PUT --- product");
    console.log("prod: ", product);
    con.query("UPDATE Produto SET ? WHERE id = ?", [product, productId], (err, result) => {
        if (err){
            console.log(err);
            res.status(404).end();
        } else {
            res.status(200);
            res.json(result);
        }
    });
});


app.delete('/product/:productId', verifica_token, (req, res) => {
    var productId = req.params.productId;
    console.log("DELETE -- USER");
    con.query("DELETE FROM Produto WHERE id = ?",[productId] ,(err, result) => {
        if (err){
            console.log(err);
            res.status(404).end();
        } else {
            res.status(200);
            res.json(result);
        }
    });
});



app.get('/list_products/news/:number_max', verifica_token, function(req, res){
    var number_max = req.params.number_max;
    
    console.log("GET --- PROD news  " + number_max);
    // LIMIT ? DANDO ERRO
    con.query("SELECT * FROM Produto", (err, result) => {
        if (err){
            console.log(err);
            res.status(404).end();
        } else {
            res.status(200);
            res.json(result);
        }
    });
});




// ***************************** COMENTARIO


app.post('/comment', verifica_token, function(req, res){
    var comment = req.body;
    console.log(comment)
    console.log("POST --- Comment");
    
    con.query("INSERT INTO Comentario SET ?", [comment], (err, result) => {
        if (err){
            console.log(err);
            res.status(404).end();
        }else{
            res.status(200);
            res.json(result).end();
        }

    });
});

app.get('/comment/:commentId', verifica_token, function(req, res){
    var commentId = req.params.commentId;
    
    console.log("GET --- Coment  " + commentId);

    con.query("SELECT * FROM Comentario WHERE id = ?", [commentId], (err, result) => {
        if (err){
            console.log(err);
            res.status(404).end();
        } else {
            res.status(200);
            res.json(result);
        }
    });
});



app.put('/comment/:commentId', verifica_token, function(req, res){
    var commentId = req.params.commentId;
    var comment = req.body;
    console.log("PUT --- prod");

    con.query("UPDATE Comentario SET ? WHERE id = ?", [comment, commentId], (err, result) => {
        if (err){
            console.log(err);
            res.status(404).end();
        } else {
            res.status(200);
            res.json(result);
        }
    });
});

app.delete('/comment/:commentId', verifica_token, function(req, res){
    var commentId = req.params.commentId;
    console.log("DELETE -- USER");
    con.query("DELETE FROM Comentario WHERE id = ?",[commentId] ,(err, result) => {
        if (err){
            console.log(err);
            res.status(404).end();
        } else {
            res.status(200);
            res.json(result);
        }
    });
});

//****************************** EVENTOS DO USUARIO*/

app.post('/userEvent', verifica_token, function(req, res){
    var userEvent = req.body;
    console.log(userEvent)
    console.log("POST --- EVENTOS DO USUARIO");
    
    con.query("INSERT INTO EventosUsuario SET ?", [userEvent], (err, result) => {
        if (err){
            console.log(err);
            res.status(404).end();
        }else{
            res.status(200);
            res.json(result).end();
        }

    });
});



app.listen(port, function(){
    console.log("Executando na porta "+ port)

});
