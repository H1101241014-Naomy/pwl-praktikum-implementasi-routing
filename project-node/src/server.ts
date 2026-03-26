const users = [
    { id: "1", name: 'Alice' },
    { id: "2", name: 'Bob' },
];

import * as http from 'http';
const PORT = 3001;

const server = http.createServer((req, res) => {
    const url = req.url || '/';
    const method = req.method || 'GET';

    // ===== Middleware: log waktu dan hitung durasi =====
    const startTime = Date.now(); // catat waktu mulai request
    console.log(`[${new Date().toLocaleTimeString()}] ${method} ${url}`);

    function logExecutionTime() {
        const duration = Date.now() - startTime;
        console.log(`⏱ Request diproses selama ${duration}ms`);
    }

    // --- ROUTING ---
    if (url === '/' && method === 'GET') {
        res.writeHead(200, { 'Content-Type': 'text/html' });
        res.end('<h1>🏠 Halaman Utama</h1><p>Selamat datang di server Node.js + TypeScript!</p>', () => {
            logExecutionTime();
        });
    }
    else if (url === '/about' && method === 'GET') {
        res.writeHead(200, { 'Content-Type': 'text/html' });
        res.end('<h1>📄 Tentang Kami</h1><p>Ini adalah contoh routing manual sederhana.</p>', () => {
            logExecutionTime();
        });
    }
    else if (url === '/api/users' && method === 'GET') {
        res.writeHead(200, { 'Content-Type': 'application/json' });
        res.end(JSON.stringify(users), () => {
            logExecutionTime();
        });
    }
    else if (url === '/api/users' && method === 'POST') {
        res.writeHead(201, { 'Content-Type': 'application/json' });
        res.end(JSON.stringify({ message: 'User berhasil dibuat (contoh)' }), () => {
            logExecutionTime();
        });
    }
    else if (url === '/products' && method === 'GET') {
        const products = [
            { id: 1, name: "Laptop" },
            { id: 2, name: "Mouse" }
        ];
        res.writeHead(200, { 'Content-Type': 'application/json' });
        res.end(JSON.stringify(products), () => {
            logExecutionTime();
        });
    }
    else if (url === '/products' && method === 'POST') {
        res.writeHead(201, { 'Content-Type': 'application/json' });
        res.end(JSON.stringify({ message: 'Produk berhasil ditambahkan (simulasi)' }), () => {
            logExecutionTime();
        });
    }
    else if (url.startsWith('/users/') && method === 'GET') {
        const id = url.split('/')[2];
        const user = users.find(u => u.id === id);
        res.writeHead(200, { 'Content-Type': 'application/json' });
        res.end(JSON.stringify(user || { message: "User tidak ditemukan" }), () => {
            logExecutionTime();
        });
    }
    else {
        res.writeHead(404, { 'Content-Type': 'text/html' });
        res.end('<h1>❌ 404 - Halaman Tidak Ditemukan</h1>', () => {
            logExecutionTime();
        });
    }
});

server.listen(PORT, () => {
    console.log(`🚀 Server berjalan di http://localhost:${PORT}`);
});