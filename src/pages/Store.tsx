import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Link } from 'react-router-dom';
import { Product } from '../types';
import { ShoppingBag, Search, SlidersHorizontal } from 'lucide-react';
import { useCart } from '../store/useCart';
import { formatCurrency } from '../lib/utils';

export default function Store() {
  const [products, setProducts] = useState<Product[]>([]);
  const [filter, setFilter] = useState('All');
  const [search, setSearch] = useState('');
  const [loading, setLoading] = useState(true);
  const { addItem } = useCart();

  useEffect(() => {
    fetch('/api/products')
      .then(res => res.json())
      .then(data => {
        setProducts(data);
        setLoading(false);
      });
  }, []);

  const categories = ['All', 'Furniture', 'Decor', 'Lighting', 'Textiles'];
  const filteredProducts = products.filter(p => {
    const matchesFilter = filter === 'All' || p.category === filter;
    const matchesSearch = p.name.toLowerCase().includes(search.toLowerCase());
    return matchesFilter && matchesSearch;
  });

  return (
    <div className="pt-32 pb-20 px-6 bg-perola min-h-screen">
      <div className="max-w-7xl mx-auto">
        <header className="mb-16">
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-8">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
            >
              <span className="text-terracota text-xs uppercase tracking-[0.5em] mb-4 block">WAJD WOOD</span>
              <h1 className="text-5xl md:text-7xl font-serif">The Collection</h1>
            </motion.div>
            
            <div className="flex flex-col md:flex-row gap-4 w-full md:w-auto">
              <div className="relative">
                <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-smoky-black/30" size={18} />
                <input
                  type="text"
                  aria-label="Search products"
                  placeholder="Search products..."
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                  className="pl-12 pr-6 py-3 bg-white/50 border border-smoky-black/5 focus:outline-none focus:border-terracota w-full md:w-64 transition-colors"
                />
              </div>
              <div className="flex items-center space-x-4 overflow-x-auto no-scrollbar pb-2 md:pb-0">
                {categories.map((cat) => (
                  <button
                    key={cat}
                    onClick={() => setFilter(cat)}
                    aria-pressed={filter === cat}
                    className={`px-6 py-3 text-xs uppercase tracking-widest transition-all duration-300 border ${
                      filter === cat 
                        ? 'bg-smoky-black text-perola border-smoky-black' 
                        : 'bg-white/50 text-smoky-black border-smoky-black/5 hover:border-terracota'
                    }`}
                  >
                    {cat}
                  </button>
                ))}
              </div>
            </div>
          </div>
        </header>

        {loading ? (
          <div className="flex justify-center py-20">
            <div className="w-10 h-10 border-2 border-terracota border-t-transparent rounded-full animate-spin" />
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
            <AnimatePresence mode="popLayout">
              {filteredProducts.map((product, i) => (
                <motion.div
                  key={product.id}
                  layout
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, scale: 0.9 }}
                  transition={{ duration: 0.5, delay: i * 0.05 }}
                  className="group"
                >
                  <Link to={`/store/${product.id}`} className="block">
                    <div className="aspect-square bg-white overflow-hidden mb-6 luxury-shadow relative">
                      <img
                        src={product.images[0]}
                        alt={product.name}
                        className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                        referrerPolicy="no-referrer"
                        loading="lazy"
                      />
                      <div className="absolute inset-0 bg-smoky-black/0 group-hover:bg-smoky-black/5 transition-colors duration-500" />
                      <button
                        onClick={(e) => {
                          e.preventDefault();
                          addItem(product);
                        }}
                        aria-label={`Add ${product.name} to cart`}
                        className="absolute bottom-4 right-4 bg-perola text-smoky-black p-4 luxury-shadow translate-y-20 group-hover:translate-y-0 focus-visible:translate-y-0 transition-transform duration-500 hover:bg-terracota hover:text-perola"
                      >
                        <ShoppingBag size={20} strokeWidth={1.5} aria-hidden="true" />
                      </button>
                    </div>
                    <div className="text-center">
                      <span className="text-[10px] uppercase tracking-widest text-smoky-black/40 mb-2 block">{product.category}</span>
                      <h3 className="text-lg font-serif mb-2 group-hover:text-terracota transition-colors">{product.name}</h3>
                      <p className="text-terracota font-medium">{formatCurrency(product.price)}</p>
                    </div>
                  </Link>
                </motion.div>
              ))}
            </AnimatePresence>
          </div>
        )}

        {!loading && filteredProducts.length === 0 && (
          <div className="text-center py-20 opacity-40 italic font-serif">
            No products found matching your criteria.
          </div>
        )}
      </div>
    </div>
  );
}
