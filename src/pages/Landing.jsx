import { useNavigate } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'

const features = [
  {
    icon: '✦',
    title: 'Beautiful Templates',
    desc: 'Choose from professionally designed templates that make you stand out from the crowd.',
  },
  {
    icon: '⚡',
    title: 'Build in Minutes',
    desc: 'Our intuitive builder guides you step-by-step. No design skills needed whatsoever.',
  },
  {
    icon: '☁',
    title: 'Save & Access Anywhere',
    desc: 'Your resumes are securely saved in the cloud. Access and edit them anytime, anywhere.',
  },
  {
    icon: '🎯',
    title: 'ATS Friendly',
    desc: 'Our formats are optimized for Applicant Tracking Systems so recruiters actually see you.',
  },
]

const steps = [
  { num: '01', title: 'Create Account', desc: 'Sign up for free in seconds — no credit card required.' },
  { num: '02', title: 'Fill Your Details', desc: 'Add your experience, skills, and education with our easy form.' },
  { num: '03', title: 'Pick a Template', desc: 'Choose a design that fits your industry and personality.' },
  { num: '04', title: 'Download & Apply', desc: 'Export your polished resume and start landing interviews.' },
]

const testimonials = [
  {
    name: 'Aisha K.',
    role: 'Software Engineer',
    text: 'I built my resume in under 20 minutes and got a callback within a week. Absolutely love this tool!',
    avatar: 'AK',
  },
  {
    name: 'Bilal M.',
    role: 'Product Manager',
    text: 'The templates look so clean and professional. Way better than anything I tried before.',
    avatar: 'BM',
  },
  {
    name: 'Sara N.',
    role: 'UX Designer',
    text: 'Finally a resume builder that doesn\'t look like it\'s from 2010. Highly recommend!',
    avatar: 'SN',
  },
]

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
      <nav className="bg-white border-b border-gray-100 sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-6 h-16 flex items-center justify-between">
          <span className="font-display text-xl font-bold text-primary-600">ResumeBuildr</span>
          <div className="flex items-center gap-3">
            {user ? (
              <button onClick={() => navigate('/dashboard')} className="btn-primary text-sm py-2 px-5">
                Go to Dashboard →
              </button>
            ) : (
              <>
                <button onClick={() => navigate('/login')} className="btn-secondary text-sm py-2 px-4">
                  Sign In
                </button>
                <button onClick={() => navigate('/register')} className="btn-primary text-sm py-2 px-5">
                  Get Started Free
                </button>
              </>
            )}
          </div>
        </div>
      </nav>

      {/* ── Hero ── */}
      <section className="max-w-7xl mx-auto px-6 pt-24 pb-20 text-center">
        <div className="inline-flex items-center gap-2 bg-primary-50 text-primary-600 text-xs font-semibold px-4 py-1.5 rounded-full mb-6">
          <span className="w-1.5 h-1.5 rounded-full bg-primary-500 animate-pulse inline-block" />
          Free to use · No credit card required
        </div>

        <h1 className="font-display text-5xl md:text-6xl font-bold leading-tight text-[#1a1a2e] mb-6 max-w-3xl mx-auto">
          Build a Resume That{' '}
          <span className="text-primary-600 relative">
            Gets You Hired
            <svg className="absolute -bottom-1 left-0 w-full" viewBox="0 0 300 12" fill="none">
              <path d="M2 9 Q75 2 150 9 Q225 16 298 9" stroke="#4f6ef7" strokeWidth="3" strokeLinecap="round" fill="none" opacity="0.4" />
            </svg>
          </span>
        </h1>

        <p className="text-gray-500 text-lg max-w-xl mx-auto mb-10 leading-relaxed">
          Create a stunning, professional resume in minutes. Stand out from thousands of applicants and land your dream job.
        </p>

        <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
          <button
            onClick={handleCTA}
            className="btn-primary text-base px-8 py-3 shadow-lg shadow-primary-500/20"
          >
            Create My Resume — It's Free
          </button>
          <a href="#how-it-works" className="text-gray-500 text-sm hover:text-gray-700 transition-colors">
            See how it works ↓
          </a>
        </div>

        {/* Hero Card Preview */}
        <div className="mt-16 max-w-2xl mx-auto">
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
                  <span className="text-primary-400 mt-0.5">▸</span>
                  {item}
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ── Features ── */}
      <section className="bg-white py-20 border-y border-gray-100">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-14">
            <h2 className="font-display text-3xl font-bold mb-3">Everything You Need</h2>
            <p className="text-gray-500 max-w-md mx-auto">All the tools to create a resume that truly represents your best self.</p>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {features.map((f) => (
              <div key={f.title} className="card hover:shadow-md transition-shadow group">
                <div className="text-2xl mb-4 w-10 h-10 rounded-xl bg-primary-50 flex items-center justify-center group-hover:bg-primary-100 transition-colors">
                  {f.icon}
                </div>
                <h3 className="font-semibold text-gray-800 mb-2">{f.title}</h3>
                <p className="text-gray-500 text-sm leading-relaxed">{f.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── How It Works ── */}
      <section id="how-it-works" className="py-20 max-w-7xl mx-auto px-6">
        <div className="text-center mb-14">
          <h2 className="font-display text-3xl font-bold mb-3">How It Works</h2>
          <p className="text-gray-500 max-w-md mx-auto">Four simple steps to your perfect resume.</p>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {steps.map((step, i) => (
            <div key={step.num} className="relative">
              {i < steps.length - 1 && (
                <div className="hidden lg:block absolute top-6 left-[calc(100%-1rem)] w-8 border-t-2 border-dashed border-primary-200 z-0" />
              )}
              <div className="card relative z-10">
                <span className="font-display text-4xl font-bold text-primary-100">{step.num}</span>
                <h3 className="font-semibold text-gray-800 mt-2 mb-1">{step.title}</h3>
                <p className="text-gray-500 text-sm leading-relaxed">{step.desc}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* ── Testimonials ── */}
      <section className="bg-white border-y border-gray-100 py-20">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-14">
            <h2 className="font-display text-3xl font-bold mb-3">Loved by Job Seekers</h2>
            <p className="text-gray-500 max-w-md mx-auto">Join thousands who have landed their dream jobs with ResumeBuildr.</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {testimonials.map((t) => (
              <div key={t.name} className="card">
                <div className="flex gap-1 mb-4">
                  {[...Array(5)].map((_, i) => (
                    <span key={i} className="text-yellow-400 text-sm">★</span>
                  ))}
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
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── CTA Banner ── */}
      <section className="py-20 max-w-7xl mx-auto px-6 text-center">
        <div className="bg-primary-600 rounded-3xl px-8 py-16 relative overflow-hidden">
          {/* background decoration */}
          <div className="absolute top-0 right-0 w-64 h-64 rounded-full bg-white opacity-5 translate-x-16 -translate-y-16" />
          <div className="absolute bottom-0 left-0 w-48 h-48 rounded-full bg-white opacity-5 -translate-x-10 translate-y-10" />

          <h2 className="font-display text-3xl md:text-4xl font-bold text-white mb-4 relative z-10">
            Ready to Land Your Dream Job?
          </h2>
          <p className="text-primary-100 mb-8 relative z-10 max-w-md mx-auto">
            Start building your resume today — it's completely free and takes less than 10 minutes.
          </p>
          <button
            onClick={handleCTA}
            className="bg-white text-primary-600 font-semibold px-8 py-3 rounded-xl hover:shadow-lg transition-all duration-200 active:scale-95 relative z-10"
          >
            Get Started for Free →
          </button>
        </div>
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
