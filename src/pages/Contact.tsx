import { useState } from 'react';
import { motion } from 'motion/react';
import { Mail, Phone, MapPin, Send } from 'lucide-react';

export default function Contact() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: '',
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    try {
      const res = await fetch('/api/inquiries', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });
      if (res.ok) {
        setSubmitted(true);
        setFormData({ name: '', email: '', message: '' });
      }
    } catch (err) {
      console.error(err);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="pt-32 pb-20 px-6 bg-perola min-h-screen">
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-20">
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
          >
            <span className="text-terracota text-xs uppercase tracking-[0.5em] mb-6 block">Get in Touch</span>
            <h1 className="text-5xl md:text-7xl font-serif mb-10">Let's Create <br /> Together</h1>
            <p className="text-smoky-black/60 text-lg mb-12 max-w-md">
              Whether you're looking for a full interior redesign or a single bespoke piece of furniture, we're here to bring your vision to life.
            </p>

            <div className="space-y-8">
              <div className="flex items-start space-x-6">
                <div className="w-12 h-12 rounded-full border border-smoky-black/10 flex items-center justify-center text-terracota">
                  <Mail size={20} />
                </div>
                <div>
                  <h4 className="font-serif text-xl">Email Us</h4>
                  <p className="text-sm opacity-60">hello@wajdstudio.com</p>
                </div>
              </div>
              <div className="flex items-start space-x-6">
                <div className="w-12 h-12 rounded-full border border-smoky-black/10 flex items-center justify-center text-terracota">
                  <Phone size={20} />
                </div>
                <div>
                  <h4 className="font-serif text-xl">Call Us</h4>
                  <p className="text-sm opacity-60">+1 (555) 123-4567</p>
                </div>
              </div>
              <div className="flex items-start space-x-6">
                <div className="w-12 h-12 rounded-full border border-smoky-black/10 flex items-center justify-center text-terracota">
                  <MapPin size={20} />
                </div>
                <div>
                  <h4 className="font-serif text-xl">Visit Us</h4>
                  <p className="text-sm opacity-60">123 Design District, Milan, Italy</p>
                </div>
              </div>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 30 }}
            animate={{ opacity: 1, x: 0 }}
            className="bg-white p-12 luxury-shadow"
          >
            {submitted ? (
              <div className="text-center py-20">
                <div className="w-20 h-20 bg-verde-claro/20 text-verde-claro rounded-full flex items-center justify-center mx-auto mb-8">
                  <Send size={32} />
                </div>
                <h2 className="text-3xl font-serif mb-4">Message Sent</h2>
                <p className="text-sm opacity-60 mb-8">Thank you for reaching out. Our team will contact you shortly.</p>
                <button
                  onClick={() => setSubmitted(false)}
                  className="text-terracota uppercase tracking-widest text-xs font-bold"
                >
                  Send another message
                </button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-8">
                <div>
                  <label htmlFor="contact-name" className="text-[10px] uppercase tracking-widest opacity-40 mb-2 block">Full Name</label>
                  <input
                    id="contact-name"
                    required
                    type="text"
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    className="w-full border-b border-smoky-black/10 py-3 focus:outline-none focus:border-terracota transition-colors"
                  />
                </div>
                <div>
                  <label htmlFor="contact-email" className="text-[10px] uppercase tracking-widest opacity-40 mb-2 block">Email Address</label>
                  <input
                    id="contact-email"
                    required
                    type="email"
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    className="w-full border-b border-smoky-black/10 py-3 focus:outline-none focus:border-terracota transition-colors"
                  />
                </div>
                <div>
                  <label htmlFor="contact-message" className="text-[10px] uppercase tracking-widest opacity-40 mb-2 block">Your Message</label>
                  <textarea
                    id="contact-message"
                    required
                    rows={4}
                    value={formData.message}
                    onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                    className="w-full border-b border-smoky-black/10 py-3 focus:outline-none focus:border-terracota transition-colors resize-none"
                  />
                </div>
                <button
                  disabled={isSubmitting}
                  className="w-full bg-smoky-black text-perola py-5 uppercase tracking-widest text-xs hover:bg-terracota transition-all duration-500 luxury-shadow disabled:opacity-50"
                >
                  {isSubmitting ? 'Sending...' : 'Send Message'}
                </button>
              </form>
            )}
          </motion.div>
        </div>
      </div>
    </div>
  );
}
