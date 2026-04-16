import { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { motion } from 'motion/react';
import { ShoppingBag, ArrowLeft } from 'lucide-react';
import { Product } from '../types';
import { useCart } from '../store/useCart';
import { formatCurrency } from '../lib/utils';

interface ProductWithRelated extends Product {
  related: Product[];
}

export default function ProductDetail() {
  const { id } = useParams<{ id: string }>();
  const [product, setProduct] = useState<ProductWithRelated | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const { addItem } = useCart();

  useEffect(() => {
    setLoading(true);
    fetch(`/api/products/${id}`)
      .then(res => {
        if (!res.ok) throw new Error('Product not found');
        return res.json();
      })
      .then(data => {
        setProduct(data);
        setLoading(false);
      })
      .catch(err => {
        setError(err.message);
        setLoading(false);
      });
  }, [id]);

  if (loading) {
    return (
      <div className="pt-32 pb-20 px-6 bg-perola min-h-screen flex justify-center items-center">
        <div className="w-10 h-10 border-2 border-terracota border-t-transparent rounded-full animate-spin" />
      </div>
    );
  }

  if (error || !product) {
    return (
      <div className="pt-32 pb-20 px-6 bg-perola min-h-screen flex flex-col items-center justify-center">
        <h1 className="text-4xl font-serif mb-6">Product Not Found</h1>
        <Link to="/store" className="text-terracota uppercase tracking-widest text-xs hover:underline flex items-center space-x-2">
          <ArrowLeft size={16} />
          <span>Back to Store</span>
        </Link>
      </div>
    );
  }

  return (
    <div className="pt-32 pb-20 px-6 bg-perola min-h-screen">
      <div className="max-w-7xl mx-auto">
        <Link to="/store" className="inline-flex items-center space-x-2 text-xs uppercase tracking-widest opacity-60 hover:opacity-100 hover:text-terracota transition-colors mb-12">
          <ArrowLeft size={16} />
          <span>Back to Store</span>
        </Link>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-16 mb-32">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            className="aspect-square bg-white luxury-shadow"
          >
            <img
              src={product.images[0]}
              alt={product.name}
              className="w-full h-full object-cover"
              referrerPolicy="no-referrer"
            />
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            className="flex flex-col justify-center"
          >
            <span className="text-terracota text-xs uppercase tracking-[0.5em] mb-4 block">{product.category}</span>
            <h1 className="text-4xl md:text-6xl font-serif mb-6">{product.name}</h1>
            <p className="text-2xl font-serif text-terracota mb-8">{formatCurrency(product.price)}</p>
            
            <div className="prose prose-sm opacity-80 mb-12 leading-relaxed">
              <p>{product.description}</p>
            </div>

            <button
              onClick={() => addItem(product)}
              className="bg-smoky-black text-perola px-8 py-4 uppercase tracking-widest text-xs hover:bg-terracota transition-all duration-500 flex items-center justify-center space-x-3 w-full md:w-auto"
            >
              <ShoppingBag size={18} />
              <span>Add to Cart</span>
            </button>
          </motion.div>
        </div>

        {product.related && product.related.length > 0 && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
          >
            <div className="text-center mb-12">
              <h2 className="text-3xl md:text-5xl font-serif mb-4">Related Products</h2>
              <p className="text-smoky-black/60">Discover more from our {product.category} collection</p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
              {product.related.map((relatedProduct) => (
                <div key={relatedProduct.id} className="group cursor-pointer">
                  <Link to={`/store/${relatedProduct.id}`} className="block">
                    <div className="aspect-square bg-white overflow-hidden mb-6 luxury-shadow relative">
                      <img
                        src={relatedProduct.images[0]}
                        alt={relatedProduct.name}
                        className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                        referrerPolicy="no-referrer"
                        loading="lazy"
                      />
                      <div className="absolute inset-0 bg-smoky-black/0 group-hover:bg-smoky-black/5 transition-colors duration-500" />
                    </div>
                    <div className="text-center">
                      <span className="text-[10px] uppercase tracking-widest text-smoky-black/40 mb-2 block">{relatedProduct.category}</span>
                      <h3 className="text-lg font-serif mb-2 group-hover:text-terracota transition-colors">{relatedProduct.name}</h3>
                      <p className="text-terracota font-medium">{formatCurrency(relatedProduct.price)}</p>
                    </div>
                  </Link>
                </div>
              ))}
            </div>
          </motion.div>
        )}
      </div>
    </div>
  );
}
