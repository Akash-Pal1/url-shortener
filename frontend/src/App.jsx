import { useState, useEffect } from "react"
import axios from "axios"
import URLForm from "./components/URLForm"

const API = import.meta.env.VITE_API_URL || "http://127.0.0.1:8000"

export default function App() {
  const [urls, setUrls] = useState([])
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState("")

  useEffect(() => {
    fetchUrls()
  }, [])

  async function fetchUrls(){
    setLoading(true)
    setError("")
    try {
    const urlRes = await axios.get(`${API}/urls`)
    setUrls(urlRes.data)
    } catch(err){
      setError(err.response?.data?.detail?.[0]?.msg || "Something went wrong")
    } finally{
      setLoading(false)
    }   
  }

  async function handleShorten(originalUrl) {
    setError("")
    try{
      await axios.post(`${API}/shorten`,{
        original_url:originalUrl
      })
      fetchUrls()
    }catch(err){
      setError(err.response?.data?.detail?.[0]?.msg || "Something went really wrong")
    }
  }

  async function handleDelete(id) {
      await axios.delete(`${API}/urls/${id}`)
      fetchUrls()
  }

  if (loading) return <p>Loading...</p>

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <div className="max-w-2xl mx-auto">
        <h1 className="text-3xl font-bold text-gray-800 mb-6">URL Shortener</h1>
        {error && <p className="text-red-500 mb-4">{error}</p>}
        <URLForm onShorten={handleShorten} />
        {/* URL list goes here */}
      </div>
    </div>
  )


}