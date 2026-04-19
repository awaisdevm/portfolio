import { wallpaperRepository } from '../repositories/wallpaper.repository'
import { Wallpaper } from '../types'

export class WallpaperService {
  async getAll() {
    return await wallpaperRepository.getAll()
  }

  async getByCategory(slug: string) {
    if (!slug) return { data: [], count: 0, error: 'Slug is required' }
    return await wallpaperRepository.getByCategory(slug)
  }

  async getFeatured() {
    return await wallpaperRepository.getFeatured()
  }

  async getPopular() {
    return await wallpaperRepository.getPopular(50)
  }

  async uploadWallpaper(wallpaperData: any) {
    // Basic validation
    if (!wallpaperData.title || !wallpaperData.thumbnail_url || !wallpaperData.full_res_url) {
      throw new Error('Title and URLs are required')
    }
    
    // Ensure tags is array
    if (typeof wallpaperData.tags === 'string') {
        try {
            wallpaperData.tags = JSON.parse(wallpaperData.tags)
        } catch {
            wallpaperData.tags = [wallpaperData.tags]
        }
    }
    
    return await wallpaperRepository.create(wallpaperData)
  }

  async deleteWallpaper(id: string) {
    return await wallpaperRepository.delete(id)
  }
}

export const wallpaperService = new WallpaperService()
