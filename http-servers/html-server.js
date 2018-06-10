import http from 'http';
import fs from 'fs';
import querystring from 'querystring';
import url from 'url';
import through from 'through2';

const htmlServer = http.createServer();
const htmlFilePath = './index.html';
const messageText = 'Hello World';

htmlServer.on('request', (request, response) => {
  response.writeHead(200, { 'Content-Type': 'text/html' });

  const query = url.parse(request.url).query;
  const params = querystring.parse(query);

  if (params.reader === 'sync') {
    console.log('Sync file read');
    const html = fs.readFileSync(htmlFilePath, 'utf8');
    response.end(html.replace('message', messageText));
  } else {
    console.log('Stream file read');
    const reader = fs.createReadStream(htmlFilePath);

    const transform = through(function(buffer, encoding, next) {
      const transformedBuffer = buffer
        .toString()
        .replace('message', messageText);
      this.push(transformedBuffer);
      next();
    });

    reader.pipe(transform).pipe(response);
  }

  request.on('error', error => {
    console.log('Something went wrong', error);
  });

  response.on('error', error => {
    console.log('Something went wrong', error);
  });
});

htmlServer.listen(8080);
