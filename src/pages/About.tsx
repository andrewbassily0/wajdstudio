import { motion } from 'motion/react';

export default function About() {
  return (
    <div className="pt-32 pb-20 bg-perola">
      <section className="px-6 mb-32">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-20 items-center">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
            >
              <span className="text-terracota text-xs uppercase tracking-[0.5em] mb-6 block">Our Story</span>
              <h1 className="text-5xl md:text-8xl font-serif mb-10 leading-tight">WAJD</h1>
              <p className="text-xl font-serif italic text-terracota mb-8">"Profound love, longing, and spiritual passion."</p>
              <div className="space-y-6 text-smoky-black/70 leading-relaxed text-lg">
                <p>
                  Founded in the heart of design excellence, WAJD Studio was born from a desire to infuse 
                  emotional depth into the spaces we inhabit. The word "Wajd" captures the essence of 
                  devotion—a feeling we bring to every sketch, every joint, and every finished room.
                </p>
                <p>
                  Our sub-brand, WAJD WOOD, represents our commitment to the raw beauty of nature. 
                  Each piece of furniture is handcrafted using sustainable materials and traditional 
                  techniques, ensuring that your home is filled with pieces that are as enduring as 
                  they are beautiful.
                </p>
              </div>
            </motion.div>
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 1 }}
              className="relative"
            >
              <img
                src="https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?auto=format&fit=crop&q=80&w=1000"
                alt="Studio"
                className="w-full h-full object-cover luxury-shadow"
                referrerPolicy="no-referrer"
                loading="lazy"
              />
            </motion.div>
          </div>
        </div>
      </section>

      <section className="bg-smoky-black text-perola py-32 px-6">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-4xl md:text-6xl font-serif mb-12">Our Philosophy</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
            <div>
              <h3 className="text-terracota text-2xl font-serif mb-4">Soul</h3>
              <p className="text-sm opacity-60">Designing with intention to evoke emotion and connection.</p>
            </div>
            <div>
              <h3 className="text-terracota text-2xl font-serif mb-4">Craft</h3>
              <p className="text-sm opacity-60">Mastering traditional techniques with a modern luxury lens.</p>
            </div>
            <div>
              <h3 className="text-terracota text-2xl font-serif mb-4">Legacy</h3>
              <p className="text-sm opacity-60">Creating timeless pieces and spaces that endure for generations.</p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
