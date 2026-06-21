import { useState } from "react";
import AnalyticsChart from "./AnalyticsChart";
import axios from "axios";

export default function URLCard({url, onDelete}){
    const [showAnalytics, setShowAnalytics] = useState(false)
    const [analytics, setAnalytics] = useState([])
    const API = import.meta.env.VITE_API_URL || "http://127.0.0.1:8000"
    const shortUrl = `${API}/${url.short_code}`

    async function handleShowAnalytics(){
        try{
            if(!showAnalytics){
                const res = await axios.get(`${API}/urls/${url.id}/analytics`)
                    setAnalytics(res.data)
                }
                setShowAnalytics(!showAnalytics)
        }catch(err){
            console.error(err)
        }
    }

    async function copyURL() {
        try{
            await navigator.clipboard.writeText(shortUrl)
            alert("URL has been copied");
        }catch(err){
            console.error(err)
        }
    }

    return (<div>
         <p>{ `URL ${url.original_url}`}</p>
        <p>{`URL Short Code ${url.short_code}`}</p>
        <p>Clicks: {url.click_count}</p>
        <button onClick={() => onDelete(url.id)}
              className="bg-red-600 text-white rounded-lg py-2 text-sm font-medium"
            > Delete URL </button>
         <button onClick={copyURL}
              className="bg-red-600 text-white rounded-lg py-2 text-sm font-medium"
            > Copy URL </button>
        <button onClick={handleShowAnalytics}
              className="bg-red-600 text-white rounded-lg py-2 text-sm font-medium"
            > {showAnalytics ? "Hide Analytics" : "Show Analytics"} </button>
        {showAnalytics ? <AnalyticsChart data={analytics} /> : null}
        </div>
        
    )


}