import { LineChart, XAxis, YAxis, Tooltip, ResponsiveContainer, Line, CartesianGrid } from "recharts"

export default function AnalyticsChart({data}) {
  if (!data || data.length === 0) {
    return (
      <div className="rounded-[1.5rem] border border-slate-200 bg-slate-50 p-6 shadow-[0_18px_40px_-30px_rgba(15,23,42,0.2)]">
        <p className="text-center text-sm text-slate-500">No clicks data yet. Create a short link to start tracking clicks.</p>
      </div>
    )
  }

  return (
    <div className="rounded-[1.5rem] border border-slate-200 bg-white p-6 shadow-[0_18px_40px_-30px_rgba(15,23,42,0.2)] mb-8">
      <div className="mb-5 flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h2 className="text-lg font-semibold text-slate-900">Clicks Analytics</h2>
          <p className="text-sm text-slate-500">Track recent daily clicks for this short URL.</p>
        </div>
        <div className="inline-flex items-center rounded-full bg-slate-100 px-3 py-1 text-sm font-medium text-slate-600">
          {data.reduce((sum, row) => sum + row.clicks, 0)} total clicks
        </div>
      </div>

      <div className="h-[260px]">
        <ResponsiveContainer width="100%" height="100%">
          <LineChart data={data} margin={{ top: 10, right: 10, left: 0, bottom: 0 }}>
            <CartesianGrid stroke="#e2e8f0" strokeDasharray="4 4" />
            <XAxis dataKey="date" tick={{ fill: '#64748b', fontSize: 12 }} axisLine={false} tickLine={false} />
            <YAxis tick={{ fill: '#64748b', fontSize: 12 }} axisLine={false} tickLine={false} />
            <Tooltip
              contentStyle={{ borderRadius: 16, borderColor: '#cbd5e1', backgroundColor: '#f8fafc' }}
              formatter={(value) => [`${value} clicks`, 'Clicks']}
            />
            <Line
              type="monotone"
              dataKey="clicks"
              stroke="#2563eb"
              strokeWidth={4}
              dot={{ r: 4, fill: '#2563eb', stroke: '#2563eb' }}
              activeDot={{ r: 6 }}
            />
          </LineChart>
        </ResponsiveContainer>
      </div>
    </div>
  )
}
