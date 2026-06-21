import { useState, useEffect } from "react"
import axios from "axios"
import URLForm from "./components/URLForm"
import URLCard from "./components/URLCard"

const API = import.meta.env.VITE_API_URL || "http://127.0.0.1:8000"

export default function App() {
  const [urls, setUrls] = useState([])
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState("")

  useEffect(() => {
    fetchUrls()
  }, [])

  async function fetchUrls() {
    setLoading(true)
    setError("")
    try {
      const urlRes = await axios.get(`${API}/urls`)
      setUrls(urlRes.data)
    } catch (err) {
      setError(err.response?.data?.detail?.[0]?.msg || "Something went wrong")
    } finally {
      setLoading(false)
    }
  }

  async function handleShorten(originalUrl) {
    setError("")
    try {
      await axios.post(`${API}/shorten`, {
        original_url: originalUrl,
      })
      fetchUrls()
    } catch (err) {
      setError(err.response?.data?.detail?.[0]?.msg || "Something went really wrong")
    }
  }

  async function handleDelete(id) {
    await axios.delete(`${API}/urls/${id}`)
    fetchUrls()
  }

  if (loading) return <p className="min-h-screen flex items-center justify-center text-slate-500">Loading...</p>

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-sky-50 p-6">
      <div className="max-w-3xl mx-auto">
        <div className="rounded-[2rem] border border-slate-200 bg-white/95 p-8 shadow-[0_25px_60px_-30px_rgba(15,23,42,0.3)]">
          <div className="mb-8 flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
            <div>
              <h1 className="text-4xl font-semibold tracking-tight text-slate-900">URL Shortener</h1>
              <p className="mt-2 text-sm text-slate-500">Create shortened links, copy them instantly, and track click analytics.</p>
            </div>
            <button
              onClick={fetchUrls}
              className="inline-flex items-center justify-center rounded-full bg-slate-900 px-5 py-2.5 text-sm font-semibold text-white shadow-lg shadow-slate-200 transition hover:bg-slate-700"
            >
              Refresh
            </button>
          </div>

          {error && (
            <div className="rounded-2xl bg-red-50 border border-red-200 px-4 py-3 text-sm text-red-700 mb-6">
              {error}
            </div>
          )}

          <URLForm onShorten={handleShorten} />

          {urls.length === 0 ? (
            <p className="text-center text-slate-500 py-10">No URLs created yet.</p>
          ) : (
            <div className="space-y-4">
              {urls.map((url) => (
                <URLCard key={url.id} url={url} onDelete={handleDelete} />
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
