import express from 'express';
import { createServer as createViteServer } from 'vite';
import { PrismaClient } from '@prisma/client';
import path from 'path';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import cors from 'cors';

const prisma = new PrismaClient();
const JWT_SECRET = process.env.JWT_SECRET || 'wajd-secret-key-2024';

async function startServer() {
  const app = express();
  const PORT = 3000;

  app.use(cors());
  app.use(express.json());

  // --- Auth Middleware ---
  const authenticateAdmin = (req: any, res: any, next: any) => {
    const token = req.headers.authorization?.split(' ')[1];
    if (!token) return res.status(401).json({ error: 'Unauthorized' });
    try {
      const decoded = jwt.verify(token, JWT_SECRET);
      req.admin = decoded;
      next();
    } catch (err) {
      res.status(401).json({ error: 'Invalid token' });
    }
  };

  // --- API Routes ---

  // Auth
  app.post('/api/admin/login', async (req, res) => {
    const { email, password } = req.body;
    const admin = await prisma.admin.findUnique({ where: { email } });
    if (!admin || !(await bcrypt.compare(password, admin.password))) {
      return res.status(401).json({ error: 'Invalid credentials' });
    }
    const token = jwt.sign({ id: admin.id, email: admin.email }, JWT_SECRET, { expiresIn: '1d' });
    res.json({ token });
  });

  // Projects
  app.get('/api/projects', async (req, res) => {
    const projects = await prisma.project.findMany({ orderBy: { createdAt: 'desc' } });
    res.json(projects);
  });

  app.post('/api/projects', authenticateAdmin, async (req, res) => {
    const { title, description, images, category } = req.body;
    const project = await prisma.project.create({
      data: { title, description, images, category }
    });
    res.json(project);
  });

  app.delete('/api/projects/:id', authenticateAdmin, async (req, res) => {
    await prisma.project.delete({ where: { id: req.params.id } });
    res.json({ success: true });
  });

  // Products
  app.get('/api/products', async (req, res) => {
    const products = await prisma.product.findMany({ orderBy: { createdAt: 'desc' } });
    res.json(products);
  });

  app.get('/api/products/:id', async (req, res) => {
    try {
      const product = await prisma.product.findUnique({ where: { id: req.params.id } });
      if (!product) return res.status(404).json({ error: 'Product not found' });

      const related = await prisma.product.findMany({
        where: {
          category: product.category,
          id: { not: product.id }
        },
        take: 4
      });

      res.json({
        ...product,
        related
      });
    } catch (err) {
      res.status(400).json({ error: 'Invalid product ID' });
    }
  });

  app.post('/api/products', authenticateAdmin, async (req, res) => {
    const { name, description, price, stock, images, category } = req.body;
    const product = await prisma.product.create({
      data: { name, description, price, stock, images, category }
    });
    res.json(product);
  });

  app.delete('/api/products/:id', authenticateAdmin, async (req, res) => {
    await prisma.product.delete({ where: { id: req.params.id } });
    res.json({ success: true });
  });

  // Orders
  app.get('/api/orders', authenticateAdmin, async (req, res) => {
    const orders = await prisma.order.findMany({
      include: { items: { include: { product: true } } },
      orderBy: { createdAt: 'desc' }
    });
    res.json(orders);
  });

  app.get('/api/orders/:id', async (req, res) => {
    try {
      const order = await prisma.order.findUnique({
        where: { id: req.params.id },
        include: { items: { include: { product: true } } }
      });
      if (!order) {
        return res.status(404).json({ error: 'Order not found' });
      }
      // Omit sensitive info if needed, but for tracking, we might just return it
      res.json(order);
    } catch (err) {
      res.status(400).json({ error: 'Invalid order ID' });
    }
  });

  app.post('/api/orders', async (req, res) => {
    const { customerName, customerEmail, customerPhone, items, totalAmount } = req.body;
    const order = await prisma.order.create({
      data: {
        customerName,
        customerEmail,
        customerPhone,
        totalAmount,
        items: {
          create: items.map((item: any) => ({
            productId: item.productId,
            quantity: item.quantity,
            price: item.price
          }))
        }
      }
    });
    res.json(order);
  });

  app.patch('/api/orders/:id', authenticateAdmin, async (req, res) => {
    const { status } = req.body;
    const order = await prisma.order.update({
      where: { id: req.params.id },
      data: { status }
    });
    res.json(order);
  });

  // Inquiries
  app.get('/api/inquiries', authenticateAdmin, async (req, res) => {
    const inquiries = await prisma.inquiry.findMany({ orderBy: { createdAt: 'desc' } });
    res.json(inquiries);
  });

  app.post('/api/inquiries', async (req, res) => {
    const { name, email, message } = req.body;
    const inquiry = await prisma.inquiry.create({
      data: { name, email, message }
    });
    res.json(inquiry);
  });

  app.patch('/api/inquiries/:id', authenticateAdmin, async (req, res) => {
    const { isRead } = req.body;
    const inquiry = await prisma.inquiry.update({
      where: { id: req.params.id },
      data: { isRead }
    });
    res.json(inquiry);
  });

  // --- Vite Setup ---
  if (process.env.NODE_ENV !== 'production') {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: 'spa',
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.join(process.cwd(), 'dist');
    app.use(express.static(distPath));
    app.get('*', (req, res) => {
      res.sendFile(path.join(distPath, 'index.html'));
    });
  }

  // Create default admin if none exists
  const adminCount = await prisma.admin.count();
  if (adminCount === 0) {
    const hashedPassword = await bcrypt.hash('admin123', 10);
    await prisma.admin.create({
      data: {
        email: 'admin@wajdstudio.com',
        password: hashedPassword
      }
    });
    console.log('Default admin created: admin@wajdstudio.com / admin123');
  }

  app.listen(PORT, '0.0.0.0', () => {
    console.log(`Server running on http://localhost:${PORT}`);
  });
}

startServer();
