import { motion } from 'framer-motion'
import { ArrowDown, ArrowUpRight } from 'lucide-react'

const headlineVariants = {
  hidden: {},
  visible: {
    transition: { staggerChildren: 0.15 },
  },
}

const lineVariants = {
  hidden: { y: '100%', opacity: 0 },
  visible: {
    y: 0,
    opacity: 1,
    transition: { duration: 0.6, ease: [0.16, 1, 0.3, 1] },
  },
}

const fadeUp = {
  hidden: { y: 30, opacity: 0 },
  visible: (i) => ({
    y: 0,
    opacity: 1,
    transition: { duration: 0.5, delay: 0.5 + i * 0.1, ease: 'easeOut' },
  }),
}

const marqueeItems = [
  'DevOps', 'C', 'Java', 'DSA', 'Linux', 'Docker', 'Git',
  'DevOps', 'C', 'Java', 'DSA', 'Linux', 'Docker', 'Git',
]

export default function Hero() {
  return (
    <section
      data-testid="hero-section"
      className="relative min-h-[100vh] flex flex-col justify-center overflow-hidden"
    >
      {/* Grid Background */}
      <div className="absolute inset-0 grid-bg" />

      {/* Red Radial Highlight */}
      <div
        className="absolute top-0 right-0 w-[600px] h-[600px] pointer-events-none"
        style={{
          background: 'radial-gradient(circle at top right, rgba(255,51,0,0.12) 0%, transparent 60%)',
        }}
      />

      {/* Noise Overlay */}
      <div className="absolute inset-0 noise-overlay" />

      {/* Content */}
      <div className="relative z-10 max-w-[1400px] mx-auto px-6 pt-32 pb-20 w-full">
        {/* Meta Row */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.1 }}
          className="flex flex-wrap items-center gap-4 md:gap-6 mb-8 font-mono text-xs uppercase tracking-[0.2em] text-[#A3A3A3]"
        >
          <span>Mumbai, India</span>
          <span className="hidden md:inline text-[#262626]">·</span>
          <span>Portfolio v1.0</span>
          <span className="hidden md:inline text-[#262626]">·</span>
          <span className="flex items-center gap-2">
            <span className="w-2 h-2 bg-[#FF3300] animate-pulse-dot inline-block" />
            Available For Internships
          </span>
        </motion.div>

        {/* Headline */}
        <motion.div
          variants={headlineVariants}
          initial="hidden"
          animate="visible"
          className="mb-6"
        >
          <div className="overflow-hidden">
            <motion.h1
              data-testid="hero-heading-line-1"
              variants={lineVariants}
              className="font-heading font-black text-[clamp(3rem,12vw,10rem)] uppercase tracking-tighter leading-[0.9]"
            >
              BANKE
            </motion.h1>
          </div>
          <div className="overflow-hidden flex items-end gap-3">
            <motion.h1
              data-testid="hero-heading-line-2"
              variants={lineVariants}
              className="font-heading font-black text-[clamp(3rem,12vw,10rem)] uppercase tracking-tighter leading-[0.9] text-outline"
            >
              VYAS
            </motion.h1>
            <motion.span
              variants={lineVariants}
              className="text-[#FF3300] font-heading font-black text-[clamp(3rem,12vw,10rem)] leading-[0.9] animate-blink"
            >
              |
            </motion.span>
          </div>
        </motion.div>

        {/* Tagline */}
        <motion.p
          custom={0}
          variants={fadeUp}
          initial="hidden"
          animate="visible"
          className="font-mono text-sm md:text-base uppercase tracking-[0.2em] text-[#A3A3A3] mb-6"
        >
          // CSE Student · DevOps Apprentice · Builder
        </motion.p>

        {/* Body */}
        <motion.p
          custom={1}
          variants={fadeUp}
          initial="hidden"
          animate="visible"
          className="font-body text-[#A3A3A3] text-base md:text-lg max-w-[600px] leading-relaxed mb-10"
        >
          Second-year Computer Science student who builds things with code,
          breaks them in production, and learns from the wreckage. Currently
          deep-diving into DevOps pipelines, system-level C, and Java
          data structures.
        </motion.p>

        {/* CTAs */}
        <motion.div
          custom={2}
          variants={fadeUp}
          initial="hidden"
          animate="visible"
          className="flex flex-wrap gap-4"
        >
          <a
            href="#projects"
            data-testid="hero-cta-work"
            className="flex items-center gap-2 font-mono text-sm uppercase tracking-[0.2em] bg-[#FF3300] text-[#050505] px-8 py-4 font-bold hover:bg-[#FFFFFF] transition-colors duration-200"
          >
            See My Work <ArrowDown size={16} />
          </a>
          <a
            href="#contact"
            data-testid="hero-cta-contact"
            className="flex items-center gap-2 font-mono text-sm uppercase tracking-[0.2em] border-2 border-[#FFFFFF] text-[#FFFFFF] px-8 py-4 font-bold hover:bg-[#FFFFFF] hover:text-[#050505] transition-colors duration-200"
          >
            Get In Touch <ArrowUpRight size={16} />
          </a>
        </motion.div>
      </div>

      {/* Bottom Marquee */}
      <div className="absolute bottom-0 left-0 right-0 border-t-2 border-[#262626] bg-[#050505] py-3 overflow-hidden">
        <div className="animate-marquee whitespace-nowrap flex">
          {marqueeItems.map((item, i) => (
            <span
              key={i}
              className="font-mono text-sm uppercase tracking-[0.2em] text-[#A3A3A3] mx-6 inline-flex items-center gap-6"
            >
              {item} <span className="text-[#FF3300]">★</span>
            </span>
          ))}
        </div>
      </div>
    </section>
  )
}
