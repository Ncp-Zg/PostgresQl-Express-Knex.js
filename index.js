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
const cors = require("cors");
const express = require("express");
let data = require("./data.js");

const server = express();
server.use(express.json());

server.use(cors({ origin: true }));

server.get("/", (req, res) => {
  res.send("Express'ten merhaba...cd");
});

server.get("/aktorler", (req, res) => {
  res.status(200).json(data);
});

let next_id = 4;

server.post("/aktorler", (req, res) => {
  console.log("req.body", req.body);
  let yeni_aktor = req.body;
  yeni_aktor.id = next_id;
  next_id++;
  data.push(yeni_aktor);
  res.status(201).json(yeni_aktor);
});

server.delete("/aktorler/:id", (req, res) => {
  const silinecek_id = req.params.id;
  const silinecek_aktor = data.find(
    (aktor) => aktor.id === Number(silinecek_id)
  );

  if(silinecek_aktor){
    data = data.filter(aktor => aktor.id !== Number(silinecek_id));
    res.status(204).end();
  }else{
      res.status(404).json({errorMessage:"Silmeye calıstıgınız aktor sıstemde yok."})
  }
});


server.put("/aktorler/:id",(req,res)=>{
    console.log(req.body)
    const id = req.params.id;
    const body = req.body
    const current_aktor = data.find(aktor=>aktor.id === parseInt(id));
    console.log(current_aktor)
    if(current_aktor){
        data[id-1] = body
        res.status(204).end();
        }      
    else{
        res.status(404).json({errorMessage:"Degistirmek istediginiz parametreler hatalı."})
    }
})

server.get("/aktorler/:id", (req, res) => {
  console.log("req.body", req.body);
  const { id } = req.params;
  const aktor = data.find((aktor) => aktor.id === parseInt(id));
  if (aktor) {
    res.status(200).json(aktor);
  } else {
    res.status(404).send("Aradıgınız aktor bulunamadı...");
  }
});

server.listen(5000, () => {
  console.log("http://localhost:5000 adresine gelen istekler dinleniyor...");
});
