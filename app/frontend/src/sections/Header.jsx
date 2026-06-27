import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Menu, X, ArrowUpRight } from 'lucide-react'

const navItems = [
  { num: '01', label: 'About', href: '#about' },
  { num: '02', label: 'Skills', href: '#skills' },
  { num: '03', label: 'Projects', href: '#projects' },
  { num: '04', label: 'Journey', href: '#journey' },
  { num: '05', label: 'Contact', href: '#contact' },
]

export default function Header() {
  const [scrolled, setScrolled] = useState(false)
  const [mobileOpen, setMobileOpen] = useState(false)

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 50)
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  return (
    <header
      data-testid="header-section"
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-200 ${
        scrolled
          ? 'bg-[#050505]/90 backdrop-blur-md border-b-2 border-[#262626]'
          : 'bg-transparent'
      }`}
    >
      <div className="max-w-[1400px] mx-auto px-6 h-16 flex items-center justify-between">
        {/* Logo */}
        <a href="#" className="font-mono text-lg font-bold tracking-wider" data-testid="header-logo">
          B/V<span className="text-[#FF3300]">.</span>
        </a>

        {/* Desktop Nav */}
        <nav className="hidden md:flex items-center gap-8">
          {navItems.map((item) => (
            <a
              key={item.num}
              href={item.href}
              data-testid={`header-nav-${item.label.toLowerCase()}`}
              className="font-mono text-xs uppercase tracking-[0.3em] text-[#A3A3A3] hover:text-[#FF3300] transition-colors duration-200"
            >
              <span className="text-[#FF3300]">[{item.num}]</span>{' '}
              {item.label}
            </a>
          ))}
        </nav>

        {/* CTA + Hamburger */}
        <div className="flex items-center gap-4">
          <a
            href="#contact"
            data-testid="header-hire-button"
            className="hidden md:flex items-center gap-1 font-mono text-xs uppercase tracking-[0.2em] border-2 border-[#FFFFFF] px-4 py-2 hover:bg-[#FF3300] hover:border-[#FF3300] hover:text-[#050505] transition-all duration-200"
          >
            Hire Me <ArrowUpRight size={14} />
          </a>

          <button
            data-testid="header-mobile-menu"
            className="md:hidden text-[#FFFFFF] p-2 border-2 border-[#262626]"
            onClick={() => setMobileOpen(!mobileOpen)}
            aria-label="Toggle menu"
          >
            {mobileOpen ? <X size={20} /> : <Menu size={20} />}
          </button>
        </div>
      </div>

      {/* Mobile Dropdown */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="md:hidden bg-[#050505] border-b-2 border-[#262626] overflow-hidden"
          >
            <nav className="flex flex-col px-6 py-4 gap-4">
              {navItems.map((item) => (
                <a
                  key={item.num}
                  href={item.href}
                  onClick={() => setMobileOpen(false)}
                  className="font-mono text-sm uppercase tracking-[0.2em] text-[#A3A3A3] hover:text-[#FF3300] transition-colors duration-200 py-2 border-b border-[#262626]"
                >
                  <span className="text-[#FF3300]">[{item.num}]</span>{' '}
                  {item.label}
                </a>
              ))}
              <a
                href="#contact"
                onClick={() => setMobileOpen(false)}
                className="font-mono text-sm uppercase tracking-[0.2em] border-2 border-[#FFFFFF] px-4 py-3 text-center hover:bg-[#FF3300] hover:border-[#FF3300] hover:text-[#050505] transition-all duration-200 mt-2"
              >
                Hire Me <ArrowUpRight size={14} className="inline ml-1" />
              </a>
            </nav>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  )
}
