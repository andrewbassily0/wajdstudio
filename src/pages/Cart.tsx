import { motion } from 'motion/react';
import { useCart } from '../store/useCart';
import { formatCurrency } from '../lib/utils';
import { Trash2, Plus, Minus, ArrowRight, ShoppingBag } from 'lucide-react';
import { Link, useNavigate } from 'react-router-dom';
import { useState } from 'react';

export default function Cart() {
  const { items, removeItem, updateQuantity, clearCart } = useCart();
  const navigate = useNavigate();
  const [isCheckingOut, setIsCheckingOut] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
  });

  const total = items.reduce((acc, item) => acc + item.price * item.quantity, 0);

  const handleCheckout = async (e: React.FormEvent) => {
    e.preventDefault();
    const orderData = {
      customerName: formData.name,
      customerEmail: formData.email,
      customerPhone: formData.phone,
      totalAmount: total,
      items: items.map(item => ({
        productId: item.id,
        quantity: item.quantity,
        price: item.price
      }))
    };

    try {
      const res = await fetch('/api/orders', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(orderData)
      });
      if (res.ok) {
        clearCart();
        alert('Order placed successfully! We will contact you soon.');
        navigate('/');
      }
    } catch (err) {
      console.error(err);
    }
  };

  if (items.length === 0) {
    return (
      <div className="pt-40 pb-20 px-6 text-center bg-perola min-h-screen">
        <div className="max-w-md mx-auto">
          <ShoppingBag size={64} className="mx-auto mb-8 text-smoky-black/10" strokeWidth={1} />
          <h1 className="text-4xl font-serif mb-6">Your cart is empty</h1>
          <p className="text-smoky-black/60 mb-10">Discover our handcrafted collection and find something you love.</p>
          <Link
            to="/store"
            className="inline-block bg-terracota text-perola px-10 py-4 uppercase tracking-widest text-xs hover:bg-kobe transition-all duration-500"
          >
            Continue Shopping
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="pt-32 pb-20 px-6 bg-perola min-h-screen">
      <div className="max-w-7xl mx-auto">
        <h1 className="text-5xl font-serif mb-16">Shopping Cart</h1>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-16">
          <div className="lg:col-span-2 space-y-8">
            {items.map((item) => (
              <motion.div
                key={item.id}
                layout
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="flex flex-col sm:flex-row items-center gap-8 p-6 bg-white luxury-shadow"
              >
                <div className="w-32 h-32 flex-shrink-0 bg-perola">
                  <img
                    src={item.images[0]}
                    alt={item.name}
                    className="w-full h-full object-cover"
                    referrerPolicy="no-referrer"
                    loading="lazy"
                  />
                </div>
                <div className="flex-grow text-center sm:text-left">
                  <span className="text-[10px] uppercase tracking-widest text-smoky-black/40 mb-1 block">{item.category}</span>
                  <h3 className="text-xl font-serif mb-2">{item.name}</h3>
                  <p className="text-terracota font-medium">{formatCurrency(item.price)}</p>
                </div>
                <div className="flex items-center space-x-4">
                  <div className="flex items-center border border-smoky-black/10">
                    <button
                      onClick={() => updateQuantity(item.id, Math.max(1, item.quantity - 1))}
                      aria-label={`Decrease quantity of ${item.name}`}
                      className="p-2 hover:bg-perola transition-colors"
                    >
                      <Minus size={14} aria-hidden="true" />
                    </button>
                    <span className="w-10 text-center text-sm" aria-live="polite">{item.quantity}</span>
                    <button
                      onClick={() => updateQuantity(item.id, item.quantity + 1)}
                      aria-label={`Increase quantity of ${item.name}`}
                      className="p-2 hover:bg-perola transition-colors"
                    >
                      <Plus size={14} aria-hidden="true" />
                    </button>
                  </div>
                  <button
                    onClick={() => removeItem(item.id)}
                    aria-label={`Remove ${item.name} from cart`}
                    className="text-smoky-black/30 hover:text-red-500 transition-colors"
                  >
                    <Trash2 size={18} aria-hidden="true" />
                  </button>
                </div>
              </motion.div>
            ))}
          </div>

          <div className="lg:col-span-1">
            <div className="bg-white p-8 luxury-shadow sticky top-32">
              <h2 className="text-2xl font-serif mb-8">Order Summary</h2>
              <div className="space-y-4 mb-8">
                <div className="flex justify-between text-sm opacity-60">
                  <span>Subtotal</span>
                  <span>{formatCurrency(total)}</span>
                </div>
                <div className="flex justify-between text-sm opacity-60">
                  <span>Shipping</span>
                  <span>Calculated at next step</span>
                </div>
                <div className="pt-4 border-t border-smoky-black/5 flex justify-between font-bold text-lg">
                  <span>Total</span>
                  <span className="text-terracota">{formatCurrency(total)}</span>
                </div>
              </div>

              {!isCheckingOut ? (
                <button
                  onClick={() => setIsCheckingOut(true)}
                  className="w-full bg-smoky-black text-perola py-4 uppercase tracking-widest text-xs hover:bg-terracota transition-all duration-500"
                >
                  Proceed to Checkout
                </button>
              ) : (
                <form onSubmit={handleCheckout} className="space-y-4">
                  <div>
                    <label htmlFor="checkout-name" className="sr-only">Full Name</label>
                    <input
                      id="checkout-name"
                      required
                      type="text"
                      placeholder="Full Name"
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                      className="w-full px-4 py-3 border border-smoky-black/10 focus:outline-none focus:border-terracota text-sm"
                    />
                  </div>
                  <div>
                    <label htmlFor="checkout-email" className="sr-only">Email Address</label>
                    <input
                      id="checkout-email"
                      required
                      type="email"
                      placeholder="Email Address"
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      className="w-full px-4 py-3 border border-smoky-black/10 focus:outline-none focus:border-terracota text-sm"
                    />
                  </div>
                  <div>
                    <label htmlFor="checkout-phone" className="sr-only">Phone Number</label>
                    <input
                      id="checkout-phone"
                      required
                      type="tel"
                      placeholder="Phone Number"
                      value={formData.phone}
                      onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                      className="w-full px-4 py-3 border border-smoky-black/10 focus:outline-none focus:border-terracota text-sm"
                    />
                  </div>
                  <button
                    type="submit"
                    className="w-full bg-terracota text-perola py-4 uppercase tracking-widest text-xs hover:bg-kobe transition-all duration-500 luxury-shadow"
                  >
                    Place Order
                  </button>
                  <button
                    type="button"
                    onClick={() => setIsCheckingOut(false)}
                    className="w-full text-xs uppercase tracking-widest opacity-40 hover:opacity-100 transition-opacity"
                  >
                    Back to Summary
                  </button>
                </form>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
