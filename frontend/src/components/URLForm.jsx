import { useState } from "react";

export default function URLForm({onShorten}){
    const [url, setURL] = useState("")

    function handleSubmit(e){
        e.preventDefault();

        onShorten(url)
        setURL("")

    }

    return (
        <div className="bg-white rounded-xl p-6 shadow-sm border-gray-100 mb-8">
        <h2 className="text-2xl font-bold text-black text-gray-800 mb-6 text-center">Add URL</h2>
        <form onSubmit={handleSubmit} className="grid grid-cols-2 gap-4">
            <input
            type="text"
            placeholder="URL Link"
            value={url}
            onChange={(e)=> setURL(e.target.value)}
            className="border border-gray-200 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-400"
            />
            <button type="submit" className="col-span-2 bg-blue-600 text-white rounded-lg py-2 text-sm font-medium">Shorten URL</button>

        </form>
        </div>
    )
}