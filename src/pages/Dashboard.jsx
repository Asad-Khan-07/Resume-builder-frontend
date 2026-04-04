import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import Navbar from '../components/Navbar/Navbar'
import api from '../utils/api'
import toast from 'react-hot-toast'

const FileIcon = () => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
    <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/>
    <polyline points="14 2 14 8 20 8"/>
    <line x1="16" y1="13" x2="8" y2="13"/>
    <line x1="16" y1="17" x2="8" y2="17"/>
    <polyline points="10 9 9 9 8 9"/>
  </svg>
)

const EditIcon = () => (
  <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
    <path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7"/>
    <path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z"/>
  </svg>
)

const EmptyIcon = () => (
  <svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1" strokeLinecap="round" strokeLinejoin="round">
    <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/>
    <polyline points="14 2 14 8 20 8"/>
    <line x1="16" y1="13" x2="8" y2="13"/>
    <line x1="16" y1="17" x2="8" y2="17"/>
  </svg>
)

export default function Dashboard() {
  const [resumes, setResumes] = useState([])
  const [loading, setLoading] = useState(true)
  const [creating, setCreating] = useState(false)
  const navigate = useNavigate()

  const fetchResumes = async () => {
    try {
      const res = await api.get('/resumes')
      setResumes(res.data)
    } catch (err) {
      toast.error('Could not load resumes')
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    fetchResumes()
  }, [])

  const createNewResume = async () => {
    setCreating(true)
    try {
      const res = await api.post('/resumes', { title: 'Untitled Resume' })
      toast.success('New resume created!')
      navigate(`/builder/${res.data._id}`)
    } catch (err) {
      toast.error('Could not create resume')
    } finally {
      setCreating(false)
    }
  }

  const deleteResume = async (id, e) => {
    e.stopPropagation()
    if (!window.confirm('Delete this resume?')) return
    try {
      await api.delete(`/resumes/${id}`)
      setResumes(resumes.filter((r) => r._id !== id))
      toast.success('Resume deleted')
    } catch (err) {
      toast.error('Could not delete resume')
    }
  }

  const formatDate = (dateStr) => {
    return new Date(dateStr).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })
  }

  const templateColors = {
    modern: 'bg-blue-50 text-blue-600',
    classic: 'bg-amber-50 text-amber-600',
    minimal: 'bg-gray-50 text-gray-600',
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />

      <div className="max-w-6xl mx-auto px-6 py-10">

        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <div>
            <h2 className="font-display text-2xl font-bold text-gray-800">My Resumes</h2>
            <p className="text-gray-400 text-sm mt-1">{resumes.length} resume{resumes.length !== 1 ? 's' : ''} saved</p>
          </div>
          <button onClick={createNewResume} disabled={creating} className="btn-primary flex items-center gap-2">
            <span className="text-lg">+</span>
            {creating ? 'Creating...' : 'New Resume'}
          </button>
        </div>

        {/* Loading state */}
        {loading && (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {[1, 2, 3].map((i) => (
              <div key={i} className="card animate-pulse h-44">
                <div className="h-4 bg-gray-100 rounded w-3/4 mb-3" />
                <div className="h-3 bg-gray-100 rounded w-1/2" />
              </div>
            ))}
          </div>
        )}

        {/* Empty state */}
        {!loading && resumes.length === 0 && (
          <div className="card text-center py-16">
            <div className="flex justify-center mb-4 text-gray-300">
              <EmptyIcon />
            </div>
            <h3 className="font-display text-lg font-semibold text-gray-700 mb-2">No resumes yet</h3>
            <p className="text-gray-400 text-sm mb-6">Create your first resume and land your dream job!</p>
            <button onClick={createNewResume} className="btn-primary mx-auto">
              Create My First Resume
            </button>
          </div>
        )}

        {/* Resume grid */}
        {!loading && resumes.length > 0 && (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {resumes.map((resume) => (
              <div
                key={resume._id}
                onClick={() => navigate(`/builder/${resume._id}`)}
                className="card cursor-pointer hover:shadow-md hover:-translate-y-0.5 transition-all duration-200 group"
              >
                {/* Resume icon */}
                <div className="w-10 h-12 bg-primary-50 rounded-lg flex items-center justify-center mb-4 group-hover:bg-primary-100 transition-colors text-primary-400">
                  <EditIcon />
                </div>

                <h3 className="font-semibold text-gray-800 truncate mb-1">{resume.title}</h3>
                <p className="text-xs text-gray-400 mb-3">Updated {formatDate(resume.updatedAt)}</p>

                <div className="flex items-center justify-between">
                  <span className={`text-xs font-medium px-2.5 py-1 rounded-full capitalize ${templateColors[resume.template] || templateColors.modern}`}>
                    {resume.template}
                  </span>
                  <button
                    onClick={(e) => deleteResume(resume._id, e)}
                    className="text-xs text-gray-300 hover:text-red-400 transition-colors opacity-0 group-hover:opacity-100"
                  >
                    Delete
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  )
}