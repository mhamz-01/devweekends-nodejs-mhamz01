const http = require('http');
const fs = require('fs');

const server = http.createServer((req, res) => {
  switch (req.url) {
    case '/':
      fs.appendFile('log.txt', 'Home page visited\n', (err) => {
        if (err) console.error(err);
      });
      res.statusCode = 200;
      res.end('Welcome to the Home Page\n');
      break;

    case '/about':
      fs.appendFile('log.txt', 'About page visited\n', (err) => {
        if (err) console.error(err);
      });
      res.statusCode = 200;
      res.end('This is the About Page\n');
      break;

    default:
      fs.appendFile('log.txt', '404 - Unknown route visited\n', (err) => {
        if (err) console.error(err);
      });
      res.statusCode = 404;
      res.end('404 Page Not Found\n');
      break;
  }
});

server.listen(3000, () => {
  console.log('Server running at http://localhost:3000/');
});