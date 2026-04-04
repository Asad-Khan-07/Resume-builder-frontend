import { useNavigate } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'
import { motion } from 'framer-motion'

// ─── SVG Icons ────────────────────────────────────────────
const TemplateIcon = () => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
    <rect x="3" y="3" width="18" height="18" rx="2"/><path d="M3 9h18M9 21V9"/>
  </svg>
)

const BoltIcon = () => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
    <path d="M13 2 3 14h9l-1 8 10-12h-9l1-8z"/>
  </svg>
)

const CloudIcon = () => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
    <path d="M18 10h-1.26A8 8 0 1 0 9 20h9a5 5 0 0 0 0-10z"/>
  </svg>
)

const TargetIcon = () => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
    <circle cx="12" cy="12" r="10"/><circle cx="12" cy="12" r="6"/><circle cx="12" cy="12" r="2"/>
  </svg>
)

const StarIcon = () => (
  <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor" stroke="none">
    <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"/>
  </svg>
)

const ArrowRight = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <line x1="5" y1="12" x2="19" y2="12"/><polyline points="12 5 19 12 12 19"/>
  </svg>
)

const ChevronDown = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <polyline points="6 9 12 15 18 9"/>
  </svg>
)

const BulletIcon = () => (
  <svg width="12" height="12" viewBox="0 0 24 24" fill="currentColor" stroke="none">
    <polygon points="5 3 19 12 5 21 5 3"/>
  </svg>
)

// ─── Data ─────────────────────────────────────────────────
const features = [
  { icon: <TemplateIcon />, title: 'Beautiful Templates', desc: 'Choose from professionally designed templates that make you stand out from the crowd.' },
  { icon: <BoltIcon />,     title: 'Build in Minutes',   desc: 'Our intuitive builder guides you step-by-step. No design skills needed whatsoever.' },
  { icon: <CloudIcon />,    title: 'Save & Access Anywhere', desc: 'Your resumes are securely saved in the cloud. Access and edit them anytime, anywhere.' },
  { icon: <TargetIcon />,   title: 'ATS Friendly',       desc: 'Our formats are optimized for Applicant Tracking Systems so recruiters actually see you.' },
]

const steps = [
  { num: '01', title: 'Create Account',   desc: 'Sign up for free in seconds — no credit card required.' },
  { num: '02', title: 'Fill Your Details', desc: 'Add your experience, skills, and education with our easy form.' },
  { num: '03', title: 'Pick a Template',  desc: 'Choose a design that fits your industry and personality.' },
  { num: '04', title: 'Download & Apply', desc: 'Export your polished resume and start landing interviews.' },
]

const testimonials = [
  { name: 'Aisha K.',  role: 'Software Engineer', text: 'I built my resume in under 20 minutes and got a callback within a week. Absolutely love this tool!', avatar: 'AK' },
  { name: 'Bilal M.',  role: 'Product Manager',   text: 'The templates look so clean and professional. Way better than anything I tried before.',             avatar: 'BM' },
  { name: 'Sara N.',   role: 'UX Designer',        text: "Finally a resume builder that doesn't look like it's from 2010. Highly recommend!",                 avatar: 'SN' },
]

// ─── Reusable animation variants ──────────────────────────

// Generic fade-up: use on any element that should appear from below
const fadeUp = {
  hidden: { opacity: 0, y: 32 },
  visible: (delay = 0) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, ease: 'easeOut', delay: delay / 1000 },
  }),
}

// Container that staggers its children
const staggerContainer = (staggerSec = 0.1) => ({
  hidden: {},
  visible: { transition: { staggerChildren: staggerSec } },
})

// Child variant used inside stagger containers
const staggerChild = {
  hidden: { opacity: 0, y: 28 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.55, ease: 'easeOut' } },
}

// ─── Landing Page ─────────────────────────────────────────
export default function Landing() {
  const navigate = useNavigate()
  const { user } = useAuth()

  const handleCTA = () => {
    if (user) navigate('/')
    else navigate('/register')
  }

  return (
    <div className="min-h-screen bg-[#f8f9fc] text-[#1a1a2e]">

      {/* ── Navbar ── */}
      <motion.nav
        className="bg-white border-b border-gray-100 sticky top-0 z-50"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, ease: 'easeOut' }}
      >
        <div className="max-w-7xl mx-auto px-6 h-16 flex items-center justify-between">
          <span className="font-display text-xl font-bold text-primary-600">ResumeBuildr</span>
          <div className="flex items-center gap-3">
            {user ? (
              <button onClick={() => navigate('/dashboard')} className="btn-primary text-sm py-2 px-5 flex items-center gap-2">
                Go to Dashboard <ArrowRight />
              </button>
            ) : (
              <>
                <button onClick={() => navigate('/login')} className="btn-secondary text-sm py-2 px-4">Sign In</button>
                <button onClick={() => navigate('/register')} className="btn-primary text-sm py-2 px-5">Get Started Free</button>
              </>
            )}
          </div>
        </div>
      </motion.nav>

      {/* ── Hero ── */}
      <section className="max-w-7xl mx-auto px-6 pt-24 pb-20 text-center">

        {/* Badge */}
        <motion.div
          className="inline-flex items-center gap-2 bg-primary-50 text-primary-600 text-xs font-semibold px-4 py-1.5 rounded-full mb-6"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.1 }}
        >
          <span className="w-1.5 h-1.5 rounded-full bg-primary-500 animate-pulse inline-block" />
          Free to use · No credit card required
        </motion.div>

        {/* Headline + subtitle + buttons */}
        <motion.div
          initial={{ opacity: 0, y: 32 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
        >
          <h1 className="font-display text-5xl md:text-6xl font-bold leading-tight text-[#1a1a2e] mb-6 max-w-3xl mx-auto">
            Build a Resume That{' '}
            <span className="text-primary-600 relative">
              Gets You Hired
              <svg className="absolute -bottom-1 left-0 w-full" viewBox="0 0 300 12" fill="none">
                <path d="M2 9 Q75 2 150 9 Q225 16 298 9" stroke="#4f6ef7" strokeWidth="3" strokeLinecap="round" fill="none" opacity="0.4"/>
              </svg>
            </span>
          </h1>

          <p className="text-gray-500 text-lg max-w-xl mx-auto mb-10 leading-relaxed">
            Create a stunning, professional resume in minutes. Stand out from thousands of applicants and land your dream job.
          </p>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <button onClick={handleCTA} className="btn-primary text-base px-8 py-3 shadow-lg shadow-primary-500/20 flex items-center gap-2">
              Create My Resume — It's Free <ArrowRight />
            </button>
            <a href="#how-it-works" className="text-gray-500 text-sm hover:text-gray-700 transition-colors flex items-center gap-1">
              See how it works <ChevronDown />
            </a>
          </div>
        </motion.div>

        {/* Hero Card */}
        <motion.div
          className="mt-16 max-w-2xl mx-auto"
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.4 }}
        >
          <div className="bg-white rounded-2xl shadow-xl border border-gray-100 p-6 text-left">
            <div className="flex items-center gap-4 mb-5 pb-5 border-b border-gray-100">
              <div className="w-14 h-14 rounded-full bg-primary-100 flex items-center justify-center text-primary-600 font-bold text-lg font-display">
                JD
              </div>
              <div>
                <div className="font-semibold text-gray-800 text-lg">John Doe</div>
                <div className="text-primary-500 text-sm">Senior Software Engineer</div>
                <div className="text-gray-400 text-xs mt-0.5">john@example.com · github.com/johndoe</div>
              </div>
            </div>
            <div className="grid grid-cols-3 gap-3">
              {['React', 'Node.js', 'MongoDB', 'TypeScript', 'AWS', 'Docker'].map((skill) => (
                <span key={skill} className="bg-primary-50 text-primary-600 text-xs font-medium px-3 py-1.5 rounded-lg text-center">
                  {skill}
                </span>
              ))}
            </div>
            <div className="mt-4 space-y-2">
              {['Led team of 5 engineers to ship product used by 50k+ users', 'Reduced API latency by 40% through caching strategy'].map((item) => (
                <div key={item} className="flex items-start gap-2 text-sm text-gray-600">
                  <span className="text-primary-400 mt-0.5"><BulletIcon /></span>
                  {item}
                </div>
              ))}
            </div>
          </div>
        </motion.div>
      </section>

      {/* ── Features ── */}
      <section className="bg-white py-20 border-y border-gray-100">
        <div className="max-w-7xl mx-auto px-6">

          {/* Section heading */}
          <motion.div
            className="text-center mb-14"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.3 }}
            variants={fadeUp}
            custom={0}
          >
            <h2 className="font-display text-3xl font-bold mb-3">Everything You Need</h2>
            <p className="text-gray-500 max-w-md mx-auto">All the tools to create a resume that truly represents your best self.</p>
          </motion.div>

          {/* Staggered feature cards */}
          <motion.div
            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.15 }}
            variants={staggerContainer(0.12)}
          >
            {features.map((f) => (
              <FeatureCard key={f.title} feature={f} />
            ))}
          </motion.div>
        </div>
      </section>

      {/* ── How It Works ── */}
      <section id="how-it-works" className="py-20 max-w-7xl mx-auto px-6">
        <motion.div
          className="text-center mb-14"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.3 }}
          variants={fadeUp}
          custom={0}
        >
          <h2 className="font-display text-3xl font-bold mb-3">How It Works</h2>
          <p className="text-gray-500 max-w-md mx-auto">Four simple steps to your perfect resume.</p>
        </motion.div>

        <motion.div
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.15 }}
          variants={staggerContainer(0.12)}
        >
          {steps.map((step, i) => (
            <StepCard key={step.num} step={step} index={i} total={steps.length} />
          ))}
        </motion.div>
      </section>

      {/* ── Testimonials ── */}
      <section className="bg-white border-y border-gray-100 py-20">
        <div className="max-w-7xl mx-auto px-6">
          <motion.div
            className="text-center mb-14"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.3 }}
            variants={fadeUp}
            custom={0}
          >
            <h2 className="font-display text-3xl font-bold mb-3">Loved by Job Seekers</h2>
            <p className="text-gray-500 max-w-md mx-auto">Join thousands who have landed their dream jobs with ResumeBuildr.</p>
          </motion.div>

          <motion.div
            className="grid grid-cols-1 md:grid-cols-3 gap-6"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.15 }}
            variants={staggerContainer(0.15)}
          >
            {testimonials.map((t) => (
              <TestiCard key={t.name} t={t} />
            ))}
          </motion.div>
        </div>
      </section>

      {/* ── CTA Banner ── */}
      <section className="py-20 max-w-7xl mx-auto px-6 text-center">
        <motion.div
          className="bg-primary-600 rounded-3xl px-8 py-16 relative overflow-hidden"
          initial={{ opacity: 0, scale: 0.96, y: 24 }}
          whileInView={{ opacity: 1, scale: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.6, ease: 'easeOut' }}
        >
          <div className="absolute top-0 right-0 w-64 h-64 rounded-full bg-white opacity-5 translate-x-16 -translate-y-16" />
          <div className="absolute bottom-0 left-0 w-48 h-48 rounded-full bg-white opacity-5 -translate-x-10 translate-y-10" />
          <h2 className="font-display text-3xl md:text-4xl font-bold text-white mb-4 relative z-10">
            Ready to Land Your Dream Job?
          </h2>
          <p className="text-primary-100 mb-8 relative z-10 max-w-md mx-auto">
            Start building your resume today — it's completely free and takes less than 10 minutes.
          </p>
          <motion.button
            onClick={handleCTA}
            className="bg-white text-primary-600 font-semibold px-8 py-3 rounded-xl hover:shadow-lg transition-all duration-200 relative z-10 flex items-center gap-2 mx-auto"
            whileHover={{ scale: 1.04 }}
            whileTap={{ scale: 0.96 }}
          >
            Get Started for Free <ArrowRight />
          </motion.button>
        </motion.div>
      </section>

      {/* ── Footer ── */}
      <footer className="border-t border-gray-100 bg-white py-8">
        <div className="max-w-7xl mx-auto px-6 flex flex-col sm:flex-row items-center justify-between gap-4">
          <span className="font-display text-lg font-bold text-primary-600">ResumeBuildr</span>
          <p className="text-gray-400 text-sm">© {new Date().getFullYear()} ResumeBuildr. All rights reserved.</p>
          <div className="flex gap-5 text-sm text-gray-400">
            <button onClick={() => navigate('/login')} className="hover:text-gray-700 transition-colors">Sign In</button>
            <button onClick={() => navigate('/register')} className="hover:text-gray-700 transition-colors">Register</button>
          </div>
        </div>
      </footer>

    </div>
  )
}

// ─── Sub-components ────────────────────────────────────────

function FeatureCard({ feature }) {
  return (
    <motion.div
      variants={staggerChild}
      className="card hover:shadow-md transition-shadow group"
      whileHover={{ y: -4, transition: { duration: 0.2 } }}
    >
      <div className="mb-4 w-10 h-10 rounded-xl bg-primary-50 flex items-center justify-center text-primary-500 group-hover:bg-primary-100 transition-colors">
        {feature.icon}
      </div>
      <h3 className="font-semibold text-gray-800 mb-2">{feature.title}</h3>
      <p className="text-gray-500 text-sm leading-relaxed">{feature.desc}</p>
    </motion.div>
  )
}

function StepCard({ step, index, total }) {
  return (
    <motion.div
      variants={staggerChild}
      className="relative"
    >
      {index < total - 1 && (
        <div className="hidden lg:block absolute top-6 left-[calc(100%-1rem)] w-8 border-t-2 border-dashed border-primary-200 z-0" />
      )}
      <div className="card relative z-10">
        <span className="font-display text-4xl font-bold text-primary-100">{step.num}</span>
        <h3 className="font-semibold text-gray-800 mt-2 mb-1">{step.title}</h3>
        <p className="text-gray-500 text-sm leading-relaxed">{step.desc}</p>
      </div>
    </motion.div>
  )
}

function TestiCard({ t }) {
  return (
    <motion.div
      variants={staggerChild}
      className="card"
      whileHover={{ scale: 1.02, transition: { duration: 0.2 } }}
    >
      <div className="flex gap-1 mb-4 text-yellow-400">
        {[...Array(5)].map((_, i) => <StarIcon key={i} />)}
      </div>
      <p className="text-gray-600 text-sm leading-relaxed mb-5">"{t.text}"</p>
      <div className="flex items-center gap-3">
        <div className="w-9 h-9 rounded-full bg-primary-100 text-primary-600 text-xs font-bold flex items-center justify-center">
          {t.avatar}
        </div>
        <div>
          <div className="text-sm font-semibold text-gray-800">{t.name}</div>
          <div className="text-xs text-gray-400">{t.role}</div>
        </div>
      </div>
    </motion.div>
  )
}