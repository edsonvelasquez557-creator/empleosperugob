const http = require('node:http');
const fs = require('node:fs');
const path = require('node:path');
const root = __dirname;
const port = Number(process.env.PORT || 4173);
const types = {'.html':'text/html; charset=utf-8','.css':'text/css; charset=utf-8','.js':'text/javascript; charset=utf-8','.png':'image/png','.pdf':'application/pdf'};
http.createServer((req, res) => {
  let pathname;
  try { pathname = decodeURIComponent(new URL(req.url, 'http://localhost').pathname); }
  catch { res.writeHead(400); return res.end('Solicitud incorrecta'); }
  const aliases = ['/','/index.html','/CertificadoUnicoLaboral/Verificacion.html','/CertificadoUnicoLaboral/Ver.html'];
  if (aliases.includes(pathname)) pathname = '/index.html';
  else pathname = pathname.replace(/^\/CertificadoUnicoLaboral\//, '/');
  const file = path.resolve(root, '.' + pathname);
  if (!file.startsWith(root + path.sep) || !types[path.extname(file)]) { res.writeHead(404); return res.end('No encontrado'); }
  fs.readFile(file, (error, data) => {
    if (error) { res.writeHead(404); return res.end('No encontrado'); }
    res.writeHead(200, {'Content-Type':types[path.extname(file)],'Cache-Control':'no-store','X-Content-Type-Options':'nosniff','X-Robots-Tag':'noindex, nofollow'});
    res.end(data);
  });
}).listen(port, '127.0.0.1', () => console.log(`Vista local: http://127.0.0.1:${port}`));
