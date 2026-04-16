import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Project } from '../types';
import { ArrowRight } from 'lucide-react';

export default function Portfolio() {
  const [projects, setProjects] = useState<Project[]>([]);
  const [filter, setFilter] = useState('All');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch('/api/projects')
      .then(res => res.json())
      .then(data => {
        setProjects(data);
        setLoading(false);
      });
  }, []);

  const categories = ['All', 'Classic', 'Modern', 'Minimalist', 'Commercial'];
  const filteredProjects = filter === 'All' 
    ? projects 
    : projects.filter(p => p.category === filter);

  return (
    <div className="pt-32 pb-20 px-6 bg-perola min-h-screen">
      <div className="max-w-7xl mx-auto">
        <header className="mb-20 text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
          >
            <span className="text-terracota text-xs uppercase tracking-[0.5em] mb-4 block">Our Work</span>
            <h1 className="text-5xl md:text-7xl font-serif mb-8">Portfolio</h1>
            <div className="flex flex-wrap justify-center gap-6 md:gap-12">
              {categories.map((cat) => (
                <button
                  key={cat}
                  onClick={() => setFilter(cat)}
                  aria-pressed={filter === cat}
                  className={`text-xs uppercase tracking-widest transition-all duration-300 relative pb-2 ${
                    filter === cat ? 'text-terracota' : 'text-smoky-black/40 hover:text-smoky-black'
                  }`}
                >
                  {cat}
                  {filter === cat && (
                    <motion.div
                      layoutId="activeFilter"
                      className="absolute bottom-0 left-0 w-full h-[1px] bg-terracota"
                    />
                  )}
                </button>
              ))}
            </div>
          </motion.div>
        </header>

        {loading ? (
          <div className="flex justify-center py-20">
            <div className="w-10 h-10 border-2 border-terracota border-t-transparent rounded-full animate-spin" />
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
            <AnimatePresence mode="popLayout">
              {filteredProjects.map((project, i) => (
                <motion.div
                  key={project.id}
                  layout
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.9 }}
                  transition={{ duration: 0.5, delay: i * 0.1 }}
                  className="group cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-terracota focus-visible:ring-offset-2 focus-visible:ring-offset-perola rounded-sm"
                  tabIndex={0}
                  role="button"
                  aria-label={`View project: ${project.title}`}
                >
                  <div className="aspect-[16/10] overflow-hidden mb-6 luxury-shadow relative">
                    <img
                      src={project.images[0]}
                      alt={project.title}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                      referrerPolicy="no-referrer"
                      loading="lazy"
                    />
                    <div className="absolute inset-0 bg-smoky-black/20 group-hover:bg-smoky-black/40 transition-colors duration-500" />
                  </div>
                  <div className="flex justify-between items-start">
                    <div>
                      <span className="text-[10px] uppercase tracking-widest text-terracota mb-2 block">{project.category}</span>
                      <h3 className="text-2xl font-serif group-hover:text-terracota transition-colors">{project.title}</h3>
                    </div>
                    <div className="w-10 h-10 rounded-full border border-smoky-black/10 flex items-center justify-center group-hover:bg-terracota group-hover:border-terracota group-hover:text-perola transition-all duration-500">
                      <ArrowRight size={16} />
                    </div>
                  </div>
                </motion.div>
              ))}
            </AnimatePresence>
          </div>
        )}

        {!loading && filteredProjects.length === 0 && (
          <div className="text-center py-20 opacity-40 italic font-serif">
            No projects found in this category yet.
          </div>
        )}
      </div>
    </div>
  );
}
