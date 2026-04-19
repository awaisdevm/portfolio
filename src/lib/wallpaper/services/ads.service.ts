import { adsRepository } from '../repositories/ads.repository'
import { AdsConfig } from '../types'

export class AdsService {
  async getByApp(app_name: string) {
    return await adsRepository.getByApp(app_name)
  }

  async getAll() {
    return await adsRepository.getAll()
  }

  async toggleActive(id: string, is_active: boolean) {
    return await adsRepository.toggleActive(id, is_active)
  }

  async createAdConfig(config: Partial<AdsConfig>) {
      if (!config.app_name || !config.ad_network) {
          throw new Error('App name and Ad network are required')
      }
      return await adsRepository.create(config)
  }
}

export const adsService = new AdsService()
