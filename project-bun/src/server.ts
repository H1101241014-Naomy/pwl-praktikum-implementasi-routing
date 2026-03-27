const users = [
    { id: "1", name: 'Alice' },
    { id: "2", name: 'Bob' },
];
const server = Bun.serve({
port: 3000,
fetch(request) {

    // Membuat objek URL untuk memudahkan parsing
    const url = new URL(request.url);
    const path = url.pathname; // hanya path, tanpa query string
    const method = request.method;

    const startTime = Date.now(); // middleware: catat waktu mulai
    console.log(`[${new Date().toLocaleTimeString()}] ${method} ${path}`);

    // fungsi untuk menghitung durasi
    function logExecutionTime() {
      const duration = Date.now() - startTime;
      console.log(`⏱ Request diproses selama ${duration}ms`);
    }

// Routing manual
if (path === '/' && method === 'GET') {
      const resp = new Response('<h1>🏠 Halaman Utama (Bun)</h1><p>Selamat datang di server Bun + TypeScript!</p>', {
        headers: { 'Content-Type': 'text/html' },
      });
      logExecutionTime();
      return resp;
    }
else if (path === '/about' && method === 'GET') {
      const resp = new Response('<h1>📄 Tentang Kami (Bun)</h1><p>Routing manual dengan Bun sangat mudah!</p>', {
        headers: { 'Content-Type': 'text/html' },
      });
      logExecutionTime();
      return resp;
    }
else if (path === '/api/users' && method === 'GET') {
      const resp = new Response(JSON.stringify(users), {
        headers: { 'Content-Type': 'application/json' },
      });
      logExecutionTime();
      return resp;
    }
else if (path === '/api/users' && method === 'POST') {
      const resp = new Response(JSON.stringify({ message: 'User berhasil dibuat (Bun)' }), {
        status: 201,
        headers: { 'Content-Type': 'application/json' },
      });
      logExecutionTime();
      return resp;
    }
// --- Tambahan: Rute GET /products ---
else if (path === '/products' && method === 'GET') {
      const products = [
        { id: 1, name: "Laptop" },
        { id: 2, name: "Mouse" }
      ];
    const resp = new Response(JSON.stringify(products), {
        headers: { 'Content-Type': 'application/json' },
      });
      logExecutionTime();
      return resp;
    }

// Rute POST /products
else if (path === '/products' && method === 'POST') {
      const resp = new Response(JSON.stringify({ message: 'Produk berhasil ditambahkan (simulasi)' }), {
        status: 201,
        headers: { 'Content-Type': 'application/json' },
      });
      logExecutionTime();
      return resp;
}

// --- Rute dinamis GET /users/:id ---
else if (path.startsWith('/users/') && method === 'GET') {
      const id = path.split('/')[2];
      const user = users.find(u => u.id === id);
      const resp = new Response(JSON.stringify(user || { message: "User tidak ditemukan" }), {
        headers: { 'Content-Type': 'application/json' },
      });
      logExecutionTime();
      return resp;
}

// Jika tidak ada rute yang cocok → 404
else {
      const resp = new Response('<h1>❌ 404 - Halaman Tidak Ditemukan (Bun)</h1>', {
        status: 404,
        headers: { 'Content-Type': 'text/html' },
      });
      logExecutionTime();
      return resp;
    }
  },
});

console.log(`🚀 Server Bun berjalan di http://localhost:${server.port}`);