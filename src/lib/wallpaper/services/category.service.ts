import { categoryRepository } from '../repositories/category.repository'
import { Category } from '../types'

export class CategoryService {
  async getAll() {
    return await categoryRepository.getAll()
  }

  async addCategory(name: string, image_url?: string) {
    if (!name) throw new Error('Category name is required')
    return await categoryRepository.create({ name, image_url })
  }

  async deleteCategory(id: string) {
    return await categoryRepository.delete(id)
  }

  async updateCategory(id: string, updates: Partial<Category>) {
    return await categoryRepository.update(id, updates)
  }
}

export const categoryService = new CategoryService()
