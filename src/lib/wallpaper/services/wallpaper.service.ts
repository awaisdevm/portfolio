import { wallpaperRepository } from '../repositories/wallpaper.repository'

interface WallpaperUploadInput {
  title: string;
  thumbnail_url: string;
  full_res_url: string;
  category_id?: string | null;
  tags?: string | string[];
  is_featured?: boolean;
  is_active?: boolean;
}

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

  async uploadWallpaper(wallpaperData: WallpaperUploadInput) {
    // Basic validation
    if (!wallpaperData.title || !wallpaperData.thumbnail_url || !wallpaperData.full_res_url) {
      throw new Error('Title and URLs are required')
    }
    
    // Ensure tags is array
    let finalTags: string[] = []
    if (typeof wallpaperData.tags === 'string') {
      try {
        const parsed = JSON.parse(wallpaperData.tags)
        finalTags = Array.isArray(parsed) ? parsed : [String(parsed)]
      } catch {
        finalTags = [wallpaperData.tags]
      }
    } else if (Array.isArray(wallpaperData.tags)) {
      finalTags = wallpaperData.tags
    }

    return await wallpaperRepository.create({
      ...wallpaperData,
      tags: finalTags
    })
  }

  async deleteWallpaper(id: string) {
    return await wallpaperRepository.delete(id)
  }
}

export const wallpaperService = new WallpaperService()
