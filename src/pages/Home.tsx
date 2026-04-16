import { motion } from 'motion/react';
import { ArrowRight, Star, Award, Heart } from 'lucide-react';
import { Link } from 'react-router-dom';

export default function Home() {
  return (
    <div className="overflow-hidden">
      {/* Hero Section */}
      <section className="relative h-screen flex items-center justify-center">
        <div className="absolute inset-0 z-0">
          <img
            src="https://images.unsplash.com/photo-1618221195710-dd6b41faaea6?auto=format&fit=crop&q=80&w=2000"
            alt="Luxury Interior"
            className="w-full h-full object-cover"
            referrerPolicy="no-referrer"
            loading="lazy"
          />
          <div className="absolute inset-0 bg-smoky-black/40" />
        </div>

        <div className="relative z-10 text-center px-6">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, ease: "easeOut" }}
          >
            <span className="text-perola text-xs uppercase tracking-[0.5em] mb-6 block">Interior Design & Furniture</span>
            <h1 className="text-5xl md:text-8xl font-serif text-perola mb-8 leading-tight">
              Where Every Detail <br /> Tells a Love Story
            </h1>
            <div className="flex flex-col md:flex-row items-center justify-center space-y-4 md:space-y-0 md:space-x-6">
              <Link
                to="/portfolio"
                className="bg-terracota text-perola px-10 py-4 uppercase tracking-widest text-xs hover:bg-kobe transition-all duration-500 luxury-shadow"
              >
                Explore Portfolio
              </Link>
              <Link
                to="/store"
                className="border border-perola text-perola px-10 py-4 uppercase tracking-widest text-xs hover:bg-perola hover:text-smoky-black transition-all duration-500"
              >
                Shop WAJD WOOD
              </Link>
            </div>
          </motion.div>
        </div>

        <motion.div
          animate={{ y: [0, 10, 0] }}
          transition={{ duration: 2, repeat: Infinity }}
          className="absolute bottom-10 left-1/2 -translate-x-1/2 text-perola opacity-60"
        >
          <div className="w-[1px] h-12 bg-perola mx-auto" />
        </motion.div>
      </section>

      {/* Philosophy Section */}
      <section className="py-32 px-6 bg-perola">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-20 items-center">
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
            >
              <span className="text-terracota text-xs uppercase tracking-widest mb-4 block">Our Essence</span>
              <h2 className="text-4xl md:text-6xl font-serif mb-8 leading-tight">
                The Art of Wajd: <br /> Passion in Every Curve
              </h2>
              <p className="text-smoky-black/70 leading-relaxed mb-8 text-lg">
                "Wajd" is more than a name; it's a spiritual journey of profound love and longing. 
                We translate this emotional depth into physical spaces and handcrafted furniture 
                that resonate with the soul.
              </p>
              <Link to="/about" className="group flex items-center text-sm uppercase tracking-widest font-medium">
                Read Our Story <ArrowRight className="ml-2 group-hover:translate-x-2 transition-transform" size={16} />
              </Link>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 1 }}
              className="relative"
            >
              <div className="aspect-[4/5] overflow-hidden luxury-shadow">
                <img
                  src="https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&q=80&w=1000"
                  alt="Craftsmanship"
                  className="w-full h-full object-cover"
                  referrerPolicy="no-referrer"
                  loading="lazy"
                />
              </div>
              <div className="absolute -bottom-10 -left-10 bg-bege-rose p-10 hidden md:block luxury-shadow">
                <div className="flex items-center space-x-4 mb-4">
                  <Award className="text-terracota" size={24} />
                  <span className="text-xs uppercase tracking-widest font-bold">Excellence</span>
                </div>
                <p className="text-sm font-serif italic">"Crafting legacies, one piece at a time."</p>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Services Grid */}
      <section className="py-32 px-6 bg-smoky-black text-perola">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-20">
            <span className="text-terracota text-xs uppercase tracking-widest mb-4 block">Expertise</span>
            <h2 className="text-4xl md:text-6xl font-serif">Our Services</h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              {
                title: 'Interior Architecture',
                desc: 'Structural elegance meets functional brilliance. We redefine the bones of your space.',
                icon: <Star size={32} strokeWidth={1} />,
              },
              {
                title: 'Bespoke Furniture',
                desc: 'WAJD WOOD creations tailored to your dimensions and desires.',
                icon: <Award size={32} strokeWidth={1} />,
              },
              {
                title: 'Art Curation',
                desc: 'Selecting pieces that breathe life and emotion into your environment.',
                icon: <Heart size={32} strokeWidth={1} />,
              },
            ].map((service, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.2 }}
                className="p-12 border border-perola/10 hover:border-terracota transition-colors group"
              >
                <div className="text-terracota mb-8 group-hover:scale-110 transition-transform duration-500">
                  {service.icon}
                </div>
                <h3 className="text-2xl font-serif mb-4">{service.title}</h3>
                <p className="text-perola/60 text-sm leading-relaxed">{service.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Featured Projects Slider (Simplified for now) */}
      <section className="py-32 px-6 bg-perola overflow-hidden">
        <div className="max-w-7xl mx-auto flex justify-between items-end mb-16">
          <div>
            <span className="text-terracota text-xs uppercase tracking-widest mb-4 block">Portfolio</span>
            <h2 className="text-4xl md:text-6xl font-serif">Signature Projects</h2>
          </div>
          <Link to="/portfolio" className="text-sm uppercase tracking-widest hover:text-terracota transition-colors hidden md:block">
            View All Projects
          </Link>
        </div>

        <div className="flex space-x-8 overflow-x-auto pb-10 no-scrollbar">
          {[
            'https://images.unsplash.com/photo-1600210492486-724fe5c67fb0',
            'https://images.unsplash.com/photo-1600607687920-4e2a09cf159d',
            'https://images.unsplash.com/photo-1600566753190-17f0baa2a6c3',
          ].map((img, i) => (
            <motion.div
              key={i}
              whileHover={{ y: -10 }}
              className="min-w-[300px] md:min-w-[500px] aspect-[16/10] relative group cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-terracota focus-visible:ring-offset-2 focus-visible:ring-offset-perola rounded-sm"
              tabIndex={0}
              role="button"
              aria-label={`View details for Project ${i + 1}`}
            >
              <img
                src={`${img}?auto=format&fit=crop&q=80&w=1000`}
                alt={`Project ${i + 1}`}
                className="w-full h-full object-cover luxury-shadow"
                referrerPolicy="no-referrer"
                loading="lazy"
              />
              <div className="absolute inset-0 bg-smoky-black/60 opacity-0 group-hover:opacity-100 transition-opacity duration-500 flex items-center justify-center">
                <div className="text-center">
                  <h4 className="text-perola font-serif text-2xl mb-2">The Emerald Villa</h4>
                  <span className="text-perola/60 text-xs uppercase tracking-widest">Modern Classic</span>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-32 px-6 bg-bege-rose relative overflow-hidden">
        <div className="max-w-4xl mx-auto text-center relative z-10">
          <h2 className="text-4xl md:text-7xl font-serif mb-10 leading-tight">
            Ready to Start Your <br /> Love Story?
          </h2>
          <p className="text-smoky-black/70 mb-12 text-lg max-w-2xl mx-auto">
            Let's collaborate to create a space that reflects your essence and inspires your soul.
          </p>
          <Link
            to="/contact"
            className="inline-block bg-smoky-black text-perola px-12 py-5 uppercase tracking-widest text-xs hover:bg-terracota transition-all duration-500 luxury-shadow"
          >
            Book a Consultation
          </Link>
        </div>
        <div className="absolute top-0 right-0 w-64 h-64 bg-terracota/5 rounded-full -translate-y-1/2 translate-x-1/2" />
        <div className="absolute bottom-0 left-0 w-96 h-96 bg-azul-golfinho/5 rounded-full translate-y-1/2 -translate-x-1/2" />
      </section>
    </div>
  );
}
