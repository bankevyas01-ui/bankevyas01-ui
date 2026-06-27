import { motion } from 'framer-motion'

const fadeUp = {
  hidden: { y: 40, opacity: 0 },
  visible: { y: 0, opacity: 1, transition: { duration: 0.6, ease: 'easeOut' } },
}

const stats = [
  { label: 'Year', value: '2nd' },
  { label: 'Branch', value: 'CSE' },
  { label: 'Coffee', value: '∞' },
]

export default function About() {
  return (
    <section
      id="about"
      data-testid="about-section"
      className="relative py-24 md:py-32 border-t-2 border-[#262626]"
    >
      <div className="max-w-[1400px] mx-auto px-6">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16">
          {/* Left Column — 7 cols */}
          <motion.div
            className="lg:col-span-7"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: '-100px' }}
            variants={{ visible: { transition: { staggerChildren: 0.15 } } }}
          >
            {/* Eyebrow */}
            <motion.div variants={fadeUp} className="eyebrow mb-6">
              [ 01 ] About
            </motion.div>

            {/* Headline */}
            <motion.h2
              data-testid="about-heading"
              variants={fadeUp}
              className="font-heading font-black text-3xl md:text-5xl lg:text-6xl uppercase tracking-tighter leading-[1.05] mb-8"
            >
              I learn by{' '}
              <span className="text-outline">breaking things</span>{' '}
              then{' '}
              <span className="text-[#FF3300]">fixing them.</span>
            </motion.h2>

            {/* Paragraphs */}
            <motion.p variants={fadeUp} className="font-body text-[#A3A3A3] text-base leading-relaxed mb-4">
              I&apos;m Banke Vyas, a second-year B.Tech Computer Science student who believes the
              fastest way to learn is by building things that might blow up in your face. My terminal
              history is full of segfaults, broken pipelines, and hard-won lessons.
            </motion.p>

            <motion.p variants={fadeUp} className="font-body text-[#A3A3A3] text-base leading-relaxed mb-4">
              Right now I&apos;m obsessed with DevOps — the art of automating everything between a
              commit and a user seeing the change. I spend my mornings solving DSA problems in Java
              and my evenings wrestling with Docker containers and CI/CD pipelines.
            </motion.p>

            <motion.p variants={fadeUp} className="font-body text-[#A3A3A3] text-base leading-relaxed mb-8">
              When I&apos;m not coding, I&apos;m tweaking my dotfiles, exploring Linux internals, or
              writing C programs that talk to the hardware. The lower the level, the more I learn.
            </motion.p>

            {/* Stats */}
            <motion.div variants={fadeUp} className="grid grid-cols-3 border-2 border-[#262626]">
              {stats.map((stat, i) => (
                <div
                  key={stat.label}
                  className={`p-4 md:p-6 text-center ${i < 2 ? 'border-r-2 border-[#262626]' : ''}`}
                >
                  <div className="font-mono text-xs uppercase tracking-[0.3em] text-[#A3A3A3] mb-1">
                    {stat.label}
                  </div>
                  <div className="font-heading font-black text-xl md:text-2xl text-[#FF3300]">
                    {stat.value}
                  </div>
                </div>
              ))}
            </motion.div>
          </motion.div>

          {/* Right Column — 5 cols: Portrait */}
          <motion.div
            className="lg:col-span-5 flex justify-center lg:justify-end"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: '-100px' }}
            variants={fadeUp}
          >
            <div className="relative" data-testid="about-portrait">
              {/* Red Shadow */}
              <div
                className="absolute top-3 left-3 w-full h-full border-2 border-[#FF3300] bg-[#FF3300]/10"
                style={{ boxShadow: '8px 8px 0 0 #FF3300' }}
              />

              {/* Image */}
              <div className="relative border-2 border-[#FFFFFF] overflow-hidden">
                <img
                  src="/banke.jpeg"
                  alt="Banke Vyas Portrait"
                  className="w-[280px] md:w-[340px] h-[360px] md:h-[440px] object-cover grayscale"
                  loading="lazy"
                />

                {/* Overlay Labels */}
                <div className="absolute top-3 left-3 font-mono text-[10px] uppercase tracking-[0.3em] text-[#FF3300] bg-[#050505]/80 px-2 py-1">
                  BV_001
                </div>
                <div className="absolute bottom-3 left-3 font-mono text-[10px] uppercase tracking-[0.3em] text-[#A3A3A3] bg-[#050505]/80 px-2 py-1">
                  ~/$ whoami
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  )
}
