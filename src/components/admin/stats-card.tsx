import { ReactNode } from 'react'

interface StatsCardProps {
  title: string
  value: string | number
  icon: ReactNode
  trend?: string
}

export default function StatsCard({ title, value, icon, trend }: StatsCardProps) {
  return (
    <div className="glass-strong p-6 rounded-2xl flex flex-col gap-4 relative overflow-hidden group">
      <div className="absolute -right-4 -top-4 text-white/5 group-hover:text-primary/10 transition-colors duration-500 scale-150">
        {icon}
      </div>
      <div className="flex justify-between items-center relative z-10">
        <p className="text-gray-400 font-medium text-sm">{title}</p>
        <div className="text-primary bg-primary/10 p-2 rounded-lg">
          {icon}
        </div>
      </div>
      <div className="relative z-10">
        <h3 className="text-3xl font-bold">{value}</h3>
        {trend && (
            <p className="text-xs text-secondary mt-2 font-medium">{trend}</p>
        )}
      </div>
    </div>
  )
}
