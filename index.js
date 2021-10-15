const http = require("http");


const host = "127.0.0.1"
const port = 5000;

const server = http.createServer((req,res) => {
    res.statusCode = 200;
    res.setHeader("Content-type","text/plain");
    res.end("Hosgeldiniz")

})

server.listen(port,host,()=>{
    console.log(`http:${host}:${port} adresinden gelen istekler dinleniyor...`)
});