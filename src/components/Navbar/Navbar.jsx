import { useAuth } from '../../context/AuthContext'
import { useNavigate } from 'react-router-dom'
import toast from 'react-hot-toast'

export default function Navbar() {
  const { user, logout } = useAuth()
  const navigate = useNavigate()

  const handleLogout = () => {
    logout()
    toast.success('Logged out!')
    navigate('/login')
  }

  return (
    <nav className="bg-white border-b border-gray-100 sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-6 h-16 flex items-center justify-between">

        {/* Logo */}
        <h1
          className="font-display text-xl font-bold text-primary-600 cursor-pointer"
          onClick={() => navigate('/')}
        >
          ResumeBuildr
        </h1>

        {/* Right side */}
        <div className="flex items-center gap-4">
          <span className="text-sm text-gray-500 hidden sm:block">
            Hello, <span className="font-medium text-gray-700">{user?.name}</span>
          </span>
          <button onClick={handleLogout} className="btn-secondary text-sm py-2 px-4">
            Logout
          </button>
        </div>

      </div>
    </nav>
  )
}
