import {
  FilePenLineIcon,
  PencilIcon,
  TrashIcon,
  UploadCloudIcon,
  XIcon,
  PlusIcon,
  EyeIcon
} from 'lucide-react'
import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useSelector } from 'react-redux'
import toast from 'react-hot-toast'
import pdfToText from 'react-pdftotext'
import api from '../configs/api.js'

const Dashboard = () => {
  const { token } = useSelector(state => state.auth)
  const [allResumes, setAllResumes] = useState([])
  const [showCreateResume, setShowCreateResume] = useState(false)
  const [showUploadResume, setShowUploadResume] = useState(false)
  const [editResumeId, setEditResumeId] = useState('')
  const [title, setTitle] = useState('')
  const [resume, setResume] = useState(null)
  const [isLoading, setIsLoading] = useState(false)

  const navigate = useNavigate()

  // Gradient colors for cards
  const gradients = [
  'from-indigo-100 via-purple-100 to-pink-100',
  'from-green-100 via-teal-100 to-cyan-100',
  'from-yellow-100 via-orange-100 to-pink-100',
  'from-red-100 via-pink-100 to-purple-100',
  'from-blue-100 via-indigo-100 to-purple-100',
  'from-pink-100 via-rose-100 to-red-100',
  'from-lime-100 via-emerald-100 to-teal-100'
]

  const loadAllResumes = async () => {
    try {
      const { data } = await api.get('/api/users/resumes', {
        headers: { Authorization: token }
      })
      setAllResumes(data.resumes)
    } catch (error) {
      toast.error(error.message)
    }
  }

  const createResume = async (e) => {
    e.preventDefault()
    try {
      const { data } = await api.post(
        '/api/resumes/create',
        { title },
        { headers: { Authorization: token } }
      )
      setAllResumes([...allResumes, data.resume])
      setShowCreateResume(false)
      setTitle('')
      navigate(`/app/builder/${data.resume._id}`)
    } catch (err) {
      toast.error(err.message)
    }
  }

  const uploadResume = async (e) => {
    e.preventDefault()
    setIsLoading(true)
    try {
      const resumeText = await pdfToText(resume)
      const { data } = await api.post(
        '/api/ai/upload-resume',
        { title, resumeText },
        { headers: { Authorization: token } }
      )
      setShowUploadResume(false)
      setResume(null)
      setTitle('')
      navigate(`/app/builder/${data.resumeId}`)
    } catch (err) {
      toast.error(err.message)
    }
    setIsLoading(false)
  }

  const editTitle = async (e) => {
    e.preventDefault()
    try {
      await api.put(
        '/api/resumes/update/',
        { resumeId: editResumeId, resumeData: { title } },
        { headers: { Authorization: token } }
      )
      setAllResumes(allResumes.map(r =>
        r._id === editResumeId ? { ...r, title } : r
      ))
      setEditResumeId('')
      setTitle('')
      toast.success('Title updated')
    } catch (err) {
      toast.error(err.message)
    }
  }

  const deleteResume = async (id) => {
    if (!window.confirm('Delete this resume?')) return
    try {
      await api.delete(`/api/resumes/delete/${id}`, {
        headers: { Authorization: token }
      })
      setAllResumes(allResumes.filter(r => r._id !== id))
      toast.success('Resume deleted')
    } catch (err) {
      toast.error(err.message)
    }
  }

  useEffect(() => {
    loadAllResumes()
  }, [])

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-50 via-pink-50 to-purple-50">
      <div className="max-w-7xl mx-auto px-6 py-10">

        {/* HEADER */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-10 gap-6">
          <div>
            <h1 className="text-3xl font-bold text-slate-800">Your Resumes</h1>
            <p className="text-slate-500 text-sm">
              Create, upload and manage resumes easily
            </p>
          </div>

          <div className="flex gap-3">
            <button
              onClick={() => setShowUploadResume(true)}
              className="flex items-center gap-2 px-4 py-2 bg-white border rounded-lg hover:bg-slate-100"
            >
              <UploadCloudIcon size={18} />
              Upload
            </button>

            <button
              onClick={() => setShowCreateResume(true)}
              className="flex items-center gap-2 px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700"
            >
              <PlusIcon size={18} />
              Create Resume
            </button>
          </div>
        </div>

        {/* GRID */}
        {allResumes.length === 0 ? (
          <div className="text-center py-20 text-slate-400">
            No resumes yet
          </div>
        ) : (
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {allResumes.map((resume, index) => {
              const gradient = gradients[index % gradients.length] // cycle gradients
              return (
                <div
                  key={resume._id}
                  className={`relative bg-gradient-to-br ${gradient} rounded-2xl shadow-lg p-5 hover:shadow-2xl transform hover:-translate-y-1 transition-all duration-300`}
                >
                  {/* Icon and Title */}
                  <div className="flex items-center gap-3 mb-4">
                    <div className="p-3 rounded-full bg-white/30 text-indigo-900">
                      <FilePenLineIcon size={24} />
                    </div>
                    <div>
                      <h3 className="font-semibold text-slate-900 text-lg">
                        {resume.title}
                      </h3>
                      <p className="text-xs text-slate-700 mt-1">
                        Updated {new Date(resume.updatedAt).toLocaleDateString()}
                      </p>
                    </div>
                  </div>

                  {/* Action Buttons */}
                  <div className="flex justify-between items-center mt-6">
                    <button
                      onClick={() => navigate(`/app/builder/${resume._id}`)}
                      className="flex items-center gap-1 text-indigo-900 font-medium hover:underline"
                    >
                      <EyeIcon size={16} />
                      Open
                    </button>

                    <div className="flex gap-3">
                      <button
                        onClick={() => {
                          setEditResumeId(resume._id)
                          setTitle(resume.title)
                        }}
                        className="text-slate-700 hover:text-indigo-900 transition"
                      >
                        <PencilIcon size={18} />
                      </button>

                      <button
                        onClick={() => deleteResume(resume._id)}
                        className="text-slate-700 hover:text-red-500 transition"
                      >
                        <TrashIcon size={18} />
                      </button>
                    </div>
                  </div>
                </div>
              )
            })}
          </div>
        )}
      </div>

      {/* MODALS */}
      {showCreateResume && (
        <Modal title="Create Resume" onClose={() => setShowCreateResume(false)}>
          <form onSubmit={createResume} className="space-y-4">
            <input
              value={title}
              onChange={e => setTitle(e.target.value)}
              placeholder="Resume title"
              className="w-full px-4 py-2 border rounded-lg"
              required
            />
            <button className="w-full py-2 bg-indigo-600 text-white rounded-lg">
              Create
            </button>
          </form>
        </Modal>
      )}

      {showUploadResume && (
        <Modal title="Upload Resume" onClose={() => setShowUploadResume(false)}>
          <form onSubmit={uploadResume} className="space-y-4">
            <input
              value={title}
              onChange={e => setTitle(e.target.value)}
              placeholder="Resume title"
              className="w-full px-4 py-2 border rounded-lg"
              required
            />

            <label className="flex flex-col items-center justify-center border-2 border-dashed rounded-xl p-6 cursor-pointer hover:bg-indigo-50">
              <UploadCloudIcon />
              <p className="text-sm mt-2">
                {resume ? resume.name : 'Upload PDF'}
              </p>
              <input
                type="file"
                accept=".pdf"
                hidden
                onChange={e => setResume(e.target.files[0])}
                required
              />
            </label>

            <button className="w-full py-2 bg-indigo-600 text-white rounded-lg">
              {isLoading ? 'Uploading...' : 'Upload'}
            </button>
          </form>
        </Modal>
      )}

      {editResumeId && (
        <Modal title="Edit Title" onClose={() => setEditResumeId('')}>
          <form onSubmit={editTitle} className="space-y-4">
            <input
              value={title}
              onChange={e => setTitle(e.target.value)}
              className="w-full px-4 py-2 border rounded-lg"
              required
            />
            <button className="w-full py-2 bg-indigo-600 text-white rounded-lg">
              Update
            </button>
          </form>
        </Modal>
      )}
    </div>
  )
}

const Modal = ({ title, children, onClose }) => (
  <div className="fixed inset-0 bg-black/60 flex items-center justify-center z-50">
    <div className="bg-white rounded-2xl w-full max-w-sm p-6 relative">
      <h2 className="text-lg font-bold mb-4">{title}</h2>
      {children}
      <XIcon
        className="absolute top-4 right-4 cursor-pointer"
        onClick={onClose}
      />
    </div>
  </div>
)

export default Dashboard
