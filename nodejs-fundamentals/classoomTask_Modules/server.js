const http = require("http");

const server=http.createServer((req, res) => {
    // res.writeHead(200, { "content-type": "text/html" });
    // console.log(res);
    // res.end("server is running");

    

    switch(req.url){
        case "/":
            res.end("welcome to home page")
            break;
        case "/about-us":
            res.end("welcome to about page")
        default:
            res.writeHead(404, { "content-type": "text/html" });
            res.end("Page not found") 
    }
})

server.listen(8000, () => {   
    console.log("server is running on port 8000");
})