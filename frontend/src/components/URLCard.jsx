import { useState } from "react";
import AnalyticsChart from "./AnalyticsChart";
import axios from "axios";

export default function URLCard({ url, onDelete }) {
  const [showAnalytics, setShowAnalytics] = useState(false)
  const [analytics, setAnalytics] = useState([])
  const API = import.meta.env.VITE_API_URL || "http://127.0.0.1:8000"
  const shortUrl = `${API}/${url.short_code}`

  async function handleShowAnalytics() {
    try {
      if (!showAnalytics) {
        const res = await axios.get(`${API}/urls/${url.id}/analytics`)
        setAnalytics(res.data)
      }
      setShowAnalytics(!showAnalytics)
    } catch (err) {
      console.error(err)
    }
  }

  async function copyURL() {
    try {
      await navigator.clipboard.writeText(shortUrl)
      alert("URL has been copied")
    } catch (err) {
      console.error(err)
    }
  }

  return (
    <div className="rounded-[1.75rem] border border-slate-200 bg-white p-6 shadow-[0_20px_45px_-30px_rgba(15,23,42,0.2)] transition hover:-translate-y-0.5 hover:shadow-lg">
      <div className="grid gap-4 sm:grid-cols-[1fr_auto] sm:items-center">
        <div className="space-y-3">
          <div>
            <p className="text-sm font-medium text-slate-500">Original URL</p>
            <p className="break-words text-sm text-slate-900">{url.original_url}</p>
          </div>
          <div>
            <p className="text-sm font-medium text-slate-500">Short link</p>
            <a
              href={shortUrl}
              target="_blank"
              rel="noreferrer"
              className="text-sky-600 hover:text-sky-800 text-sm break-words"
            >
              {shortUrl}
            </a>
          </div>
        </div>

        <div className="inline-flex items-center justify-center rounded-full bg-slate-100 px-4 py-2 text-sm font-semibold text-slate-700">
          Clicks: {url.click_count}
        </div>
      </div>

      <div className="mt-5 grid gap-3 sm:grid-cols-3">
        <button
          onClick={copyURL}
          className="rounded-2xl bg-sky-600 px-4 py-2 text-sm font-semibold text-white transition hover:bg-sky-700"
        >
          Copy URL
        </button>
        <button
          onClick={handleShowAnalytics}
          className="rounded-2xl bg-emerald-600 px-4 py-2 text-sm font-semibold text-white transition hover:bg-emerald-700"
        >
          {showAnalytics ? "Hide Analytics" : "Show Analytics"}
        </button>
        <button
          onClick={() => onDelete(url.id)}
          className="rounded-2xl bg-red-600 px-4 py-2 text-sm font-semibold text-white transition hover:bg-red-700"
        >
          Delete URL
        </button>
      </div>

      {showAnalytics && (
        <div className="mt-5">
          <AnalyticsChart data={analytics} />
        </div>
      )}
    </div>
  )
}
