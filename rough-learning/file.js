const fs = require('fs');
const os = require('os');



// fs.writefile is asychronous and fs.writeFileSync is synchronous.

// const result = fs.writeFileSync("./test.txt", "Hello, World!");


// Async
// fs.writeFileSync("./test.txt", "Hello, World!", (err) => {
//     if (err) {
//         console.error(err);
//         return;
//     } })


// async expects a callback function as the last argument. The callback function is called when the operation is complete. 
// The callback function takes an error object as its first argument. If the operation was successful, the error object will be null. 
// If the operation failed, the error object will contain an error message.

// sync function return a value/
