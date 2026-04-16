import { Link } from 'react-router-dom';
import { Instagram, Facebook, Mail, Phone, MapPin } from 'lucide-react';

export default function Footer() {
  return (
    <footer className="bg-smoky-black text-perola pt-20 pb-10 px-6">
      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-4 gap-12 mb-20">
        <div className="col-span-1 md:col-span-1">
          <Link to="/" className="flex flex-col mb-6">
            <span className="text-3xl font-serif tracking-widest">WAJD</span>
            <span className="text-xs tracking-[0.4em] uppercase opacity-60 -mt-1">Studio</span>
          </Link>
          <p className="text-sm opacity-60 leading-relaxed max-w-xs">
            Rooted in profound love and refined craftsmanship, we create spaces and furniture that tell your unique story.
          </p>
        </div>

        <div>
          <h4 className="font-serif text-xl mb-6">Quick Links</h4>
          <ul className="space-y-4 text-sm opacity-60">
            <li><Link to="/portfolio" className="hover:text-terracota transition-colors">Portfolio</Link></li>
            <li><Link to="/store" className="hover:text-terracota transition-colors">WAJD WOOD Store</Link></li>
            <li><Link to="/about" className="hover:text-terracota transition-colors">Our Story</Link></li>
            <li><Link to="/contact" className="hover:text-terracota transition-colors">Contact Us</Link></li>
            <li><Link to="/track" className="hover:text-terracota transition-colors">Track Order</Link></li>
          </ul>
        </div>

        <div>
          <h4 className="font-serif text-xl mb-6">Contact</h4>
          <ul className="space-y-4 text-sm opacity-60">
            <li className="flex items-center space-x-3">
              <Phone size={16} />
              <span>+1 (555) 123-4567</span>
            </li>
            <li className="flex items-center space-x-3">
              <Mail size={16} />
              <span>hello@wajdstudio.com</span>
            </li>
            <li className="flex items-center space-x-3">
              <MapPin size={16} />
              <span>123 Design District, Milan, Italy</span>
            </li>
          </ul>
        </div>

        <div>
          <h4 className="font-serif text-xl mb-6">Newsletter</h4>
          <p className="text-sm opacity-60 mb-4">Join our inner circle for design inspiration and early access.</p>
          <form className="flex">
            <input
              type="email"
              aria-label="Email address for newsletter"
              placeholder="Your email"
              className="bg-white/5 border border-white/10 px-4 py-2 text-sm w-full focus:outline-none focus:border-terracota transition-colors"
            />
            <button type="submit" className="bg-terracota px-6 py-2 text-sm uppercase tracking-widest hover:bg-kobe transition-colors">
              Join
            </button>
          </form>
        </div>
      </div>

      <div className="max-w-7xl mx-auto pt-10 border-t border-white/5 flex flex-col md:row justify-between items-center space-y-4 md:space-y-0">
        <p className="text-[10px] uppercase tracking-widest opacity-40">
          © 2024 WAJD Studio. All rights reserved.
        </p>
        <div className="flex space-x-6 opacity-40">
          <a href="#" aria-label="Instagram" className="hover:text-terracota transition-colors">
            <Instagram size={18} aria-hidden="true" />
          </a>
          <a href="#" aria-label="Facebook" className="hover:text-terracota transition-colors">
            <Facebook size={18} aria-hidden="true" />
          </a>
        </div>
      </div>
    </footer>
  );
}
