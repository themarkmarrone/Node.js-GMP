import http from 'http';

const plainTextServer = http.createServer();

plainTextServer.on('request', (request, response) => {
  response.writeHead(200, { 'Content-Type': 'text/plain' });
  response.end('Hello World');

  request.on('error', error => {
    console.log('Something went wrong', error);
  });

  response.on('error', error => {
    console.log('Something went wrong', error);
  });
});

plainTextServer.listen(8080);
