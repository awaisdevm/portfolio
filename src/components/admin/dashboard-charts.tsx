import { useState } from 'react'
import { 
  BarChart, 
  Bar, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  ResponsiveContainer, 
  PieChart, 
  Pie, 
  Cell,
  Legend
} from 'recharts'
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card'
import { Download, Eye } from 'lucide-react'

interface DashboardChartsProps {
  categoryData: { name: string, value: number }[]
  topWallpapers: { name: string, downloads: number }[]
  topViewed: { name: string, views: number }[]
}

const COLORS = [
  '#8B5CF6', // Primary Violet
  '#06B6D4', // Cyan
  '#10B981', // Emerald
  '#F59E0B', // Amber
  '#EF4444', // Rose
  '#6366F1', // Indigo
  '#EC4899'  // Pink
]

export default function DashboardCharts({ categoryData, topWallpapers, topViewed }: DashboardChartsProps) {
  const [metric, setMetric] = useState<'downloads' | 'views'>('downloads')
  
  const chartData = metric === 'downloads' 
    ? topWallpapers.map(w => ({ name: w.name, value: w.downloads }))
    : topViewed.map(w => ({ name: w.name, value: w.views }))
    
  const dataKey = 'value'
  const metricLabel = metric === 'downloads' ? 'Downloads' : 'Views'
  const accentColor = metric === 'downloads' ? '#8B5CF6' : '#F59E0B'

  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mt-8">
      {/* Category Distribution Pie Chart */}
      <Card className="bg-zinc-900/40 border-white/5 backdrop-blur-xl shadow-2xl overflow-hidden group">
        <CardHeader className="border-b border-white/5 pb-4">
          <CardTitle className="text-xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-white to-white/60">Content Ecosystem</CardTitle>
          <CardDescription className="text-zinc-500">Inventory distribution across categories</CardDescription>
        </CardHeader>
        <CardContent className="pt-8">
          <div className="h-[260px] md:h-[320px] w-full">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <defs>
                  {COLORS.map((color, i) => (
                    <linearGradient key={`grad-${i}`} id={`grad-${i}`} x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor={color} stopOpacity={0.8}/>
                      <stop offset="95%" stopColor={color} stopOpacity={0.2}/>
                    </linearGradient>
                  ))}
                </defs>
                <Pie
                  data={categoryData}
                  cx="50%"
                  cy="45%"
                  innerRadius={70}
                  outerRadius={100}
                  paddingAngle={8}
                  dataKey="value"
                  stroke="none"
                >
                  {categoryData.map((entry, index) => (
                    <Cell 
                      key={`cell-${index}`} 
                      fill={`url(#grad-${index % COLORS.length})`}
                      className="hover:opacity-80 transition-opacity cursor-pointer"
                    />
                  ))}
                </Pie>
                <Tooltip 
                  contentStyle={{ 
                    backgroundColor: 'rgba(24, 24, 27, 0.95)', 
                    border: '1px solid rgba(255,255,255,0.1)',
                    borderRadius: '12px',
                    boxShadow: '0 20px 25px -5px rgba(0, 0, 0, 0.5)',
                    color: '#fff'
                  }} 
                  itemStyle={{ color: '#fff', fontSize: '12px' }}
                />
                <Legend 
                  layout="horizontal" 
                  verticalAlign="bottom" 
                  align="center"
                  iconType="circle"
                  formatter={(value) => <span className="text-xs text-zinc-400 font-medium px-2">{value}</span>}
                />
              </PieChart>
            </ResponsiveContainer>
          </div>
        </CardContent>
      </Card>

      {/* Top Wallpapers Bar Chart */}
      <Card className="bg-zinc-900/40 border-white/5 backdrop-blur-xl shadow-2xl overflow-hidden">
        <CardHeader className="border-b border-white/5 pb-4 flex flex-row items-center justify-between space-y-0">
          <div>
            <CardTitle className="text-xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-white to-white/60">Trending Assets</CardTitle>
            <CardDescription className="text-zinc-500">
              Most {metric === 'downloads' ? 'downloaded' : 'viewed'} wallpapers
            </CardDescription>
          </div>
          
          <div className="flex bg-zinc-800/50 p-1 rounded-lg border border-white/10">
            <button 
              onClick={() => setMetric('downloads')}
              className={`flex items-center gap-1.5 px-3 py-1.5 rounded-md text-xs font-medium transition-all ${
                metric === 'downloads' 
                  ? 'bg-violet-500/20 text-violet-400 shadow-sm' 
                  : 'text-zinc-500 hover:text-zinc-300'
              }`}
            >
              <Download size={14} />
              Downloads
            </button>
            <button 
              onClick={() => setMetric('views')}
              className={`flex items-center gap-1.5 px-3 py-1.5 rounded-md text-xs font-medium transition-all ${
                metric === 'views' 
                  ? 'bg-amber-500/20 text-amber-400 shadow-sm' 
                  : 'text-zinc-500 hover:text-zinc-300'
              }`}
            >
              <Eye size={14} />
              Views
            </button>
          </div>
        </CardHeader>
        <CardContent className="pt-8">
          <div className="h-[260px] md:h-[320px] w-full">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart
                layout="vertical"
                data={chartData}
                margin={{ top: 5, right: 30, left: 40, bottom: 5 }}
              >
                <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.03)" horizontal={false} />
                <XAxis type="number" hide />
                <YAxis 
                  dataKey="name" 
                  type="category" 
                  stroke="#71717a" 
                  fontSize={11} 
                  tickLine={false} 
                  axisLine={false}
                  width={120}
                  tickFormatter={(val) => val.length > 20 ? `${val.substring(0, 17)}...` : val}
                />
                <Tooltip 
                  cursor={{ fill: 'rgba(255,255,255,0.03)' }}
                  contentStyle={{ 
                    backgroundColor: 'rgba(24, 24, 27, 0.95)', 
                    border: '1px solid rgba(255,255,255,0.1)',
                    borderRadius: '12px',
                    color: '#fff'
                  }}
                  itemStyle={{ fontSize: '12px' }}
                />
                <Bar 
                  dataKey={dataKey} 
                  name={metricLabel}
                  radius={[0, 6, 6, 0]}
                  barSize={16}
                >
                  {chartData.map((_entry, index: number) => (
                    <Cell key={`cell-${index}`} fill={accentColor} fillOpacity={0.8 - (index * 0.1)} />
                  ))}
                </Bar>
              </BarChart>
            </ResponsiveContainer>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
