import http from 'http';

const jsonServer = http.createServer();

jsonServer.on('request', (request, response) => {
  const product = {
    id: 1,
    name: 'Supreme T-Shirt',
    brand: 'Supreme',
    price: 99.99,
    options: [{ color: 'blue' }, { size: 'XL' }]
  };

  response.writeHead(200, { 'Content-Type': 'application/json' });
  response.end(JSON.stringify(product));

  request.on('error', error => {
    console.log('Something went wrong', error);
  });

  response.on('error', error => {
    console.log('Something went wrong', error);
  });
});

jsonServer.listen(8080);
