import Sidebar from '@/components/admin/sidebar'

export default function DashboardLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex w-full gap-0 lg:gap-6 h-full">
       <Sidebar />
       <main className="flex-1 glass-subtle lg:rounded-2xl p-4 pt-20 lg:p-6 lg:pt-6 overflow-y-auto h-screen lg:h-[calc(100vh-3rem)] no-scrollbar">
         {children}
       </main>
    </div>
  )
}
