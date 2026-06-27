import { motion } from 'framer-motion'

const fadeUp = {
  hidden: { y: 40, opacity: 0 },
  visible: { y: 0, opacity: 1, transition: { duration: 0.6, ease: 'easeOut' } },
}

const timelineItems = [
  {
    period: '2024 — Present',
    title: 'B.Tech CSE',
    description: 'Started my Computer Science Engineering journey. Building foundations in programming, mathematics, and system design.',
  },
  {
    period: '2025',
    title: 'Self-Taught DevOps',
    description: 'Dove deep into Linux, Docker, CI/CD pipelines, and infrastructure automation. Learning by breaking and rebuilding.',
  },
  {
    period: '2025',
    title: 'DSA in Java Daily',
    description: 'Committed to solving data structures and algorithms problems every single day. Arrays to graphs, brute force to optimal.',
  },
  {
    period: '2026 — Next',
    title: 'Open Source + Internship',
    description: 'Contributing to open source projects and hunting for my first DevOps or backend engineering internship.',
  },
]

export default function Journey() {
  return (
    <section
      id="journey"
      data-testid="journey-section"
      className="relative py-24 md:py-32 border-t-2 border-[#262626]"
    >
      <div className="max-w-[1400px] mx-auto px-6">
        {/* Header */}
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-100px' }}
          variants={{ visible: { transition: { staggerChildren: 0.15 } } }}
          className="mb-16"
        >
          <motion.div variants={fadeUp} className="eyebrow mb-6">
            [ 04 ] Journey / Now
          </motion.div>
          <motion.h2
            variants={fadeUp}
            className="font-heading font-black text-3xl md:text-5xl lg:text-6xl uppercase tracking-tighter leading-[1.05]"
          >
            Where I&apos;ve been.{' '}
            <span className="text-outline">Where I&apos;m going.</span>
          </motion.h2>
        </motion.div>

        {/* Timeline */}
        <div className="relative ml-4 md:ml-8">
          {/* Vertical Line */}
          <div className="absolute left-0 top-0 bottom-0 w-[2px] bg-[#262626]" />

          {timelineItems.map((item, index) => (
            <motion.div
              key={index}
              data-testid={`journey-item-${index}`}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: '-50px' }}
              variants={fadeUp}
              className="relative pl-10 md:pl-16 pb-12 md:pb-16 last:pb-0"
            >
              {/* Square Node */}
              <div className="absolute left-[-5px] top-1 w-3 h-3 bg-[#FF3300] border-2 border-[#FF3300]" />

              {/* Horizontal Connector */}
              <div className="absolute left-[7px] top-[11px] w-6 md:w-12 h-[2px] bg-[#262626]" />

              {/* Period */}
              <div className="font-mono text-xs uppercase tracking-[0.3em] text-[#FF3300] mb-2">
                {item.period}
              </div>

              {/* Title */}
              <h3 className="font-heading font-black text-xl md:text-3xl uppercase tracking-tighter mb-3">
                {item.title}
              </h3>

              {/* Description */}
              <p className="font-body text-[#A3A3A3] text-sm md:text-base leading-relaxed max-w-[500px]">
                {item.description}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
