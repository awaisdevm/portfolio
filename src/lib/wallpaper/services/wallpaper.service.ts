import { createAdminClient } from '@/lib/supabase/server'
import { wallpaperRepository } from '../repositories/wallpaper.repository'
import { Wallpaper } from '../types'

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
  private extractStoragePath(url: string): string | null {
    if (!url || !url.includes('/storage/v1/object/public/wallpapers/')) return null
    return url.split('/storage/v1/object/public/wallpapers/')[1]
  }

  private async signWallpapers(wallpapers: Wallpaper[]): Promise<Wallpaper[]> {
    if (!wallpapers.length) return wallpapers
    
    const supabase = await createAdminClient()
    
    // Extract paths
    const thumbPaths = wallpapers.map(w => this.extractStoragePath(w.thumbnail_url)).filter(Boolean) as string[]
    const fullPaths = wallpapers.map(w => this.extractStoragePath(w.full_res_url)).filter(Boolean) as string[]
    
    // Create signed URLs in parallel (valid for 1 hour for better performance/caching)
    const [thumbRes, fullRes] = await Promise.all([
      supabase.storage.from('wallpapers').createSignedUrls(thumbPaths, 3600),
      supabase.storage.from('wallpapers').createSignedUrls(fullPaths, 3600)
    ])
    
    const thumbSigned = thumbRes.data
    const fullSigned = fullRes.data
    
    // Create maps for lookup
    const thumbMap = new Map(thumbSigned?.map(s => [s.path, s.signedUrl]))
    const fullMap = new Map(fullSigned?.map(s => [s.path, s.signedUrl]))
    
    // Return transformed wallpapers
    return wallpapers.map(w => {
      const tPath = this.extractStoragePath(w.thumbnail_url)
      const fPath = this.extractStoragePath(w.full_res_url)
      
      return {
        ...w,
        thumbnail_url: (tPath && thumbMap.get(tPath)) || w.thumbnail_url,
        full_res_url: (fPath && fullMap.get(fPath)) || w.full_res_url
      }
    })
  }

  async getAll(page = 1, limit = 20) {
    const response = await wallpaperRepository.getAll(page, limit)
    if (response.data) {
      response.data = await this.signWallpapers(response.data)
    }
    return response
  }

  async getByCategory(slug: string, page = 1, limit = 20) {
    if (!slug) return { data: [], count: 0, error: 'Slug is required' }
    const response = await wallpaperRepository.getByCategory(slug, page, limit)
    if (response.data) {
      response.data = await this.signWallpapers(response.data)
    }
    return response
  }

  async getFeatured() {
    const response = await wallpaperRepository.getFeatured()
    if (response.data) {
      response.data = await this.signWallpapers(response.data)
    }
    return response
  }

  async getPopular(page = 1, limit = 20) {
    const response = await wallpaperRepository.getPopular(page, limit)
    if (response.data) {
      response.data = await this.signWallpapers(response.data)
    }
    return response
  }

  async getRecent(page = 1, limit = 20, categorySlug?: string | null) {
    const response = await wallpaperRepository.getRecent(page, limit, categorySlug)
    if (response.data) {
      response.data = await this.signWallpapers(response.data)
    }
    return response
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
