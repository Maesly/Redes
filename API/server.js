/*
var MongoClient = require('mongodb').MongoClient;

//MongoClient.connect("mongodb://localhost:30001,"+
  //                  "localhost:30002,"+
    //                "localhost:30003", function(err, client) {
MongoClient.connect("mongodb://localhost:30002", function(err, client) {
    if (err) throw err;
    var db = client.db('P1_BDA');

    db.collection("test").insert({'x': 2}, function (err, doc) {
        if (err) throw err;

        db.collection("test").findOne({'x': 2}, function (err, doc) {
            if (err) throw err;

            console.log(doc);
            client.close();
        });
    });             
});
*/

require('dotenv').config()
const cors = require('cors')
const express = require("express")
const app = express()

app.use(cors());

const mongoose = require('mongoose')
mongoose.connect(process.env.DATABASE_URL, {useNewUrlParser: true})
//mongoose.connect('mongodb+srv://karaoke:1234@cluster0.ainmt.mongodb.net/Karaoke?retryWrites=true&w=majority')
const db = mongoose.connection

db.on('error', (error) => console.error(error))
db.once('open', () => console.log("Conectado a la Base"))

app.use(express.json())

const usuarioRouter = require('./routes/usuario')
const usuario_rh_Router = require('./routes/usuario_rh')

app.use('/Usuario', usuarioRouter)
app.use('/Usuarios_RH', usuario_rh_Router)
app.listen(3000, () => console.log('Server Iniciado'))

/**
 * mongod --replSet RS --dbpath="C:\data\db\rs1" --port 30001 
 * mongod --replSet RS --dbpath="C:\data\db\rs2" --port 30002
 * mongod --replSet RS --dbpath="C:\data\db\rs3" --port 30003 
*/
