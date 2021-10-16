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
const { request } = require("express");
const express = require("express");
const logger = require("./middlewares/logger")
const errorHandling = require("./middlewares/errorHandling")
const aktorlerRouter = require("./routers/aktorlerRouter")

const server = express();
server.use(express.json());
server.use(logger)

server.use("/aktorler",aktorlerRouter)

server.use(cors({ origin: true }));


server.get("/", (req, res) => {
    res.send("Express'ten merhaba...");
  });


  server.subscribe(errorHandling)

server.listen(5000, () => {
  console.log("http://localhost:5000 adresine gelen istekler dinleniyor...");
});
