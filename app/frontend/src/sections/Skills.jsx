import { motion } from 'framer-motion'

const fadeUp = {
  hidden: { y: 40, opacity: 0 },
  visible: { y: 0, opacity: 1, transition: { duration: 0.6, ease: 'easeOut' } },
}

const skillCards = [
  {
    id: 'devops',
    num: '01',
    title: 'DevOps',
    blurb: 'Automating the path from commit to production. Infrastructure as code, pipelines, and monitoring.',
    items: ['Linux', 'Docker', 'Git', 'CI/CD', 'Shell', 'Nginx'],
  },
  {
    id: 'c',
    num: '02',
    title: 'C Language',
    blurb: 'Systems programming at the metal. Memory management, data structures, and UNIX internals.',
    items: ['Pointers', 'File I/O', 'Structs', 'Recursion', 'Makefiles', 'gdb'],
  },
  {
    id: 'java',
    num: '03',
    title: 'Java',
    blurb: 'Object-oriented engineering and enterprise patterns. Building robust, typed applications.',
    items: ['Core', 'OOP', 'Collections', 'Exceptions', 'JDBC', 'JVM'],
  },
  {
    id: 'dsa',
    num: '04',
    title: 'DSA',
    blurb: 'Data structures and algorithms daily. Thinking in time complexity and optimal solutions.',
    items: ['Arrays', 'Linked Lists', 'Trees/Graphs', 'Stacks/Queues', 'Sorting', 'DP'],
  },
]

export default function Skills() {
  return (
    <section
      id="skills"
      data-testid="skills-section"
      className="relative py-24 md:py-32 border-t-2 border-[#262626]"
    >
      <div className="max-w-[1400px] mx-auto px-6">
        {/* Eyebrow + Headline */}
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-100px' }}
          variants={{ visible: { transition: { staggerChildren: 0.15 } } }}
          className="mb-16"
        >
          <motion.div variants={fadeUp} className="eyebrow mb-6">
            [ 02 ] Skills / Stack
          </motion.div>
          <motion.h2
            variants={fadeUp}
            className="font-heading font-black text-3xl md:text-5xl lg:text-6xl uppercase tracking-tighter leading-[1.05]"
          >
            Tools I use.{' '}
            <span className="text-outline">Things I know.</span>
          </motion.h2>
        </motion.div>

        {/* 2×2 Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2">
          {skillCards.map((card, index) => (
            <motion.div
              key={card.id}
              data-testid={`skills-card-${card.id}`}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: '-50px' }}
              variants={fadeUp}
              className={`group p-6 md:p-10 border-2 border-[#262626] bg-[#121212] transition-all duration-200 hover:bg-[#0a0a0a] ${
                index === 0 ? '' :
                index === 1 ? 'md:border-l-0' :
                index === 2 ? 'md:border-t-0' :
                'md:border-l-0 md:border-t-0'
              }`}
            >
              {/* Card Number */}
              <div className="font-mono text-xs text-[#A3A3A3] tracking-[0.3em] uppercase mb-4">
                // {card.num}
              </div>

              {/* Title */}
              <h3 className="font-heading font-black text-2xl md:text-4xl uppercase tracking-tighter mb-3 group-hover:text-[#FF3300] transition-colors duration-200">
                {card.title}
              </h3>

              {/* Blurb */}
              <p className="font-body text-[#A3A3A3] text-sm leading-relaxed mb-6">
                {card.blurb}
              </p>

              {/* Items */}
              <ul className="space-y-2">
                {card.items.map((item) => (
                  <li
                    key={item}
                    className="font-mono text-xs uppercase tracking-[0.2em] text-[#A3A3A3] flex items-center"
                  >
                    <span className="text-[#FF3300] mr-2">▍</span>
                    {item}
                  </li>
                ))}
              </ul>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
