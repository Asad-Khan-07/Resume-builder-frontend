const Icons = {
  email: (
    <svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <rect x="2" y="4" width="20" height="16" rx="2"/><path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7"/>
    </svg>
  ),
  phone: (
    <svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07A19.5 19.5 0 0 1 4.69 12a19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 3.56 2h3a2 2 0 0 1 2 1.72c.127.96.361 1.903.7 2.81a2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45c.907.339 1.85.573 2.81.7A2 2 0 0 1 22 16.92z"/>
    </svg>
  ),
  location: (
    <svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M20 10c0 6-8 12-8 12s-8-6-8-12a8 8 0 0 1 16 0Z"/><circle cx="12" cy="10" r="3"/>
    </svg>
  ),
  linkedin: (
    <svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z"/><rect x="2" y="9" width="4" height="12"/><circle cx="4" cy="4" r="2"/>
    </svg>
  ),
  website: (
    <svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <circle cx="12" cy="12" r="10"/><path d="M12 2a14.5 14.5 0 0 0 0 20 14.5 14.5 0 0 0 0-20"/><path d="M2 12h20"/>
    </svg>
  ),
}

// ─── Modern Template ──────────────────────────────────────
const ModernTemplate = ({ data }) => {
  const { personalInfo: p = {}, experience = [], education = [], skills = [], projects = [] } = data

  return (
    <div className="font-sans text-gray-800 text-[11px] leading-relaxed">
      <div className="bg-primary-600 text-white px-7 py-5">
        <h1 className="text-2xl font-bold tracking-wide">{p.fullName || 'Your Name'}</h1>
        <div className="flex flex-wrap gap-x-4 gap-y-1 mt-2 text-blue-100 text-[10px]">
          {p.email && <span className="flex items-center gap-1">{Icons.email} {p.email}</span>}
          {p.phone && <span className="flex items-center gap-1">{Icons.phone} {p.phone}</span>}
          {p.location && <span className="flex items-center gap-1">{Icons.location} {p.location}</span>}
          {p.linkedin && <span className="flex items-center gap-1">{Icons.linkedin} {p.linkedin}</span>}
          {p.website && <span className="flex items-center gap-1">{Icons.website} {p.website}</span>}
        </div>
      </div>

      <div className="px-7 py-5 space-y-5">
        {p.summary && (
          <div>
            <h2 className="text-[10px] font-bold uppercase tracking-widest text-primary-600 border-b border-primary-200 pb-1 mb-2">Summary</h2>
            <p className="text-gray-600">{p.summary}</p>
          </div>
        )}

        {experience.length > 0 && (
          <div>
            <h2 className="text-[10px] font-bold uppercase tracking-widest text-primary-600 border-b border-primary-200 pb-1 mb-3">Experience</h2>
            <div className="space-y-3">
              {experience.map((exp, i) => (
                <div key={i}>
                  <div className="flex justify-between items-start">
                    <div>
                      <p className="font-semibold text-gray-800">{exp.position}</p>
                      <p className="text-primary-500 text-[10px]">{exp.company}</p>
                    </div>
                    <span className="text-gray-400 text-[10px] whitespace-nowrap">
                      {exp.startDate} – {exp.current ? 'Present' : exp.endDate}
                    </span>
                  </div>
                  {exp.description && <p className="text-gray-500 mt-1">{exp.description}</p>}
                </div>
              ))}
            </div>
          </div>
        )}

        {education.length > 0 && (
          <div>
            <h2 className="text-[10px] font-bold uppercase tracking-widest text-primary-600 border-b border-primary-200 pb-1 mb-3">Education</h2>
            <div className="space-y-2">
              {education.map((edu, i) => (
                <div key={i} className="flex justify-between">
                  <div>
                    <p className="font-semibold">{edu.degree} {edu.field && `in ${edu.field}`}</p>
                    <p className="text-gray-500">{edu.institution} {edu.grade && `· ${edu.grade}`}</p>
                  </div>
                  <span className="text-gray-400 text-[10px] whitespace-nowrap">{edu.startDate} – {edu.endDate}</span>
                </div>
              ))}
            </div>
          </div>
        )}

        {skills.length > 0 && (
          <div>
            <h2 className="text-[10px] font-bold uppercase tracking-widest text-primary-600 border-b border-primary-200 pb-1 mb-3">Skills</h2>
            <div className="flex flex-wrap gap-2">
              {skills.map((skill, i) => (
                <span key={i} className="bg-primary-50 text-primary-700 px-2.5 py-0.5 rounded-full text-[10px] font-medium">
                  {skill.name} {skill.level !== 'Intermediate' && `· ${skill.level}`}
                </span>
              ))}
            </div>
          </div>
        )}

        {projects.length > 0 && (
          <div>
            <h2 className="text-[10px] font-bold uppercase tracking-widest text-primary-600 border-b border-primary-200 pb-1 mb-3">Projects</h2>
            <div className="space-y-2">
              {projects.map((proj, i) => (
                <div key={i}>
                  <div className="flex justify-between">
                    <p className="font-semibold">{proj.name}</p>
                    {proj.link && <a href={proj.link} className="text-primary-500 text-[10px]">{proj.link}</a>}
                  </div>
                  {proj.tech && <p className="text-gray-400 text-[10px]">{proj.tech}</p>}
                  {proj.description && <p className="text-gray-500 mt-0.5">{proj.description}</p>}
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  )
}

// ─── Classic Template ─────────────────────────────────────
const ClassicTemplate = ({ data }) => {
  const { personalInfo: p = {}, experience = [], education = [], skills = [], projects = [] } = data

  return (
    <div className="font-serif text-gray-800 text-[11px] leading-relaxed px-8 py-6">
      <div className="text-center border-b-2 border-gray-800 pb-4 mb-5">
        <h1 className="text-2xl font-bold tracking-wide uppercase">{p.fullName || 'Your Name'}</h1>
        <div className="flex flex-wrap justify-center gap-3 mt-2 text-gray-500 text-[10px]">
          {p.email && <span className="flex items-center gap-1">{Icons.email} {p.email}</span>}
          {p.phone && <span className="flex items-center gap-1">{Icons.phone} {p.phone}</span>}
          {p.location && <span className="flex items-center gap-1">{Icons.location} {p.location}</span>}
          {p.website && <span className="flex items-center gap-1">{Icons.website} {p.website}</span>}
        </div>
      </div>

      {p.summary && (
        <div className="mb-5">
          <h2 className="font-bold uppercase text-[10px] tracking-widest mb-2">Objective</h2>
          <p className="text-gray-600">{p.summary}</p>
        </div>
      )}

      {experience.length > 0 && (
        <div className="mb-5">
          <h2 className="font-bold uppercase text-[10px] tracking-widest border-b border-gray-300 pb-1 mb-3">Experience</h2>
          {experience.map((exp, i) => (
            <div key={i} className="mb-3">
              <div className="flex justify-between">
                <span className="font-bold">{exp.position} — {exp.company}</span>
                <span className="text-gray-400">{exp.startDate} – {exp.current ? 'Present' : exp.endDate}</span>
              </div>
              {exp.description && <p className="text-gray-600 mt-1">{exp.description}</p>}
            </div>
          ))}
        </div>
      )}

      {education.length > 0 && (
        <div className="mb-5">
          <h2 className="font-bold uppercase text-[10px] tracking-widest border-b border-gray-300 pb-1 mb-3">Education</h2>
          {education.map((edu, i) => (
            <div key={i} className="flex justify-between mb-2">
              <span><strong>{edu.institution}</strong> — {edu.degree} {edu.field && `in ${edu.field}`}</span>
              <span className="text-gray-400">{edu.startDate} – {edu.endDate}</span>
            </div>
          ))}
        </div>
      )}

      {skills.length > 0 && (
        <div className="mb-5">
          <h2 className="font-bold uppercase text-[10px] tracking-widest border-b border-gray-300 pb-1 mb-3">Skills</h2>
          <p className="text-gray-600">{skills.map(s => s.name).join(' · ')}</p>
        </div>
      )}

      {projects.length > 0 && (
        <div>
          <h2 className="font-bold uppercase text-[10px] tracking-widest border-b border-gray-300 pb-1 mb-3">Projects</h2>
          {projects.map((proj, i) => (
            <div key={i} className="mb-2">
              <strong>{proj.name}</strong> {proj.tech && <span className="text-gray-400">({proj.tech})</span>}
              {proj.description && <p className="text-gray-600">{proj.description}</p>}
            </div>
          ))}
        </div>
      )}
    </div>
  )
}

// ─── Minimal Template ─────────────────────────────────────
const MinimalTemplate = ({ data }) => {
  const { personalInfo: p = {}, experience = [], education = [], skills = [], projects = [] } = data

  return (
    <div className="font-sans text-gray-700 text-[11px] leading-relaxed px-8 py-6">
      <h1 className="text-3xl font-light text-gray-900 mb-1">{p.fullName || 'Your Name'}</h1>
      <div className="flex flex-wrap gap-3 text-gray-400 text-[10px] mb-6">
        {p.email && <span className="flex items-center gap-1">{Icons.email} {p.email}</span>}
        {p.phone && <span className="flex items-center gap-1">{Icons.phone} {p.phone}</span>}
        {p.location && <span className="flex items-center gap-1">{Icons.location} {p.location}</span>}
      </div>

      {p.summary && <p className="text-gray-500 mb-6 border-l-2 border-gray-200 pl-3">{p.summary}</p>}

      {experience.length > 0 && (
        <div className="mb-6">
          <h2 className="text-[9px] uppercase tracking-[0.2em] text-gray-400 mb-3">Experience</h2>
          {experience.map((exp, i) => (
            <div key={i} className="mb-4">
              <div className="flex justify-between">
                <span className="font-medium text-gray-800">{exp.position}</span>
                <span className="text-gray-400">{exp.startDate} – {exp.current ? 'Now' : exp.endDate}</span>
              </div>
              <p className="text-gray-400">{exp.company}</p>
              {exp.description && <p className="text-gray-500 mt-1">{exp.description}</p>}
            </div>
          ))}
        </div>
      )}

      {education.length > 0 && (
        <div className="mb-6">
          <h2 className="text-[9px] uppercase tracking-[0.2em] text-gray-400 mb-3">Education</h2>
          {education.map((edu, i) => (
            <div key={i} className="mb-2">
              <div className="flex justify-between">
                <span className="font-medium">{edu.institution}</span>
                <span className="text-gray-400">{edu.endDate}</span>
              </div>
              <p className="text-gray-400">{edu.degree} {edu.field && `· ${edu.field}`}</p>
            </div>
          ))}
        </div>
      )}

      {skills.length > 0 && (
        <div className="mb-6">
          <h2 className="text-[9px] uppercase tracking-[0.2em] text-gray-400 mb-3">Skills</h2>
          <div className="flex flex-wrap gap-1.5">
            {skills.map((skill, i) => (
              <span key={i} className="border border-gray-200 text-gray-600 px-2 py-0.5 rounded text-[10px]">{skill.name}</span>
            ))}
          </div>
        </div>
      )}

      {projects.length > 0 && (
        <div>
          <h2 className="text-[9px] uppercase tracking-[0.2em] text-gray-400 mb-3">Projects</h2>
          {projects.map((proj, i) => (
            <div key={i} className="mb-3">
              <span className="font-medium">{proj.name}</span>
              {proj.tech && <span className="text-gray-400 ml-2 text-[10px]">{proj.tech}</span>}
              {proj.description && <p className="text-gray-500 mt-0.5">{proj.description}</p>}
            </div>
          ))}
        </div>
      )}
    </div>
  )
}

// ─── Main Preview Component ───────────────────────────────
export default function ResumePreview({ data, template }) {
  const templates = { modern: ModernTemplate, classic: ClassicTemplate, minimal: MinimalTemplate }
  const Template = templates[template] || ModernTemplate

  return (
    <div className="bg-white shadow-lg rounded-xl overflow-hidden min-h-[600px] border border-gray-100">
      <Template data={data} />
    </div>
  )
}