import { useState } from "react";

export default function URLForm({ onShorten }) {
  const [url, setURL] = useState("")

  function handleSubmit(e) {
    e.preventDefault()
    onShorten(url)
    setURL("")
  }

  return (
    <div className="bg-white rounded-[1.5rem] p-6 shadow-[0_20px_45px_-30px_rgba(15,23,42,0.2)] border border-slate-200 mb-8">
      <h2 className="text-2xl font-semibold text-slate-900 mb-6 text-center">Add a new URL</h2>
      <form onSubmit={handleSubmit} className="grid gap-4 sm:grid-cols-[1fr_auto]">
        <input
          type="text"
          placeholder="Paste your URL here"
          value={url}
          onChange={(e) => setURL(e.target.value)}
          className="w-full rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm text-slate-900 outline-none transition focus:border-sky-400 focus:bg-white focus:ring-2 focus:ring-sky-200"
        />
        <button
          type="submit"
          className="inline-flex items-center justify-center rounded-2xl bg-sky-600 px-5 py-3 text-sm font-semibold text-white shadow-md shadow-sky-200 transition hover:bg-sky-700"
        >
          Shorten URL
        </button>
      </form>
    </div>
  )
}
