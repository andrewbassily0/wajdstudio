import { useState } from 'react';
import { motion } from 'motion/react';
import { Search, Package, Truck, CheckCircle, Clock } from 'lucide-react';
import { Order } from '../types';
import { formatCurrency } from '../lib/utils';

export default function OrderTracking() {
  const [orderId, setOrderId] = useState('');
  const [order, setOrder] = useState<Order | null>(null);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleTrack = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!orderId.trim()) return;

    setLoading(true);
    setError('');
    setOrder(null);

    try {
      const res = await fetch(`/api/orders/${orderId.trim()}`);
      if (res.ok) {
        const data = await res.json();
        setOrder(data);
      } else {
        setError('Order not found. Please check your Order ID and try again.');
      }
    } catch (err) {
      setError('An error occurred while fetching your order. Please try again later.');
    } finally {
      setLoading(false);
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'PENDING': return <Clock size={24} className="text-smoky-black/40" />;
      case 'SHIPPED': return <Truck size={24} className="text-terracota" />;
      case 'DELIVERED': return <CheckCircle size={24} className="text-verde-claro" />;
      default: return <Package size={24} className="text-smoky-black/40" />;
    }
  };

  const getStatusText = (status: string) => {
    switch (status) {
      case 'PENDING': return 'Order Processing';
      case 'SHIPPED': return 'On the Way';
      case 'DELIVERED': return 'Delivered';
      default: return 'Unknown Status';
    }
  };

  return (
    <div className="pt-32 pb-20 px-6 bg-perola min-h-screen">
      <div className="max-w-3xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-16"
        >
          <span className="text-terracota text-xs uppercase tracking-[0.5em] mb-4 block">Track Your Order</span>
          <h1 className="text-4xl md:text-6xl font-serif mb-6">Where is my order?</h1>
          <p className="text-smoky-black/60 max-w-md mx-auto">
            Enter your order ID below to see the current status and shipping details of your purchase.
          </p>
        </motion.div>

        <div className="bg-white p-8 md:p-12 luxury-shadow mb-12">
          <form onSubmit={handleTrack} className="flex flex-col md:flex-row gap-4">
            <div className="relative flex-grow">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-smoky-black/30" size={20} />
              <input
                type="text"
                aria-label="Order ID"
                placeholder="Enter your Order ID (e.g., cm...)"
                value={orderId}
                onChange={(e) => setOrderId(e.target.value)}
                className="w-full pl-12 pr-4 py-4 border border-smoky-black/10 focus:outline-none focus:border-terracota transition-colors"
                required
              />
            </div>
            <button
              type="submit"
              disabled={loading}
              className="bg-smoky-black text-perola px-8 py-4 uppercase tracking-widest text-xs hover:bg-terracota transition-all duration-500 whitespace-nowrap disabled:opacity-50"
            >
              {loading ? 'Tracking...' : 'Track Order'}
            </button>
          </form>

          {error && (
            <div className="mt-6 p-4 bg-red-50 border-l-2 border-red-500 text-red-600 text-sm">
              {error}
            </div>
          )}
        </div>

        {order && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="bg-white p-8 md:p-12 luxury-shadow"
          >
            <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-10 pb-10 border-b border-smoky-black/5 gap-6">
              <div>
                <p className="text-[10px] uppercase tracking-widest opacity-40 mb-1">Order Number</p>
                <p className="font-mono text-sm">{order.id}</p>
              </div>
              <div className="flex items-center space-x-4 bg-perola px-6 py-3">
                {getStatusIcon(order.status)}
                <div>
                  <p className="text-[10px] uppercase tracking-widest opacity-40 mb-1">Current Status</p>
                  <p className="font-serif text-lg text-terracota">{getStatusText(order.status)}</p>
                </div>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-12 mb-10">
              <div>
                <h3 className="font-serif text-xl mb-6">Shipping Details</h3>
                <div className="space-y-4 text-sm opacity-80">
                  <p><span className="opacity-60 block text-[10px] uppercase tracking-widest mb-1">Name</span> {order.customerName}</p>
                  <p><span className="opacity-60 block text-[10px] uppercase tracking-widest mb-1">Email</span> {order.customerEmail}</p>
                  <p><span className="opacity-60 block text-[10px] uppercase tracking-widest mb-1">Phone</span> {order.customerPhone}</p>
                </div>
              </div>
              <div>
                <h3 className="font-serif text-xl mb-6">Order Summary</h3>
                <div className="space-y-4">
                  {order.items.map((item) => (
                    <div key={item.id} className="flex justify-between items-center text-sm">
                      <div className="flex items-center space-x-4">
                        <img 
                          src={item.product.images[0]} 
                          alt={item.product.name} 
                          className="w-12 h-12 object-cover bg-perola"
                          loading="lazy"
                          referrerPolicy="no-referrer"
                        />
                        <span>{item.product.name} <span className="opacity-40">x{item.quantity}</span></span>
                      </div>
                      <span className="opacity-80">{formatCurrency(item.price * item.quantity)}</span>
                    </div>
                  ))}
                </div>
                <div className="mt-6 pt-6 border-t border-smoky-black/5 flex justify-between items-center font-serif text-xl">
                  <span>Total</span>
                  <span className="text-terracota">{formatCurrency(order.totalAmount)}</span>
                </div>
              </div>
            </div>
          </motion.div>
        )}
      </div>
    </div>
  );
}
