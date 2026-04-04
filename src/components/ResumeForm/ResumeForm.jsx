import { useState } from 'react'

const SectionHeader = ({ title, onAdd, addLabel }) => (
  <div className="flex items-center justify-between mb-4">
    <h3 className="section-title mb-0 border-0 pb-0">{title}</h3>
    {onAdd && (
      <button onClick={onAdd} className="text-xs text-primary-600 hover:text-primary-700 font-medium flex items-center gap-1">
        + {addLabel}
      </button>
    )}
  </div>
)

const InputField = ({ label, name, value, onChange, type = 'text', placeholder }) => (
  <div>
    <label className="text-xs font-medium text-gray-500 block mb-1">{label}</label>
    <input
      name={name}
      type={type}
      value={value || ''}
      onChange={onChange}
      placeholder={placeholder}
      className="input-field text-sm"
    />
  </div>
)

export default function ResumeForm({ data, onChange }) {
  const [activeSection, setActiveSection] = useState('personal')

  const updatePersonal = (e) => {
    onChange({ ...data, personalInfo: { ...data.personalInfo, [e.target.name]: e.target.value } })
  }

  // Experience helpers
  const addExperience = () => {
    onChange({
      ...data,
      experience: [...data.experience, { company: '', position: '', startDate: '', endDate: '', current: false, description: '' }],
    })
  }

  const updateExperience = (index, e) => {
    const updated = data.experience.map((exp, i) =>
      i === index ? { ...exp, [e.target.name]: e.target.type === 'checkbox' ? e.target.checked : e.target.value } : exp
    )
    onChange({ ...data, experience: updated })
  }

  const removeExperience = (index) => {
    onChange({ ...data, experience: data.experience.filter((_, i) => i !== index) })
  }

  // Education helpers
  const addEducation = () => {
    onChange({
      ...data,
      education: [...data.education, { institution: '', degree: '', field: '', startDate: '', endDate: '', grade: '' }],
    })
  }

  const updateEducation = (index, e) => {
    const updated = data.education.map((edu, i) =>
      i === index ? { ...edu, [e.target.name]: e.target.value } : edu
    )
    onChange({ ...data, education: updated })
  }

  const removeEducation = (index) => {
    onChange({ ...data, education: data.education.filter((_, i) => i !== index) })
  }

  // Skills helpers
  const addSkill = () => {
    onChange({ ...data, skills: [...data.skills, { name: '', level: 'Intermediate' }] })
  }

  const updateSkill = (index, e) => {
    const updated = data.skills.map((s, i) => (i === index ? { ...s, [e.target.name]: e.target.value } : s))
    onChange({ ...data, skills: updated })
  }

  const removeSkill = (index) => {
    onChange({ ...data, skills: data.skills.filter((_, i) => i !== index) })
  }

  // Projects helpers
  const addProject = () => {
    onChange({ ...data, projects: [...data.projects, { name: '', description: '', tech: '', link: '' }] })
  }

  const updateProject = (index, e) => {
    const updated = data.projects.map((p, i) => (i === index ? { ...p, [e.target.name]: e.target.value } : p))
    onChange({ ...data, projects: updated })
  }

  const removeProject = (index) => {
    onChange({ ...data, projects: data.projects.filter((_, i) => i !== index) })
  }

  const sections = [
    { key: 'personal', label: 'Personal' },
    { key: 'experience', label: 'Experience' },
    { key: 'education', label: 'Education' },
    { key: 'skills', label: 'Skills' },
    { key: 'projects', label: 'Projects' },
  ]

  return (
    <div className="flex flex-col h-full">

      {/* Section tabs */}
      <div className="flex gap-1 mb-5 bg-gray-100 p-1 rounded-xl overflow-x-auto">
        {sections.map((s) => (
          <button
            key={s.key}
            onClick={() => setActiveSection(s.key)}
            className={`flex-1 text-xs font-medium py-2 px-3 rounded-lg transition-all whitespace-nowrap ${
              activeSection === s.key ? 'bg-white text-primary-600 shadow-sm' : 'text-gray-500 hover:text-gray-700'
            }`}
          >
            {s.label}
          </button>
        ))}
      </div>

      <div className="flex-1 overflow-y-auto space-y-4 pr-1">

        {/* Personal Info */}
        {activeSection === 'personal' && (
          <div className="space-y-3">
            <InputField label="Full Name" name="fullName" value={data.personalInfo?.fullName} onChange={updatePersonal} placeholder="Asad Hussain" />
            <InputField label="Email" name="email" value={data.personalInfo?.email} onChange={updatePersonal} placeholder="asad@email.com" />
            <InputField label="Phone" name="phone" value={data.personalInfo?.phone} onChange={updatePersonal} placeholder="+92 300 0000000" />
            <InputField label="Location" name="location" value={data.personalInfo?.location} onChange={updatePersonal} placeholder="Karachi, Pakistan" />
            <InputField label="LinkedIn" name="linkedin" value={data.personalInfo?.linkedin} onChange={updatePersonal} placeholder="linkedin.com/in/asad" />
            <InputField label="Portfolio / Website" name="website" value={data.personalInfo?.website} onChange={updatePersonal} placeholder="asad.dev" />
            <div>
              <label className="text-xs font-medium text-gray-500 block mb-1">Professional Summary</label>
              <textarea
                name="summary"
                value={data.personalInfo?.summary || ''}
                onChange={updatePersonal}
                placeholder="A brief description of who you are and what you bring to the table..."
                rows={4}
                className="input-field text-sm resize-none"
              />
            </div>
          </div>
        )}

        {/* Experience */}
        {activeSection === 'experience' && (
          <div className="space-y-4">
            <SectionHeader title="Work Experience" onAdd={addExperience} addLabel="Add Experience" />
            {data.experience?.length === 0 && (
              <p className="text-sm text-gray-400 text-center py-4">No experience added yet.</p>
            )}
            {data.experience?.map((exp, i) => (
              <div key={i} className="bg-gray-50 rounded-xl p-4 space-y-3">
                <div className="flex justify-between items-center">
                  <span className="text-xs font-semibold text-gray-500">Experience {i + 1}</span>
                  <button onClick={() => removeExperience(i)} className="text-xs text-red-400 hover:text-red-500">Remove</button>
                </div>
                <InputField label="Company" name="company" value={exp.company} onChange={(e) => updateExperience(i, e)} placeholder="Google" />
                <InputField label="Position" name="position" value={exp.position} onChange={(e) => updateExperience(i, e)} placeholder="Software Engineer" />
                <div className="grid grid-cols-2 gap-3">
                  <InputField label="Start Date" name="startDate" value={exp.startDate} onChange={(e) => updateExperience(i, e)} placeholder="Jan 2022" />
                  <InputField label="End Date" name="endDate" value={exp.endDate} onChange={(e) => updateExperience(i, e)} placeholder="Present" />
                </div>
                <label className="flex items-center gap-2 text-xs text-gray-500 cursor-pointer">
                  <input type="checkbox" name="current" checked={exp.current} onChange={(e) => updateExperience(i, e)} className="rounded" />
                  Currently working here
                </label>
                <div>
                  <label className="text-xs font-medium text-gray-500 block mb-1">Description</label>
                  <textarea
                    name="description"
                    value={exp.description}
                    onChange={(e) => updateExperience(i, e)}
                    placeholder="Describe your responsibilities and achievements..."
                    rows={3}
                    className="input-field text-sm resize-none"
                  />
                </div>
              </div>
            ))}
            <button onClick={addExperience} className="btn-secondary w-full text-sm">+ Add Experience</button>
          </div>
        )}

        {/* Education */}
        {activeSection === 'education' && (
          <div className="space-y-4">
            <SectionHeader title="Education" onAdd={addEducation} addLabel="Add Education" />
            {data.education?.length === 0 && (
              <p className="text-sm text-gray-400 text-center py-4">No education added yet.</p>
            )}
            {data.education?.map((edu, i) => (
              <div key={i} className="bg-gray-50 rounded-xl p-4 space-y-3">
                <div className="flex justify-between items-center">
                  <span className="text-xs font-semibold text-gray-500">Education {i + 1}</span>
                  <button onClick={() => removeEducation(i)} className="text-xs text-red-400 hover:text-red-500">Remove</button>
                </div>
                <InputField label="Institution" name="institution" value={edu.institution} onChange={(e) => updateEducation(i, e)} placeholder="FAST NUCES" />
                <InputField label="Degree" name="degree" value={edu.degree} onChange={(e) => updateEducation(i, e)} placeholder="Bachelor's" />
                <InputField label="Field of Study" name="field" value={edu.field} onChange={(e) => updateEducation(i, e)} placeholder="Computer Science" />
                <div className="grid grid-cols-2 gap-3">
                  <InputField label="Start Date" name="startDate" value={edu.startDate} onChange={(e) => updateEducation(i, e)} placeholder="2020" />
                  <InputField label="End Date" name="endDate" value={edu.endDate} onChange={(e) => updateEducation(i, e)} placeholder="2024" />
                </div>
                <InputField label="Grade / CGPA" name="grade" value={edu.grade} onChange={(e) => updateEducation(i, e)} placeholder="3.8 / 4.0" />
              </div>
            ))}
            <button onClick={addEducation} className="btn-secondary w-full text-sm">+ Add Education</button>
          </div>
        )}

        {/* Skills */}
        {activeSection === 'skills' && (
          <div className="space-y-4">
            <SectionHeader title="Skills" onAdd={addSkill} addLabel="Add Skill" />
            {data.skills?.length === 0 && (
              <p className="text-sm text-gray-400 text-center py-4">No skills added yet.</p>
            )}
            {data.skills?.map((skill, i) => (
              <div key={i} className="flex gap-2 items-center">
                <input
                  name="name"
                  value={skill.name}
                  onChange={(e) => updateSkill(i, e)}
                  placeholder="e.g. React.js"
                  className="input-field text-sm flex-1"
                />
                <select
                  name="level"
                  value={skill.level}
                  onChange={(e) => updateSkill(i, e)}
                  className="input-field text-sm w-36"
                >
                  <option>Beginner</option>
                  <option>Intermediate</option>
                  <option>Advanced</option>
                  <option>Expert</option>
                </select>
                <button onClick={() => removeSkill(i)} className="text-red-300 hover:text-red-400 text-lg leading-none">×</button>
              </div>
            ))}
            <button onClick={addSkill} className="btn-secondary w-full text-sm">+ Add Skill</button>
          </div>
        )}

        {/* Projects */}
        {activeSection === 'projects' && (
          <div className="space-y-4">
            <SectionHeader title="Projects" onAdd={addProject} addLabel="Add Project" />
            {data.projects?.length === 0 && (
              <p className="text-sm text-gray-400 text-center py-4">No projects added yet.</p>
            )}
            {data.projects?.map((proj, i) => (
              <div key={i} className="bg-gray-50 rounded-xl p-4 space-y-3">
                <div className="flex justify-between items-center">
                  <span className="text-xs font-semibold text-gray-500">Project {i + 1}</span>
                  <button onClick={() => removeProject(i)} className="text-xs text-red-400 hover:text-red-500">Remove</button>
                </div>
                <InputField label="Project Name" name="name" value={proj.name} onChange={(e) => updateProject(i, e)} placeholder="Resume Builder" />
                <InputField label="Tech Stack" name="tech" value={proj.tech} onChange={(e) => updateProject(i, e)} placeholder="React, Node.js, MongoDB" />
                <InputField label="Live Link / GitHub" name="link" value={proj.link} onChange={(e) => updateProject(i, e)} placeholder="github.com/asad/project" />
                <div>
                  <label className="text-xs font-medium text-gray-500 block mb-1">Description</label>
                  <textarea
                    name="description"
                    value={proj.description}
                    onChange={(e) => updateProject(i, e)}
                    placeholder="What does this project do? What problem does it solve?"
                    rows={3}
                    className="input-field text-sm resize-none"
                  />
                </div>
              </div>
            ))}
            <button onClick={addProject} className="btn-secondary w-full text-sm">+ Add Project</button>
          </div>
        )}

      </div>
    </div>
  )
}
