import { Model } from '@vuex-orm/core'
import Drug from '../drug/Drug'
import Form from '../form/Form'
import Prescription from '../prescription/Prescription'

export default class PrescribedDrug extends Model {
    static entity = 'prescribedDrugs'
    static fields () {
      return {
        id: this.attr(null),
        amtPerTime: this.attr(''),
        timesPerDay: this.attr(''),
        modified: this.attr(''),
        qtyPrescribed: this.number(1),
        nextPickUpDate: this.attr(''),
        toContinue: this.boolean(true),
        prescription_id: this.attr(''),
        drug_id: this.attr(''),
        form_id: this.attr(''),
        // Relationships
        form: this.belongsTo(Form, 'form_id'),
        prescription: this.belongsTo(Prescription, 'prescription_id'),
        drug: this.belongsTo(Drug, 'drug_id')
      }
    }
}