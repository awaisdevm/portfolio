import CategoryManager from '@/components/admin/category-manager'

export default function CategoriesPage() {
  return (
    <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-500">
      <div>
        <h1 className="text-3xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-primary to-secondary">
          Categories
        </h1>
        <p className="text-gray-400 mt-2">Manage app wallpaper categories.</p>
      </div>
      <CategoryManager />
    </div>
  )
}
