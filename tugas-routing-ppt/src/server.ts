import * as http from 'http';

const PORT = 3002;

const server = http.createServer(
  (req: http.IncomingMessage, res: http.ServerResponse) => {

    const url = req.url || '/';
    const method = req.method || 'GET';

    console.log(`[${new Date().toLocaleTimeString()}] ${method} ${url}`);

    if (url === '/' && method === 'GET') {
        res.writeHead(200, { 'Content-Type': 'text/plain' });
        res.end('Home Page');
    } 
    else if (url === '/about' && method === 'GET') {
        res.writeHead(200, { 'Content-Type': 'text/plain' });
        res.end('About Page');
    } 
    else {
        res.writeHead(404, { 'Content-Type': 'text/plain' });
        res.end('404 Not Found');
    }
});

server.listen(PORT, () => {
    console.log(`Server running at http://localhost:${PORT}`);
});