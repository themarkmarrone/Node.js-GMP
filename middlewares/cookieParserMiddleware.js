import cookie from 'cookie';

export function cookieParserMiddleware(request, response, next) {
  const cookies = request.headers.cookie || '';
  request.parsedCookies = cookie.parse(cookies);
  next();
}
