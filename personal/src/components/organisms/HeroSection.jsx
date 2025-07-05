import { motion } from 'framer-motion';

const HeroSection = () => {
  return (
    <section className="relative min-h-screen flex items-center justify-center px-4 pt-32 pb-16">
      <div className="max-w-4xl mx-auto text-center">
        <motion.h1
          className="text-5xl md:text-7xl font-bold text-white mb-6 leading-tight"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
        >
          Creative Webflow development wizard
        </motion.h1>
        
        <motion.p
          className="text-xl md:text-2xl text-gray-300 mb-12 max-w-3xl mx-auto"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: "easeOut", delay: 0.2 }}
        >
          Helping agencies deliver pixel perfect Webflow websites without the overhead of an in-house team.
        </motion.p>
        
        <div className="flex flex-col sm:flex-row justify-center items-center gap-4">
          <motion.a
            href="#"
            className="bg-white text-black font-medium px-8 py-4 rounded-full hover:bg-gray-200 transition-colors duration-300 text-lg"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: "easeOut", delay: 0.4 }}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            Work with me →
          </motion.a>
          
          <motion.a
            href="#"
            className="text-white font-medium px-8 py-4 rounded-full hover:bg-white/10 transition-colors duration-300 text-lg border border-white/20"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: "easeOut", delay: 0.5 }}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            Premium Partner
          </motion.a>
        </div>
        
        <motion.div
          className="mt-20 text-gray-400 flex flex-col sm:flex-row justify-center items-center gap-2"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8, ease: "easeOut", delay: 0.6 }}
        >
          <span>548 successful projects.</span>
          <a href="#" className="underline hover:text-white transition-colors">Avoid testimonials →</a>
        </motion.div>
      </div>
    </section>
  );
};

export default HeroSection;