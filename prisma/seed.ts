import { PrismaClient } from '@prisma/client';
import bcrypt from 'bcryptjs';

const prisma = new PrismaClient();

async function main() {
  // Admin
  const hashedPassword = await bcrypt.hash('admin123', 10);
  await prisma.admin.upsert({
    where: { email: 'admin@wajdstudio.com' },
    update: {},
    create: {
      email: 'admin@wajdstudio.com',
      password: hashedPassword,
    },
  });

  // Projects
  const projects = [
    {
      title: 'The Emerald Villa',
      description: 'A modern classic residence in the heart of Milan, blending marble surfaces with warm wood accents.',
      images: ['https://images.unsplash.com/photo-1600210492486-724fe5c67fb0?auto=format&fit=crop&q=80&w=1000'],
      category: 'Classic',
    },
    {
      title: 'Azure Penthouse',
      description: 'Minimalist luxury with panoramic city views. Focus on negative space and sculptural furniture.',
      images: ['https://images.unsplash.com/photo-1600607687920-4e2a09cf159d?auto=format&fit=crop&q=80&w=1000'],
      category: 'Modern',
    },
    {
      title: 'Terracota Loft',
      description: 'Industrial warmth meets artisanal craftsmanship. Featuring WAJD WOOD signature pieces.',
      images: ['https://images.unsplash.com/photo-1600566753190-17f0baa2a6c3?auto=format&fit=crop&q=80&w=1000'],
      category: 'Minimalist',
    },
  ];

  for (const project of projects) {
    await prisma.project.create({ data: project });
  }

  // Products
  const products = [
    {
      name: 'The Wajd Lounge Chair',
      description: 'Handcrafted oak frame with premium velvet upholstery. A study in comfort and curves.',
      price: 1250,
      stock: 10,
      images: ['https://images.unsplash.com/photo-1592078615290-033ee584e267?auto=format&fit=crop&q=80&w=1000'],
      category: 'Furniture',
    },
    {
      name: 'Terracota Vessel',
      description: 'Artisanal clay vessel with a matte finish. Perfect for minimalist styling.',
      price: 180,
      stock: 25,
      images: ['https://images.unsplash.com/photo-1578500494198-246f612d3b3d?auto=format&fit=crop&q=80&w=1000'],
      category: 'Decor',
    },
    {
      name: 'Kobe Dining Table',
      description: 'Solid walnut dining table with kobe-stained accents. Seats eight comfortably.',
      price: 3400,
      stock: 5,
      images: ['https://images.unsplash.com/photo-1577140917170-285929fb55b7?auto=format&fit=crop&q=80&w=1000'],
      category: 'Furniture',
    },
    {
      name: 'Alabaster Pendant',
      description: 'Soft, diffused lighting through natural alabaster stone. Brass hardware.',
      price: 850,
      stock: 15,
      images: ['https://images.unsplash.com/photo-1540932239986-30128078f3c5?auto=format&fit=crop&q=80&w=1000'],
      category: 'Lighting',
    },
  ];

  for (const product of products) {
    await prisma.product.create({ data: product });
  }

  console.log('Seed data created successfully.');
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
