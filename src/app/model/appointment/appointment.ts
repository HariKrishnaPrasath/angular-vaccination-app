import { Certificate } from "../certificate/certificate";
import { Patient } from "../patient/patient";
import { Slot } from "../slot/slot";
import { Vaccine } from "../vaccine/vaccine";

export class Appointment {
    constructor (
        public bookingId: number,
        public vaccineStatus: boolean,
        public slot: Slot,
        public certificate: Certificate,
        public patient: Patient,
        public vaccine: Vaccine,
        public bookingDate: Date,        
    ) {}
}
