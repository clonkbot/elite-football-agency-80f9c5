import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

// Featured Players Data
const featuredPlayers = [
  {
    id: 1,
    name: 'Marcus Sterling',
    position: 'Forward',
    nationality: 'England',
    age: 24,
    marketValue: '85M',
    image: 'https://images.unsplash.com/photo-1579952363873-27f3bade9f55?w=800&h=1000&fit=crop&crop=top',
  },
  {
    id: 2,
    name: 'Rafael Santos',
    position: 'Midfielder',
    nationality: 'Brazil',
    age: 27,
    marketValue: '72M',
    image: 'https://images.unsplash.com/photo-1431324155629-1a6deb1dec8d?w=800&h=1000&fit=crop&crop=center',
  },
  {
    id: 3,
    name: 'Viktor Kovač',
    position: 'Defender',
    nationality: 'Croatia',
    age: 29,
    marketValue: '48M',
    image: 'https://images.unsplash.com/photo-1574629810360-7efbbe195018?w=800&h=1000&fit=crop&crop=center',
  },
];

const stats = [
  { label: 'Active Clients', value: '127' },
  { label: 'Transfers Completed', value: '340+' },
  { label: 'Total Value Moved', value: '€2.8B' },
  { label: 'Partner Clubs', value: '89' },
];

function App() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [activePlayer, setActivePlayer] = useState(0);
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    setIsLoaded(true);
    const interval = setInterval(() => {
      setActivePlayer((prev) => (prev + 1) % featuredPlayers.length);
    }, 5000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="min-h-screen bg-[#0A0A0A] text-[#F5F0E8] overflow-x-hidden">
      {/* Noise Overlay */}
      <div
        className="fixed inset-0 pointer-events-none opacity-[0.03] z-50"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)'/%3E%3C/svg%3E")`,
        }}
      />

      {/* Navigation */}
      <motion.nav
        initial={{ y: -100 }}
        animate={{ y: isLoaded ? 0 : -100 }}
        transition={{ duration: 0.8, delay: 0.2 }}
        className="fixed top-0 left-0 right-0 z-40 px-4 md:px-8 lg:px-16 py-4 md:py-6"
      >
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2 md:gap-3">
            <div className="w-8 h-8 md:w-10 md:h-10 border border-[#C9A962] rotate-45 flex items-center justify-center">
              <span className="font-serif text-[#C9A962] text-base md:text-lg -rotate-45 font-bold">E</span>
            </div>
            <span className="font-serif text-lg md:text-xl tracking-[0.2em] md:tracking-[0.3em] uppercase">Élite</span>
          </div>

          {/* Desktop Nav */}
          <div className="hidden md:flex items-center gap-8 lg:gap-12">
            {['Players', 'Services', 'About', 'News'].map((item) => (
              <a
                key={item}
                href={`#${item.toLowerCase()}`}
                className="text-xs tracking-[0.2em] uppercase opacity-60 hover:opacity-100 hover:text-[#C9A962] transition-all duration-300"
              >
                {item}
              </a>
            ))}
            <button className="px-5 py-2 lg:px-6 lg:py-2.5 border border-[#C9A962] text-[#C9A962] text-xs tracking-[0.2em] uppercase hover:bg-[#C9A962] hover:text-[#0A0A0A] transition-all duration-300">
              Contact
            </button>
          </div>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            className="md:hidden w-10 h-10 flex flex-col items-center justify-center gap-1.5"
          >
            <span className={`w-6 h-px bg-[#F5F0E8] transition-all duration-300 ${isMenuOpen ? 'rotate-45 translate-y-2' : ''}`} />
            <span className={`w-6 h-px bg-[#F5F0E8] transition-all duration-300 ${isMenuOpen ? 'opacity-0' : ''}`} />
            <span className={`w-6 h-px bg-[#F5F0E8] transition-all duration-300 ${isMenuOpen ? '-rotate-45 -translate-y-2' : ''}`} />
          </button>
        </div>
      </motion.nav>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isMenuOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-[#0A0A0A] z-30 flex flex-col items-center justify-center gap-8 md:hidden"
          >
            {['Players', 'Services', 'About', 'News', 'Contact'].map((item, i) => (
              <motion.a
                key={item}
                href={`#${item.toLowerCase()}`}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.1 }}
                onClick={() => setIsMenuOpen(false)}
                className="font-serif text-2xl tracking-[0.2em] uppercase opacity-60 hover:opacity-100 hover:text-[#C9A962] transition-all"
              >
                {item}
              </motion.a>
            ))}
          </motion.div>
        )}
      </AnimatePresence>

      {/* Hero Section */}
      <section className="relative min-h-[100dvh] flex items-center px-4 md:px-8 lg:px-16 pt-24 md:pt-0">
        {/* Background Image */}
        <div className="absolute inset-0 overflow-hidden">
          <AnimatePresence mode="wait">
            <motion.div
              key={activePlayer}
              initial={{ opacity: 0, scale: 1.1 }}
              animate={{ opacity: 0.3, scale: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 1.5 }}
              className="absolute right-0 top-0 w-full md:w-2/3 h-full"
              style={{
                backgroundImage: `url(${featuredPlayers[activePlayer].image})`,
                backgroundSize: 'cover',
                backgroundPosition: 'center top',
                maskImage: 'linear-gradient(to left, rgba(0,0,0,0.6) 0%, transparent 100%)',
                WebkitMaskImage: 'linear-gradient(to left, rgba(0,0,0,0.6) 0%, transparent 100%)',
              }}
            />
          </AnimatePresence>
          <div className="absolute inset-0 bg-gradient-to-r from-[#0A0A0A] via-[#0A0A0A]/90 to-transparent" />
        </div>

        <div className="relative z-10 max-w-7xl mx-auto w-full">
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: isLoaded ? 1 : 0 }}
            transition={{ duration: 1, delay: 0.5 }}
            className="mb-4 md:mb-6"
          >
            <span className="text-[#C9A962] text-xs md:text-sm tracking-[0.3em] uppercase">Premier Football Agency</span>
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: isLoaded ? 1 : 0, y: isLoaded ? 0 : 50 }}
            transition={{ duration: 1, delay: 0.7 }}
            className="font-serif text-4xl sm:text-5xl md:text-7xl lg:text-8xl xl:text-9xl leading-[0.9] mb-6 md:mb-8"
          >
            Where
            <br />
            <span className="text-[#C9A962]">Legends</span>
            <br />
            <span className="italic font-light">Are Made</span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: isLoaded ? 1 : 0, y: isLoaded ? 0 : 30 }}
            transition={{ duration: 1, delay: 0.9 }}
            className="max-w-md text-sm md:text-base lg:text-lg opacity-60 leading-relaxed mb-8 md:mb-12"
          >
            Representing the world's most exceptional talent.
            Crafting careers. Building legacies.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: isLoaded ? 1 : 0, y: isLoaded ? 0 : 30 }}
            transition={{ duration: 1, delay: 1.1 }}
            className="flex flex-col sm:flex-row gap-4"
          >
            <button className="group px-6 py-3 md:px-8 md:py-4 bg-[#C9A962] text-[#0A0A0A] text-xs tracking-[0.2em] uppercase font-medium hover:bg-[#F5F0E8] transition-all duration-500">
              <span className="flex items-center justify-center gap-2 md:gap-3">
                View Roster
                <svg className="w-4 h-4 group-hover:translate-x-1 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                </svg>
              </span>
            </button>
            <button className="px-6 py-3 md:px-8 md:py-4 border border-[#F5F0E8]/30 text-xs tracking-[0.2em] uppercase hover:border-[#C9A962] hover:text-[#C9A962] transition-all duration-500">
              Our Services
            </button>
          </motion.div>
        </div>

        {/* Scroll Indicator */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: isLoaded ? 1 : 0 }}
          transition={{ duration: 1, delay: 1.5 }}
          className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-3"
        >
          <span className="text-[10px] tracking-[0.3em] uppercase opacity-40">Scroll</span>
          <div className="w-px h-12 bg-gradient-to-b from-[#C9A962] to-transparent" />
        </motion.div>

        {/* Player Indicator */}
        <div className="absolute bottom-8 md:bottom-16 right-4 md:right-8 lg:right-16 flex flex-col gap-2 md:gap-3">
          {featuredPlayers.map((_, i) => (
            <button
              key={i}
              onClick={() => setActivePlayer(i)}
              className={`w-1.5 md:w-2 h-6 md:h-8 transition-all duration-500 ${
                i === activePlayer ? 'bg-[#C9A962]' : 'bg-[#F5F0E8]/20'
              }`}
            />
          ))}
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-16 md:py-24 lg:py-32 px-4 md:px-8 lg:px-16 border-y border-[#F5F0E8]/10">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-8 md:gap-12">
            {stats.map((stat, i) => (
              <motion.div
                key={stat.label}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8, delay: i * 0.15 }}
                className="text-center lg:text-left"
              >
                <div className="font-serif text-3xl sm:text-4xl md:text-5xl lg:text-6xl text-[#C9A962] mb-2">{stat.value}</div>
                <div className="text-xs md:text-sm tracking-[0.2em] uppercase opacity-50">{stat.label}</div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Featured Players Section */}
      <section id="players" className="py-16 md:py-24 lg:py-32 px-4 md:px-8 lg:px-16">
        <div className="max-w-7xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="flex flex-col md:flex-row md:items-end justify-between mb-12 md:mb-16 gap-4"
          >
            <div>
              <span className="text-[#C9A962] text-xs tracking-[0.3em] uppercase block mb-3 md:mb-4">Our Roster</span>
              <h2 className="font-serif text-3xl sm:text-4xl md:text-5xl lg:text-6xl">Featured <span className="italic font-light">Players</span></h2>
            </div>
            <a href="#" className="text-xs tracking-[0.2em] uppercase opacity-60 hover:opacity-100 hover:text-[#C9A962] transition-all flex items-center gap-2">
              View All
              <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
              </svg>
            </a>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
            {featuredPlayers.map((player, i) => (
              <motion.div
                key={player.id}
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8, delay: i * 0.2 }}
                className="group relative"
              >
                <div className="relative aspect-[3/4] overflow-hidden">
                  <img
                    src={player.image}
                    alt={player.name}
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#0A0A0A] via-transparent to-transparent" />

                  {/* Gold Corner Accent */}
                  <div className="absolute top-0 right-0 w-16 md:w-20 h-16 md:h-20">
                    <div className="absolute top-0 right-0 w-full h-px bg-[#C9A962]" />
                    <div className="absolute top-0 right-0 w-px h-full bg-[#C9A962]" />
                  </div>

                  {/* Player Info */}
                  <div className="absolute bottom-0 left-0 right-0 p-4 md:p-6">
                    <div className="text-xs tracking-[0.2em] uppercase text-[#C9A962] mb-1 md:mb-2">{player.position}</div>
                    <h3 className="font-serif text-xl md:text-2xl mb-2 md:mb-3">{player.name}</h3>
                    <div className="flex items-center gap-4 md:gap-6 text-xs opacity-60">
                      <span>{player.nationality}</span>
                      <span>Age {player.age}</span>
                      <span className="text-[#C9A962] font-medium">€{player.marketValue}</span>
                    </div>
                  </div>
                </div>

                {/* Hover Overlay */}
                <div className="absolute inset-0 bg-[#C9A962]/0 group-hover:bg-[#C9A962]/10 transition-colors duration-500 pointer-events-none" />
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Services Section */}
      <section id="services" className="py-16 md:py-24 lg:py-32 px-4 md:px-8 lg:px-16 bg-[#0D0D0D]">
        <div className="max-w-7xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="text-center mb-12 md:mb-20"
          >
            <span className="text-[#C9A962] text-xs tracking-[0.3em] uppercase block mb-3 md:mb-4">What We Offer</span>
            <h2 className="font-serif text-3xl sm:text-4xl md:text-5xl lg:text-6xl">Exceptional <span className="italic font-light">Services</span></h2>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-8">
            {[
              { title: 'Contract Negotiation', desc: 'Expert representation in securing the most favorable terms with clubs worldwide.' },
              { title: 'Career Management', desc: 'Strategic guidance to maximize potential and build lasting legacies in football.' },
              { title: 'Transfer Advisory', desc: 'Comprehensive support through every stage of the transfer process.' },
              { title: 'Brand Development', desc: 'Building iconic personal brands that transcend the pitch.' },
            ].map((service, i) => (
              <motion.div
                key={service.title}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8, delay: i * 0.1 }}
                className="group p-6 md:p-8 lg:p-10 border border-[#F5F0E8]/10 hover:border-[#C9A962]/50 transition-colors duration-500"
              >
                <div className="flex items-start gap-4 md:gap-6">
                  <span className="font-serif text-3xl md:text-4xl text-[#C9A962] opacity-50 group-hover:opacity-100 transition-opacity">0{i + 1}</span>
                  <div>
                    <h3 className="font-serif text-xl md:text-2xl mb-2 md:mb-3 group-hover:text-[#C9A962] transition-colors">{service.title}</h3>
                    <p className="text-sm opacity-50 leading-relaxed">{service.desc}</p>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 md:py-24 lg:py-32 px-4 md:px-8 lg:px-16 relative overflow-hidden">
        <div className="absolute inset-0 opacity-20">
          <div
            className="absolute inset-0"
            style={{
              backgroundImage: 'radial-gradient(circle at 50% 50%, #C9A962 0%, transparent 50%)',
              filter: 'blur(100px)',
            }}
          />
        </div>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="max-w-4xl mx-auto text-center relative z-10"
        >
          <h2 className="font-serif text-3xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl mb-6 md:mb-8 leading-tight">
            Ready to Elevate
            <br />
            <span className="text-[#C9A962] italic">Your Career?</span>
          </h2>
          <p className="text-sm md:text-base lg:text-lg opacity-60 mb-8 md:mb-12 max-w-xl mx-auto">
            Join the most prestigious football agency in the world.
            Let us guide your journey to greatness.
          </p>
          <button className="group px-8 py-4 md:px-12 md:py-5 bg-[#C9A962] text-[#0A0A0A] text-xs tracking-[0.2em] uppercase font-medium hover:bg-[#F5F0E8] transition-all duration-500">
            <span className="flex items-center gap-3">
              Begin Your Journey
              <svg className="w-4 h-4 group-hover:translate-x-1 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
              </svg>
            </span>
          </button>
        </motion.div>
      </section>

      {/* Footer */}
      <footer className="py-12 md:py-16 lg:py-20 px-4 md:px-8 lg:px-16 border-t border-[#F5F0E8]/10">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-4 gap-10 md:gap-12 mb-12 md:mb-16">
            <div className="lg:col-span-2">
              <div className="flex items-center gap-2 md:gap-3 mb-4 md:mb-6">
                <div className="w-8 h-8 md:w-10 md:h-10 border border-[#C9A962] rotate-45 flex items-center justify-center">
                  <span className="font-serif text-[#C9A962] text-base md:text-lg -rotate-45 font-bold">E</span>
                </div>
                <span className="font-serif text-lg md:text-xl tracking-[0.2em] md:tracking-[0.3em] uppercase">Élite</span>
              </div>
              <p className="text-sm opacity-50 max-w-xs leading-relaxed">
                The world's premier football agency, representing exceptional talent since 1998.
              </p>
            </div>

            <div>
              <h4 className="text-xs tracking-[0.2em] uppercase mb-4 md:mb-6 text-[#C9A962]">Quick Links</h4>
              <div className="flex flex-col gap-3 md:gap-4">
                {['Players', 'Services', 'About', 'News', 'Contact'].map((link) => (
                  <a key={link} href={`#${link.toLowerCase()}`} className="text-sm opacity-50 hover:opacity-100 hover:text-[#C9A962] transition-all">
                    {link}
                  </a>
                ))}
              </div>
            </div>

            <div>
              <h4 className="text-xs tracking-[0.2em] uppercase mb-4 md:mb-6 text-[#C9A962]">Contact</h4>
              <div className="flex flex-col gap-3 md:gap-4 text-sm opacity-50">
                <span>London, United Kingdom</span>
                <span>+44 20 7946 0958</span>
                <span>contact@elite-agency.com</span>
              </div>
            </div>
          </div>

          <div className="pt-8 border-t border-[#F5F0E8]/10 flex flex-col md:flex-row items-center justify-between gap-4">
            <div className="text-xs opacity-30">
              © 2024 Élite Football Agency. All rights reserved.
            </div>
            <div className="text-[10px] md:text-xs opacity-30 text-center md:text-right">
              Requested by @AlShatiFC · Built by @clonkbot
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}

export default App;
