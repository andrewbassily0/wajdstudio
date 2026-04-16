import { useState, useEffect } from 'react';
import { Routes, Route, Link, useNavigate, useLocation } from 'react-router-dom';
import { 
  LayoutDashboard, 
  Image as ImageIcon, 
  ShoppingBag, 
  ClipboardList, 
  MessageSquare, 
  LogOut,
  Plus,
  Trash2,
  CheckCircle,
  Clock
} from 'lucide-react';
import { Project, Product, Order, Inquiry } from '../../types';
import { formatCurrency, cn } from '../../lib/utils';

export default function AdminDashboard() {
  const navigate = useNavigate();
  const location = useLocation();
  const token = localStorage.getItem('wajd_admin_token');

  useEffect(() => {
    if (!token) navigate('/admin');
  }, [token, navigate]);

  const logout = () => {
    localStorage.removeItem('wajd_admin_token');
    navigate('/admin');
  };

  const navItems = [
    { name: 'Overview', path: '', icon: <LayoutDashboard size={18} /> },
    { name: 'Projects', path: 'projects', icon: <ImageIcon size={18} /> },
    { name: 'Store', path: 'store', icon: <ShoppingBag size={18} /> },
    { name: 'Orders', path: 'orders', icon: <ClipboardList size={18} /> },
    { name: 'Inquiries', path: 'inquiries', icon: <MessageSquare size={18} /> },
  ];

  return (
    <div className="min-h-screen bg-perola flex pt-20">
      {/* Sidebar */}
      <aside className="w-64 bg-white border-r border-smoky-black/5 flex flex-col fixed h-[calc(100vh-80px)]">
        <div className="p-8 flex-grow">
          <nav className="space-y-2">
            {navItems.map((item) => {
              const fullPath = `/admin/dashboard${item.path ? '/' + item.path : ''}`;
              const isActive = location.pathname === fullPath;
              return (
                <Link
                  key={item.path}
                  to={fullPath}
                  className={cn(
                    "flex items-center space-x-3 px-4 py-3 text-sm transition-colors",
                    isActive 
                      ? "bg-terracota text-perola luxury-shadow" 
                      : "text-smoky-black/60 hover:bg-perola hover:text-smoky-black"
                  )}
                >
                  {item.icon}
                  <span className="font-medium">{item.name}</span>
                </Link>
              );
            })}
          </nav>
        </div>
        <div className="p-8 border-t border-smoky-black/5">
          <button
            onClick={logout}
            className="flex items-center space-x-3 text-sm text-red-500 hover:text-red-700 transition-colors w-full"
          >
            <LogOut size={18} />
            <span className="font-medium">Logout</span>
          </button>
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-grow ml-64 p-12">
        <Routes>
          <Route path="/" element={<Overview />} />
          <Route path="projects" element={<ManageProjects />} />
          <Route path="store" element={<ManageStore />} />
          <Route path="orders" element={<ManageOrders />} />
          <Route path="inquiries" element={<ManageInquiries />} />
        </Routes>
      </main>
    </div>
  );
}

function Overview() {
  return (
    <div>
      <h1 className="text-4xl font-serif mb-8">Dashboard Overview</h1>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        {[
          { label: 'Total Sales', value: '$12,450', color: 'bg-terracota' },
          { label: 'Active Projects', value: '8', color: 'bg-azul-golfinho' },
          { label: 'New Inquiries', value: '5', color: 'bg-verde-claro' },
        ].map((stat, i) => (
          <div key={i} className="bg-white p-8 luxury-shadow border-t-4 border-terracota">
            <p className="text-[10px] uppercase tracking-widest opacity-40 mb-2">{stat.label}</p>
            <p className="text-3xl font-serif">{stat.value}</p>
          </div>
        ))}
      </div>
    </div>
  );
}

function ManageProjects() {
  const [projects, setProjects] = useState<Project[]>([]);
  const [isAdding, setIsAdding] = useState(false);
  const [newProject, setNewProject] = useState({ title: '', description: '', images: '', category: 'Classic' });

  const fetchProjects = () => {
    fetch('/api/projects').then(res => res.json()).then(setProjects);
  };

  useEffect(fetchProjects, []);

  const handleAdd = async (e: React.FormEvent) => {
    e.preventDefault();
    const token = localStorage.getItem('wajd_admin_token');
    const res = await fetch('/api/projects', {
      method: 'POST',
      headers: { 
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`
      },
      body: JSON.stringify({
        ...newProject,
        images: [newProject.images] // Simple single image for now
      })
    });
    if (res.ok) {
      setIsAdding(false);
      setNewProject({ title: '', description: '', images: '', category: 'Classic' });
      fetchProjects();
    }
  };

  const handleDelete = async (id: string) => {
    if (!confirm('Are you sure?')) return;
    const token = localStorage.getItem('wajd_admin_token');
    await fetch(`/api/projects/${id}`, {
      method: 'DELETE',
      headers: { 'Authorization': `Bearer ${token}` }
    });
    fetchProjects();
  };

  return (
    <div>
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-4xl font-serif">Manage Projects</h1>
        <button
          onClick={() => setIsAdding(true)}
          className="bg-smoky-black text-perola px-6 py-2 text-xs uppercase tracking-widest flex items-center space-x-2 hover:bg-terracota transition-colors"
        >
          <Plus size={16} />
          <span>Add Project</span>
        </button>
      </div>

      {isAdding && (
        <div className="fixed inset-0 bg-smoky-black/50 z-[100] flex items-center justify-center p-6" role="dialog" aria-modal="true" aria-labelledby="new-project-title">
          <div className="bg-white p-12 max-w-2xl w-full luxury-shadow">
            <h2 id="new-project-title" className="text-3xl font-serif mb-8">New Project</h2>
            <form onSubmit={handleAdd} className="space-y-6">
              <input
                required
                aria-label="Project Title"
                placeholder="Project Title"
                value={newProject.title}
                onChange={e => setNewProject({ ...newProject, title: e.target.value })}
                className="w-full border-b border-smoky-black/10 py-3 focus:outline-none focus:border-terracota"
              />
              <textarea
                required
                aria-label="Project Description"
                placeholder="Description"
                value={newProject.description}
                onChange={e => setNewProject({ ...newProject, description: e.target.value })}
                className="w-full border-b border-smoky-black/10 py-3 focus:outline-none focus:border-terracota h-32"
              />
              <input
                required
                aria-label="Project Image URL"
                placeholder="Image URL"
                value={newProject.images}
                onChange={e => setNewProject({ ...newProject, images: e.target.value })}
                className="w-full border-b border-smoky-black/10 py-3 focus:outline-none focus:border-terracota"
              />
              <select
                aria-label="Project Category"
                value={newProject.category}
                onChange={e => setNewProject({ ...newProject, category: e.target.value })}
                className="w-full border-b border-smoky-black/10 py-3 focus:outline-none focus:border-terracota"
              >
                <option>Classic</option>
                <option>Modern</option>
                <option>Minimalist</option>
                <option>Commercial</option>
              </select>
              <div className="flex space-x-4 pt-4">
                <button type="submit" className="bg-terracota text-perola px-8 py-3 text-xs uppercase tracking-widest">Save Project</button>
                <button type="button" onClick={() => setIsAdding(false)} className="text-xs uppercase tracking-widest opacity-40">Cancel</button>
              </div>
            </form>
          </div>
        </div>
      )}

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {projects.map(project => (
          <div key={project.id} className="bg-white p-6 luxury-shadow flex items-center space-x-6">
            <img src={project.images[0]} className="w-24 h-24 object-cover" loading="lazy" referrerPolicy="no-referrer" alt={project.title} />
            <div className="flex-grow">
              <h3 className="font-serif text-xl">{project.title}</h3>
              <p className="text-xs opacity-40 uppercase tracking-widest">{project.category}</p>
            </div>
            <button onClick={() => handleDelete(project.id)} aria-label={`Delete project ${project.title}`} className="text-red-500 hover:text-red-700">
              <Trash2 size={18} aria-hidden="true" />
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}

function ManageStore() {
  const [products, setProducts] = useState<Product[]>([]);
  const [isAdding, setIsAdding] = useState(false);
  const [newProduct, setNewProduct] = useState({ name: '', description: '', price: 0, stock: 0, images: '', category: 'Furniture' });

  const fetchProducts = () => {
    fetch('/api/products').then(res => res.json()).then(setProducts);
  };

  useEffect(fetchProducts, []);

  const handleAdd = async (e: React.FormEvent) => {
    e.preventDefault();
    const token = localStorage.getItem('wajd_admin_token');
    const res = await fetch('/api/products', {
      method: 'POST',
      headers: { 
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`
      },
      body: JSON.stringify({
        ...newProduct,
        price: Number(newProduct.price),
        stock: Number(newProduct.stock),
        images: [newProduct.images]
      })
    });
    if (res.ok) {
      setIsAdding(false);
      setNewProduct({ name: '', description: '', price: 0, stock: 0, images: '', category: 'Furniture' });
      fetchProducts();
    }
  };

  const handleDelete = async (id: string) => {
    if (!confirm('Are you sure?')) return;
    const token = localStorage.getItem('wajd_admin_token');
    await fetch(`/api/products/${id}`, {
      method: 'DELETE',
      headers: { 'Authorization': `Bearer ${token}` }
    });
    fetchProducts();
  };

  return (
    <div>
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-4xl font-serif">Manage Store</h1>
        <button
          onClick={() => setIsAdding(true)}
          className="bg-smoky-black text-perola px-6 py-2 text-xs uppercase tracking-widest flex items-center space-x-2 hover:bg-terracota transition-colors"
        >
          <Plus size={16} />
          <span>Add Product</span>
        </button>
      </div>

      {isAdding && (
        <div className="fixed inset-0 bg-smoky-black/50 z-[100] flex items-center justify-center p-6" role="dialog" aria-modal="true" aria-labelledby="new-product-title">
          <div className="bg-white p-12 max-w-2xl w-full luxury-shadow">
            <h2 id="new-product-title" className="text-3xl font-serif mb-8">New Product</h2>
            <form onSubmit={handleAdd} className="space-y-6">
              <input
                required
                aria-label="Product Name"
                placeholder="Product Name"
                value={newProduct.name}
                onChange={e => setNewProduct({ ...newProduct, name: e.target.value })}
                className="w-full border-b border-smoky-black/10 py-3 focus:outline-none focus:border-terracota"
              />
              <textarea
                required
                aria-label="Product Description"
                placeholder="Description"
                value={newProduct.description}
                onChange={e => setNewProduct({ ...newProduct, description: e.target.value })}
                className="w-full border-b border-smoky-black/10 py-3 focus:outline-none focus:border-terracota h-32"
              />
              <div className="grid grid-cols-2 gap-6">
                <input
                  required
                  type="number"
                  aria-label="Product Price"
                  placeholder="Price"
                  value={newProduct.price}
                  onChange={e => setNewProduct({ ...newProduct, price: Number(e.target.value) })}
                  className="w-full border-b border-smoky-black/10 py-3 focus:outline-none focus:border-terracota"
                />
                <input
                  required
                  type="number"
                  aria-label="Product Stock"
                  placeholder="Stock"
                  value={newProduct.stock}
                  onChange={e => setNewProduct({ ...newProduct, stock: Number(e.target.value) })}
                  className="w-full border-b border-smoky-black/10 py-3 focus:outline-none focus:border-terracota"
                />
              </div>
              <input
                required
                aria-label="Product Image URL"
                placeholder="Image URL"
                value={newProduct.images}
                onChange={e => setNewProduct({ ...newProduct, images: e.target.value })}
                className="w-full border-b border-smoky-black/10 py-3 focus:outline-none focus:border-terracota"
              />
              <select
                aria-label="Product Category"
                value={newProduct.category}
                onChange={e => setNewProduct({ ...newProduct, category: e.target.value })}
                className="w-full border-b border-smoky-black/10 py-3 focus:outline-none focus:border-terracota"
              >
                <option>Furniture</option>
                <option>Decor</option>
                <option>Lighting</option>
                <option>Textiles</option>
              </select>
              <div className="flex space-x-4 pt-4">
                <button type="submit" className="bg-terracota text-perola px-8 py-3 text-xs uppercase tracking-widest">Save Product</button>
                <button type="button" onClick={() => setIsAdding(false)} className="text-xs uppercase tracking-widest opacity-40">Cancel</button>
              </div>
            </form>
          </div>
        </div>
      )}

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {products.map(product => (
          <div key={product.id} className="bg-white p-6 luxury-shadow flex items-center space-x-6">
            <img src={product.images[0]} className="w-24 h-24 object-cover" loading="lazy" referrerPolicy="no-referrer" alt={product.name} />
            <div className="flex-grow">
              <h3 className="font-serif text-xl">{product.name}</h3>
              <p className="text-terracota font-medium">{formatCurrency(product.price)}</p>
              <p className="text-[10px] opacity-40 uppercase tracking-widest">Stock: {product.stock}</p>
            </div>
            <button onClick={() => handleDelete(product.id)} aria-label={`Delete product ${product.name}`} className="text-red-500 hover:text-red-700">
              <Trash2 size={18} aria-hidden="true" />
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}

function ManageOrders() {
  const [orders, setOrders] = useState<Order[]>([]);

  const fetchOrders = () => {
    const token = localStorage.getItem('wajd_admin_token');
    fetch('/api/orders', {
      headers: { 'Authorization': `Bearer ${token}` }
    }).then(res => res.json()).then(setOrders);
  };

  useEffect(fetchOrders, []);

  const updateStatus = async (id: string, status: string) => {
    const token = localStorage.getItem('wajd_admin_token');
    await fetch(`/api/orders/${id}`, {
      method: 'PATCH',
      headers: { 
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`
      },
      body: JSON.stringify({ status })
    });
    fetchOrders();
  };

  return (
    <div>
      <h1 className="text-4xl font-serif mb-8">Orders</h1>
      <div className="space-y-6">
        {orders.map(order => (
          <div key={order.id} className="bg-white p-8 luxury-shadow">
            <div className="flex justify-between items-start mb-6">
              <div>
                <p className="text-[10px] uppercase tracking-widest opacity-40">Order ID: {order.id}</p>
                <h3 className="text-xl font-serif">{order.customerName}</h3>
                <p className="text-sm opacity-60">{order.customerEmail} | {order.customerPhone}</p>
              </div>
              <div className="text-right flex flex-col items-end">
                <p className="text-xl font-serif text-terracota">{formatCurrency(order.totalAmount)}</p>
                <div className="flex items-center space-x-2 mt-2">
                  <select
                    value={order.status}
                    onChange={e => updateStatus(order.id, e.target.value)}
                    className="text-xs uppercase tracking-widest border border-smoky-black/10 px-3 py-1 focus:outline-none"
                  >
                    <option>PENDING</option>
                    <option>SHIPPED</option>
                    <option>DELIVERED</option>
                  </select>
                  {order.status === 'PENDING' && (
                    <button
                      onClick={() => updateStatus(order.id, 'SHIPPED')}
                      className="bg-terracota text-perola px-3 py-1 text-xs uppercase tracking-widest hover:bg-smoky-black transition-colors"
                    >
                      Mark as Shipped
                    </button>
                  )}
                </div>
              </div>
            </div>
            <div className="border-t border-smoky-black/5 pt-4">
              <p className="text-[10px] uppercase tracking-widest opacity-40 mb-2">Items</p>
              <div className="space-y-2">
                {order.items.map(item => (
                  <div key={item.id} className="flex justify-between text-sm">
                    <span>{item.product.name} x {item.quantity}</span>
                    <span>{formatCurrency(item.price * item.quantity)}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

function ManageInquiries() {
  const [inquiries, setInquiries] = useState<Inquiry[]>([]);

  const fetchInquiries = () => {
    const token = localStorage.getItem('wajd_admin_token');
    fetch('/api/inquiries', {
      headers: { 'Authorization': `Bearer ${token}` }
    }).then(res => res.json()).then(setInquiries);
  };

  useEffect(fetchInquiries, []);

  const markAsRead = async (id: string, isRead: boolean) => {
    const token = localStorage.getItem('wajd_admin_token');
    await fetch(`/api/inquiries/${id}`, {
      method: 'PATCH',
      headers: { 
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`
      },
      body: JSON.stringify({ isRead })
    });
    fetchInquiries();
  };

  return (
    <div>
      <h1 className="text-4xl font-serif mb-8">Inquiries</h1>
      <div className="space-y-6">
        {inquiries.map(inquiry => (
          <div key={inquiry.id} className={cn("bg-white p-8 luxury-shadow border-l-4", inquiry.isRead ? "border-transparent" : "border-terracota")}>
            <div className="flex justify-between items-start mb-4">
              <div>
                <h3 className="text-xl font-serif">{inquiry.name}</h3>
                <p className="text-sm opacity-60">{inquiry.email}</p>
              </div>
              <button 
                onClick={() => markAsRead(inquiry.id, !inquiry.isRead)}
                aria-label={inquiry.isRead ? "Mark as unread" : "Mark as read"}
                className="text-smoky-black/30 hover:text-terracota transition-colors"
              >
                {inquiry.isRead ? <CheckCircle size={20} aria-hidden="true" /> : <Clock size={20} aria-hidden="true" />}
              </button>
            </div>
            <p className="text-sm leading-relaxed">{inquiry.message}</p>
            <p className="text-[10px] uppercase tracking-widest opacity-30 mt-4">
              {new Date(inquiry.createdAt).toLocaleDateString()}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
}
