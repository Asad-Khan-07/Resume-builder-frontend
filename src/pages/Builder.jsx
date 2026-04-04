import { useState, useEffect, useRef, useCallback } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import Navbar from '../components/Navbar/Navbar'
import ResumeForm from '../components/ResumeForm/ResumeForm'
import ResumePreview from '../components/ResumePreview/ResumePreview'
import api from '../utils/api'
import toast from 'react-hot-toast'

const TEMPLATES = [
  { key: 'modern', label: 'Modern', color: 'bg-blue-500' },
  { key: 'classic', label: 'Classic', color: 'bg-amber-500' },
  { key: 'minimal', label: 'Minimal', color: 'bg-gray-500' },
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

export default function Builder() {
  const { id } = useParams()
  const navigate = useNavigate()
  const [resumeData, setResumeData] = useState(defaultData)
  const [loading, setLoading] = useState(true)
  const [saving, setSaving] = useState(false)
  const [lastSaved, setLastSaved] = useState(null)
  const saveTimer = useRef(null)
  const previewRef = useRef()

  // Load resume from server
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

  // Auto-save after 1.5 seconds of no typing
  const autoSave = useCallback(async (data) => {
    clearTimeout(saveTimer.current)
    saveTimer.current = setTimeout(async () => {
      setSaving(true)
      try {
        await api.put(`/resumes/${id}`, data)
        setLastSaved(new Date())
      } catch (err) {
        // Silent fail for auto-save
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

  // Manual save
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

  // Download as PDF using browser print
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

        {/* Spacer */}
        <div className="flex-1" />

        {/* Save status */}
        {lastSaved && (
          <span className="text-xs text-gray-400">Saved at {formatTime(lastSaved)}</span>
        )}
        {saving && <span className="text-xs text-gray-400 animate-pulse">Saving...</span>}

        {/* Actions */}
        <button onClick={handleSave} disabled={saving} className="btn-secondary text-sm py-2">
          Save
        </button>
        <button onClick={handleDownload} className="btn-primary text-sm py-2 flex items-center gap-1.5">
          ↓ Download PDF
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
          <ResumePreview data={resumeData} template={resumeData.template} />
        </div>

      </div>

      {/* Print styles */}
      <style>{`
        @media print {
          body * { visibility: hidden; }
          .resume-preview, .resume-preview * { visibility: visible; }
          .resume-preview { position: absolute; left: 0; top: 0; width: 100%; }
        }
      `}</style>
    </div>
  )
}
