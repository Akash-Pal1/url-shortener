import { LineChart, XAxis, YAxis, Tooltip, ResponsiveContainer, Line } from "recharts"

export default function AnalyticsChart({data}){

    if (!data || data.length === 0){
        return(
            <p className="text-gray-500 text-center"> No clicks data yet</p>
        );
    }
         return (
         <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100 mb-8">
            <h2 className="text-lg font-semibold text-gray-700 mb-4">Clicks Analytics</h2>
            <ResponsiveContainer width="100%" height={240}>
              <LineChart data={data}>
                <XAxis dataKey="date" tick={{ fontSize: 12 }} />
                <YAxis tick={{ fontSize: 12 }} />
                <Tooltip formatter={(value) => `${value} clicks`} />
                <Line stroke="#2563eb" strokeWidth={4} type="monotone" dataKey="clicks" ></Line>
              </LineChart>
            </ResponsiveContainer>
          </div>
         );
}
