import { Model } from '@vuex-orm/core'
import Clinic from '../clinic/Clinic'
import Doctor from '../doctor/Doctor'
import Duration from '../Duration/Duration'
import GroupMemberPrescription from '../group/GroupMemberPrescription'
import PatientVisitDetails from '../patientVisitDetails/PatientVisitDetails'
import PrescriptionDetail from '../prescriptionDetails/PrescriptionDetail'
import PrescribedDrug from '../prescriptionDrug/PrescribedDrug'

export default class Prescription extends Model {
    static entity = 'prescriptions'
    static fields () {
      return {
        id: this.attr(null),
        duration_id: this.attr(''),
        prescriptionDate: this.attr(''),
        expiryDate: this.attr(''),
        current: this.boolean(true),
        notes: this.attr(''),
        prescriptionSeq: this.attr(''),
        modified: this.boolean(false),
        patientType: this.attr(''),
        patientStatus: this.attr(''),
        leftDuration: this.attr(''),
        doctor_id: this.attr(''),
        clinic_id: this.attr(''),
        special: this.boolean(false),
        // Relationships
        clinic: this.belongsTo(Clinic, 'clinic_id'),
        doctor: this.belongsTo(Doctor, 'doctor_id'),
        patientVisitDetails: this.hasMany(PatientVisitDetails, 'prescription_id'),
        prescriptionDetails: this.hasMany(PrescriptionDetail, 'prescription_id'),
        duration: this.belongsTo(Duration, 'duration_id'),
        prescribedDrugs: this.hasMany(PrescribedDrug, 'prescription_id'),
        groupMemberPrescription: this.hasMany(GroupMemberPrescription, 'prescription_id')
      }
    }

    remainigDuration () {
      const prescriptionDuration = Number(this.duration.weeks)
      let packagedWeeks = 0
      this.patientVisitDetails.forEach((pvd) => {
        if (pvd.pack !== null) {
          packagedWeeks = Number(packagedWeeks + pvd.pack.weeksSupply)
        }
      })
      return Number((prescriptionDuration - packagedWeeks) / 4)
    }

    remainigDurationInWeeks () {
      const prescriptionDuration = Number(this.duration.weeks)
      let packagedWeeks = 0
      this.patientVisitDetails.forEach((pvd) => {
        if (pvd.pack !== null) {
          packagedWeeks = Number(packagedWeeks + pvd.pack.weeksSupply)
        }
      })
      return Number(prescriptionDuration - packagedWeeks)
    }

    lastPackOnPrescription () {
      let lastVisit = null
      this.patientVisitDetails.forEach((visit) => {
        if (lastVisit === null) {
          lastVisit = visit
        } else if (visit.pack.pickupDate > lastVisit.pack.pickupDate) {
          lastVisit = visit
        }
      })
      return lastVisit.pack
    }

    static async apiSave (prescription) {
      return await this.api().post('/prescription', prescription)
    }

    static async apiGetAllByClinicId (clinicId, offset, max) {
      return await this.api().get('/prescription/clinic/' + clinicId + '?offset=' + offset + '&max=' + max)
    }

    static async apiFetchById (id) {
      return await this.api().get(`/prescription/${id}`)
    }

    static async apiFetchLastByIdentifierId (id) {
      return await this.api().get(`/prescription/identifier/${id}`)
    }

    static async apiFetchByPatientVisitDetailsId (pvdsId, offset, max) {
      return await this.api().get('/prescription/visits/' + pvdsId + '?offset=' + offset + '&max=' + max)
    }

    static async apiGetByClinicId (clinicId) {
      return await this.api().get('/prescription/clinic/' + clinicId)
    }
}
