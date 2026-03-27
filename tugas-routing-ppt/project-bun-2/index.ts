const products = [
  { id: "1", name: "Laptop" },
  { id: "2", name: "Mouse" }
];

const users: any[] = [];

const server = Bun.serve({
  port: 3002,

  async fetch(req) {
    const url = new URL(req.url);
    const path = url.pathname;
    const method = req.method;

    console.log(`[${method}] ${path}`);

    // ===== HOME
    if (path === "/" && method === "GET") {
      return new Response("Home Bun Praktikum 2");
    }

    // ===== ABOUT
    if (path === "/about" && method === "GET") {
      return new Response("About Bun Praktikum 2");
    }

    // ===== GET /products
    if (path === "/products" && method === "GET") {
      return new Response(JSON.stringify(products), {
        headers: { "Content-Type": "application/json" }
      });
    }

    // ===== GET /products/:id
    if (path.startsWith("/products/") && method === "GET") {
      const id = path.split("/")[2];
      const product = products.find(p => p.id === id);

      if (!product) {
        return new Response(JSON.stringify({
          message: "Product tidak ditemukan"
        }), { status: 404 });
      }

      return new Response(JSON.stringify(product), {
        headers: { "Content-Type": "application/json" }
      });
    }

    // ===== POST /users (FIX AMAN 🔥)
    if (path === "/users" && method === "POST") {
      let body;

      try {
        body = await req.json();
      } catch (err) {
        return new Response(JSON.stringify({
          message: "Invalid JSON"
        }), {
          status: 400,
          headers: { "Content-Type": "application/json" }
        });
      }

      const newUser = {
        id: Date.now().toString(),
        name: body.name || "Anonymous"
      };

      users.push(newUser);

      return new Response(JSON.stringify({
        message: "User berhasil ditambahkan",
        data: newUser
      }), {
        status: 201,
        headers: { "Content-Type": "application/json" }
      });
    }

    // ===== GET /users/:id
    if (path.startsWith("/users/") && method === "GET") {
      const id = path.split("/")[2];
      const user = users.find(u => u.id === id);

      if (!user) {
        return new Response(JSON.stringify({
          message: "User tidak ditemukan"
        }), { status: 404 });
      }

      return new Response(JSON.stringify(user), {
        headers: { "Content-Type": "application/json" }
      });
    }

    // ===== 404
    return new Response(JSON.stringify({
      message: "Not Found"
    }), {
      status: 404,
      headers: { "Content-Type": "application/json" }
    });
  }
});

console.log(`🚀 Bun server jalan di http://localhost:${server.port}`);