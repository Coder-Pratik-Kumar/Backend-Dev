const http = require("http");

const server = http.createServer((req, res) => {
    res.writeHead(200, { "content-type": "text/html" });
    console.log(res);
    res.end("server is running");

    
});
   

server.listen(8000, () => {   
    console.log("server is running on port 8000");
})