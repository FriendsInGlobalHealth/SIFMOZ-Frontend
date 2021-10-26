import { Model } from '@vuex-orm/core'
import { InventoryStockAdjustment } from '../stockadjustment/StockAdjustmentHierarchy'

export default class Inventory extends Model {
    static entity = 'inventorys'

    static fields () {
        return {
            id: this.attr(null),
            startDate: this.attr(null),
            endDate: this.attr(null),
            open: this.attr(null),
            generic: this.attr(null),
            sequence: this.attr(null),
            // relationships
            adjustments: this.hasMany(InventoryStockAdjustment, 'inventory_id')
        }
    }
}