// Node.js

// const http = require("http");


// const host = "127.0.0.1"
// const port = 5000;

// const server = http.createServer((req,res) => {
//     res.statusCode = 200;
//     res.setHeader("Content-type","text/plain");
//     res.end("Hosgeldiniz")

// })

// server.listen(port,host,()=>{
//     console.log(`http:${host}:${port} adresinden gelen istekler dinleniyor...`)
// });

//Express.js

const express = require("express")
const data = require("./data.js")

const server = express();

server.get("/",(req,res)=>{
    res.send("Express'ten merhaba")
});

server.get("/aktorler",(req,res)=>{
    res.status(200).json(data)
});

server.get("/aktorler/:id",(req,res)=>{
    const{id}=req.params
    const aktor = data.find(aktor => aktor.id === parseInt(id))
    if(aktor) {
        res.status(200).json(aktor);
    }else{
        res.status(404).send("Aradıgınız aktor bulunamadı...");
    }
})

server.listen(5000,()=>{
    console.log("http://localhost:5000 adresine gelen istekler dinleniyor...")
})