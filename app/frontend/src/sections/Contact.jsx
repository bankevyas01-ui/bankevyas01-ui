import { useState } from 'react'
import { motion } from 'framer-motion'
import { Send, Loader2 } from 'lucide-react'
import { toast } from 'sonner'

const fadeUp = {
  hidden: { y: 40, opacity: 0 },
  visible: { y: 0, opacity: 1, transition: { duration: 0.6, ease: 'easeOut' } },
}

const contactLinks = [
  { label: 'Email', value: 'bankevyas01@gmail.com', href: 'mailto:bankevyas01@gmail.com' },
  { label: 'GitHub', value: 'github.com/bankevyas01-ui', href: 'https://github.com/bankevyas01-ui' },
  { label: 'LinkedIn', value: 'linkedin.com/in/banke-vyas', href: 'https://www.linkedin.com/in/banke-vyas' },
  { label: 'Status', value: 'Available for Internships', href: null },
]

export default function Contact() {
  const [form, setForm] = useState({ name: '', email: '', subject: '', message: '' })
  const [loading, setLoading] = useState(false)

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value })
  }

  const handleSubmit = async (e) => {
    e.preventDefault()

    // Client-side validation
    if (!form.name.trim() || !form.email.trim() || !form.subject.trim() || !form.message.trim()) {
      toast.error('All fields are required.', {
        style: { background: '#121212', border: '2px solid #FF3300', color: '#FFFFFF', borderRadius: 0 },
      })
      return
    }

    setLoading(true)

    try {
      const backendUrl = import.meta.env.VITE_BACKEND_URL || 'http://localhost:8000'
      const res = await fetch(`${backendUrl}/api/contact`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(form),
      })

      if (res.ok) {
        toast.success('Message landed.', {
          style: { background: '#121212', border: '2px solid #FF3300', color: '#FFFFFF', borderRadius: 0 },
        })
        setForm({ name: '', email: '', subject: '', message: '' })
      } else if (res.status === 422) {
        const data = await res.json()
        const detail = data.detail?.[0]?.msg || 'Validation error.'
        toast.error(detail, {
          style: { background: '#121212', border: '2px solid #FF3300', color: '#FFFFFF', borderRadius: 0 },
        })
      } else {
        toast.error('Something went wrong. Try again.', {
          style: { background: '#121212', border: '2px solid #FF3300', color: '#FFFFFF', borderRadius: 0 },
        })
      }
    } catch {
      toast.error('Network error. Is the server running?', {
        style: { background: '#121212', border: '2px solid #FF3300', color: '#FFFFFF', borderRadius: 0 },
      })
    } finally {
      setLoading(false)
    }
  }

  return (
    <section
      id="contact"
      data-testid="contact-section"
      className="relative py-24 md:py-32 border-t-2 border-[#262626]"
    >
      <div className="max-w-[1400px] mx-auto px-6">
        {/* Eyebrow */}
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-100px' }}
          variants={fadeUp}
          className="eyebrow mb-16"
        >
          [ 05 ] Contact
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">
          {/* Left — Headline + Links */}
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: '-100px' }}
            variants={{ visible: { transition: { staggerChildren: 0.1 } } }}
          >
            <motion.h2
              variants={fadeUp}
              className="font-heading font-black text-4xl md:text-6xl lg:text-7xl uppercase tracking-tighter leading-[1.05] mb-12"
            >
              LET&apos;S BUILD{' '}
              <span className="text-outline">SOMETHING.</span>
            </motion.h2>

            <div className="space-y-0">
              {contactLinks.map((link) => (
                <motion.div
                  key={link.label}
                  variants={fadeUp}
                  className="group border-b-2 border-[#262626] py-4 flex items-center justify-between hover:border-[#FF3300] transition-colors duration-200"
                >
                  <span className="font-mono text-xs uppercase tracking-[0.3em] text-[#A3A3A3] group-hover:text-[#FF3300] transition-colors duration-200">
                    {link.label}
                  </span>
                  {link.href ? (
                    <a
                      href={link.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="font-mono text-xs uppercase tracking-[0.15em] text-[#FFFFFF] group-hover:text-[#FF3300] transition-colors duration-200"
                    >
                      {link.value}
                    </a>
                  ) : (
                    <span className="font-mono text-xs uppercase tracking-[0.15em] text-[#FF3300] flex items-center gap-2">
                      <span className="w-2 h-2 bg-[#FF3300] animate-pulse-dot inline-block" />
                      {link.value}
                    </span>
                  )}
                </motion.div>
              ))}
            </div>
          </motion.div>

          {/* Right — Form */}
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: '-100px' }}
            variants={fadeUp}
          >
            <form
              data-testid="contact-form"
              onSubmit={handleSubmit}
              className="space-y-6"
            >
              {/* Name + Email row */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <input
                  type="text"
                  name="name"
                  data-testid="contact-name-input"
                  value={form.name}
                  onChange={handleChange}
                  placeholder="Your Name"
                  className="brutal-input"
                />
                <input
                  type="email"
                  name="email"
                  data-testid="contact-email-input"
                  value={form.email}
                  onChange={handleChange}
                  placeholder="Your Email"
                  className="brutal-input"
                />
              </div>

              {/* Subject */}
              <input
                type="text"
                name="subject"
                data-testid="contact-subject-input"
                value={form.subject}
                onChange={handleChange}
                placeholder="Subject"
                className="brutal-input"
              />

              {/* Message */}
              <textarea
                name="message"
                data-testid="contact-message-input"
                value={form.message}
                onChange={handleChange}
                placeholder="Your Message"
                rows={6}
                className="brutal-input resize-none"
              />

              {/* Submit */}
              <button
                type="submit"
                data-testid="contact-submit-button"
                disabled={loading}
                className="w-full flex items-center justify-center gap-3 font-mono text-sm uppercase tracking-[0.2em] bg-[#FF3300] text-[#050505] px-8 py-4 font-bold hover:bg-[#FFFFFF] transition-colors duration-200 disabled:opacity-60 disabled:cursor-not-allowed"
              >
                {loading ? (
                  <>
                    <Loader2 size={18} className="animate-spin" />
                    Sending...
                  </>
                ) : (
                  <>
                    Send Message <Send size={18} />
                  </>
                )}
              </button>
            </form>
          </motion.div>
        </div>
      </div>
    </section>
  )
}
