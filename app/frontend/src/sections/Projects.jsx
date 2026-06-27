import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { ArrowUpRight } from 'lucide-react'

const fadeUp = {
  hidden: { y: 40, opacity: 0 },
  visible: { y: 0, opacity: 1, transition: { duration: 0.6, ease: 'easeOut' } },
}

const projects = [
  {
    num: '01',
    title: 'Pipeline-Lab',
    tags: ['Docker', 'CI/CD', 'GitHub Actions', 'Linux'],
    blurb: 'End-to-end CI/CD pipeline playground. Automated builds, tests, and deployments using containerized workflows.',
    year: '2025',
    image: 'https://images.unsplash.com/photo-1618401471353-b98afee0b2eb?w=640&h=448&fit=crop',
  },
  {
    num: '02',
    title: 'Mini-Shell in C',
    tags: ['C', 'UNIX', 'Systems', 'Processes'],
    blurb: 'A minimal UNIX shell built from scratch. Fork, exec, pipes, redirections — the whole deal.',
    year: '2025',
    image: 'https://images.unsplash.com/photo-1629654297299-c8506221ca97?w=640&h=448&fit=crop',
  },
  {
    num: '03',
    title: 'DSA Daily — Java',
    tags: ['Java', 'Algorithms', 'Data Structures', 'LeetCode'],
    blurb: 'Daily DSA problem solutions with detailed notes. Arrays to graphs, brute force to optimal.',
    year: '2025',
    image: 'https://images.unsplash.com/photo-1516116216624-53e697fedbea?w=640&h=448&fit=crop',
  },
  {
    num: '04',
    title: 'Dotfiles & Setup',
    tags: ['Linux', 'Bash', 'Neovim', 'Automation'],
    blurb: 'Personal development environment. Reproducible setup scripts, configs, and tooling.',
    year: '2024',
    image: 'https://images.unsplash.com/photo-1555066931-4365d14bab8c?w=640&h=448&fit=crop',
  },
]

export default function Projects() {
  const [hoveredIdx, setHoveredIdx] = useState(null)

  return (
    <section
      id="projects"
      data-testid="projects-section"
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
            [ 03 ] Selected Work
          </motion.div>
          <motion.h2
            variants={fadeUp}
            className="font-heading font-black text-3xl md:text-5xl lg:text-6xl uppercase tracking-tighter leading-[1.05]"
          >
            Things I&apos;ve shipped{' '}
            <span className="text-outline">(or am breaking right now).</span>
          </motion.h2>
        </motion.div>

        {/* Project Rows */}
        <div className="relative">
          {projects.map((project, index) => (
            <motion.div
              key={project.num}
              data-testid={`projects-row-${index}`}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: '-50px' }}
              variants={fadeUp}
              className="group border-b-2 border-[#262626] py-8 md:py-10 cursor-pointer"
              onMouseEnter={() => setHoveredIdx(index)}
              onMouseLeave={() => setHoveredIdx(null)}
            >
              <div className="flex flex-col md:flex-row md:items-center gap-4 md:gap-8">
                {/* Index */}
                <span className="font-mono text-xs text-[#A3A3A3] tracking-[0.3em] uppercase shrink-0 w-16">
                  [ {project.num} ]
                </span>

                {/* Title */}
                <h3 className="font-heading font-black text-2xl md:text-4xl lg:text-5xl uppercase tracking-tighter flex-1 transition-all duration-200 group-hover:text-outline">
                  {project.title}
                </h3>

                {/* Tags */}
                <div className="flex flex-wrap gap-2 shrink-0">
                  {project.tags.map((tag) => (
                    <span
                      key={tag}
                      className="font-mono text-[10px] uppercase tracking-[0.2em] text-[#A3A3A3] border border-[#262626] px-2 py-1"
                    >
                      {tag}
                    </span>
                  ))}
                </div>

                {/* Year + Arrow */}
                <div className="flex items-center gap-3 shrink-0">
                  <span className="font-mono text-xs text-[#A3A3A3] tracking-[0.2em]">
                    {project.year}
                  </span>
                  <ArrowUpRight
                    size={20}
                    className="text-[#A3A3A3] group-hover:text-[#FF3300] transition-colors duration-200"
                  />
                </div>
              </div>

              {/* Blurb (visible on mobile) */}
              <p className="font-body text-sm text-[#A3A3A3] mt-3 md:mt-2 md:pl-24 max-w-[600px]">
                {project.blurb}
              </p>
            </motion.div>
          ))}

          {/* Hover Thumbnail (Desktop Only) */}
          <AnimatePresence>
            {hoveredIdx !== null && (
              <motion.div
                initial={{ opacity: 0, scale: 0.8, rotate: 0 }}
                animate={{ opacity: 1, scale: 1, rotate: -3 }}
                exit={{ opacity: 0, scale: 0.8 }}
                transition={{ duration: 0.2, ease: 'easeOut' }}
                className="hidden md:block fixed pointer-events-none z-50"
                style={{
                  top: '50%',
                  left: '50%',
                  transform: 'translate(-50%, -50%) rotate(-3deg)',
                }}
              >
                <div className="relative" style={{ boxShadow: '8px 8px 0 0 #FF3300' }}>
                  <img
                    src={projects[hoveredIdx].image}
                    alt={projects[hoveredIdx].title}
                    className="w-[320px] h-[224px] object-cover grayscale border-2 border-[#FFFFFF]"
                  />
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </section>
  )
}
