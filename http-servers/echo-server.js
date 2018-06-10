import http from 'http';

const echoServer = http.createServer();

echoServer.on('request', (request, response) => {
  request.pipe(response);

  request.on('error', error => {
    console.log('Something went wrong', error);
  });

  response.on('error', error => {
    console.log('Something went wrong', error);
  });
});

echoServer.listen(8080);
