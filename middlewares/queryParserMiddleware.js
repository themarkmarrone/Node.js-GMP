import url from 'url';
import querystring from 'querystring';

export function queryParserMiddleware(request, response, next) {
  const query = url.parse(request.url).query;
  request.parsedQuery = querystring.parse(query);
  next();
}
