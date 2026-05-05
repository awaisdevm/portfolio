import { appsRepository } from '../repositories/apps.repository'
import { App } from '../types'

export class AppsService {
  async getAll() {
    return await appsRepository.getAll()
  }

  async getByPackage(package_name: string) {
    return await appsRepository.getByPackage(package_name)
  }

  async create(app: Partial<App>) {
    if (!app.app_name || !app.package_name) {
      throw new Error('App name and package name are required')
    }
    return await appsRepository.create(app)
  }

  async update(id: string, updates: Partial<App>) {
    return await appsRepository.update(id, updates)
  }

  async delete(id: string, package_name: string) {
    return await appsRepository.delete(id, package_name)
  }

  async toggleField(id: string, field: string, value: boolean) {
    const allowed = ['is_enabled', 'is_maintenance', 'force_update', 'ads_enabled']
    if (!allowed.includes(field)) {
      throw new Error(`Cannot toggle field: ${field}`)
    }
    return await appsRepository.toggleField(id, field, value)
  }

  /**
   * Compare two semver strings. Returns:
   *  -1 if a < b, 0 if equal, 1 if a > b
   */
  compareVersions(a: string, b: string): number {
    const pa = a.split('.').map(Number)
    const pb = b.split('.').map(Number)
    for (let i = 0; i < Math.max(pa.length, pb.length); i++) {
      const na = pa[i] || 0
      const nb = pb[i] || 0
      if (na < nb) return -1
      if (na > nb) return 1
    }
    return 0
  }
}

export const appsService = new AppsService()
