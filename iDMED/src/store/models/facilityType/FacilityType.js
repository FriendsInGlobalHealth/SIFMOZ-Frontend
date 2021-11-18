import { Model } from '@vuex-orm/core'

export default class FacilityType extends Model {
  static entity = 'facilityTypes'

  static fields () {
    return {
      id: this.attr(null),
      code: this.attr(''),
      description: this.attr('')

    }
  }

  static async apiGetAll () {
    return await this.api().get('/facilityType')
  }

  static async apiFetchById (id) {
    return await this.api().get(`/facilityType/${id}`)
  }
}
