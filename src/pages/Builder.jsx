import { useState, useEffect, useRef, useCallback } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import Navbar from '../components/Navbar/Navbar'
import ResumeForm from '../components/ResumeForm/ResumeForm'
import ResumePreview from '../components/ResumePreview/ResumePreview'
import api from '../utils/api'
import toast from 'react-hot-toast'

const TEMPLATES = [
  { key: 'modern', label: 'Modern' },
  { key: 'classic', label: 'Classic' },
  { key: 'minimal', label: 'Minimal' },
]

const defaultData = {
  title: 'My Resume',
  template: 'modern',
  personalInfo: { fullName: '', email: '', phone: '', location: '', linkedin: '', website: '', summary: '' },
  experience: [],
  education: [],
  skills: [],
  projects: [],
}

const SaveIcon = () => (
  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M19 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h11l5 5v11a2 2 0 0 1-2 2z"/>
    <polyline points="17 21 17 13 7 13 7 21"/>
    <polyline points="7 3 7 8 15 8"/>
  </svg>
)

const DownloadIcon = () => (
  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/>
    <polyline points="7 10 12 15 17 10"/>
    <line x1="12" y1="15" x2="12" y2="3"/>
  </svg>
)

const BackIcon = () => (
  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <polyline points="15 18 9 12 15 6"/>
  </svg>
)

export default function Builder() {
  const { id } = useParams()
  const navigate = useNavigate()
  const [resumeData, setResumeData] = useState(defaultData)
  const [loading, setLoading] = useState(true)
  const [saving, setSaving] = useState(false)
  const [lastSaved, setLastSaved] = useState(null)
  const saveTimer = useRef(null)
  const previewRef = useRef()

  useEffect(() => {
    const fetchResume = async () => {
      try {
        const res = await api.get(`/resumes/${id}`)
        setResumeData(res.data)
      } catch (err) {
        toast.error('Could not load resume')
        navigate('/')
      } finally {
        setLoading(false)
      }
    }
    fetchResume()
  }, [id])

  const autoSave = useCallback(async (data) => {
    clearTimeout(saveTimer.current)
    saveTimer.current = setTimeout(async () => {
      setSaving(true)
      try {
        await api.put(`/resumes/${id}`, data)
        setLastSaved(new Date())
      } catch (err) {
        // silent fail
      } finally {
        setSaving(false)
      }
    }, 1500)
  }, [id])

  const handleDataChange = (updated) => {
    setResumeData(updated)
    autoSave(updated)
  }

  const handleTemplateChange = (template) => {
    const updated = { ...resumeData, template }
    setResumeData(updated)
    autoSave(updated)
  }

  const handleTitleChange = (e) => {
    const updated = { ...resumeData, title: e.target.value }
    setResumeData(updated)
    autoSave(updated)
  }

  const handleSave = async () => {
    setSaving(true)
    try {
      await api.put(`/resumes/${id}`, resumeData)
      setLastSaved(new Date())
      toast.success('Resume saved!')
    } catch (err) {
      toast.error('Save failed')
    } finally {
      setSaving(false)
    }
  }

  const handleDownload = () => {
    window.print()
    toast.success('Print / Save as PDF dialog opened!')
  }

  const formatTime = (date) => {
    if (!date) return null
    return date.toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit' })
  }

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50">
        <Navbar />
        <div className="flex items-center justify-center h-96 text-gray-400">Loading resume...</div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />

      {/* Builder toolbar */}
      <div className="bg-white border-b border-gray-100 px-6 py-3 flex items-center gap-4 flex-wrap print:hidden">

        {/* Back to dashboard */}
        <button
          onClick={() => navigate('/dashboard')}
          className="flex items-center gap-1.5 text-sm text-gray-500 hover:text-gray-700 transition-colors"
        >
          <BackIcon />
          Dashboard
        </button>

        <span className="text-gray-200">|</span>

        {/* Resume title */}
        <input
          value={resumeData.title}
          onChange={handleTitleChange}
          className="font-medium text-gray-700 text-sm bg-transparent border-b border-transparent hover:border-gray-200 focus:border-primary-400 focus:outline-none px-1 py-0.5 transition-all"
        />

        {/* Template switcher */}
        <div className="flex items-center gap-2 ml-4">
          <span className="text-xs text-gray-400">Template:</span>
          {TEMPLATES.map((t) => (
            <button
              key={t.key}
              onClick={() => handleTemplateChange(t.key)}
              className={`text-xs px-3 py-1.5 rounded-lg font-medium transition-all ${
                resumeData.template === t.key
                  ? 'bg-primary-500 text-white'
                  : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
              }`}
            >
              {t.label}
            </button>
          ))}
        </div>

        <div className="flex-1" />

        {/* Save status */}
        {lastSaved && (
          <span className="text-xs text-gray-400">Saved at {formatTime(lastSaved)}</span>
        )}
        {saving && (
          <span className="text-xs text-gray-400 animate-pulse">Saving...</span>
        )}

        {/* Save button */}
        <button
          onClick={handleSave}
          disabled={saving}
          className="btn-secondary text-sm py-2 flex items-center gap-1.5"
        >
          <SaveIcon />
          Save
        </button>

        {/* Download PDF button */}
        <button
          onClick={handleDownload}
          className="btn-primary text-sm py-2 flex items-center gap-1.5"
        >
          <DownloadIcon />
          Download PDF
        </button>

      </div>

      {/* Main editor area */}
      <div className="max-w-7xl mx-auto px-6 py-6 grid grid-cols-1 lg:grid-cols-2 gap-6 h-[calc(100vh-130px)]">

        {/* Left: Form */}
        <div className="card overflow-hidden flex flex-col print:hidden">
          <h3 className="text-sm font-semibold text-gray-700 mb-4">Edit Resume</h3>
          <div className="flex-1 overflow-hidden">
            <ResumeForm data={resumeData} onChange={handleDataChange} />
          </div>
        </div>

        {/* Right: Preview */}
        <div className="overflow-y-auto" ref={previewRef}>
          <div className="sticky top-0 bg-gray-50 pb-2 z-10 print:hidden">
            <p className="text-xs text-gray-400 text-center">Live Preview</p>
          </div>
          <div id="resume-preview-print">
            <ResumePreview data={resumeData} template={resumeData.template} />
          </div>
        </div>

      </div>
    </div>
  )
}