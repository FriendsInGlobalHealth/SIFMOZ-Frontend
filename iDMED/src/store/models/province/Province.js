import { Model } from '@vuex-orm/core'
import Country from 'src/store/models/country/Country'
import City from '../city/City'
import District from '../district/District'

export default class Province extends Model {
  static entity = 'provinces'

  static fields () {
    return {
      id: this.attr(null),
      description: this.attr(''),
      code: this.attr(''),
      country_id: this.attr(''),
      // Relationships
      country: this.belongsTo(Country, 'country_id'),
      districts: this.hasMany(District, 'province_id'),
      cities: this.hasMany(City, 'province_id')

    }
  }
}
