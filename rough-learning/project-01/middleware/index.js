function logReqRes(filename){
    return function(req, res, next){
        fs.appendFile(filename, `Request: ${req.method} ${req.url}\n`, (err) => {
            if(err) {
                console.log("Error writing request log:", err);
            }
        });
}}