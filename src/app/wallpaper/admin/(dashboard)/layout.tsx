import Sidebar from '@/components/admin/sidebar'

export default function DashboardLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex w-full gap-6 h-full">
       <Sidebar />
       <main className="flex-1 glass-subtle rounded-2xl p-6 overflow-y-auto h-[calc(100vh-3rem)] no-scrollbar">
         {children}
       </main>
    </div>
  )
}
