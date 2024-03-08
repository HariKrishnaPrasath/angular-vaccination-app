import { Appointment } from "../appointment/appointment";

export class Certificate {
    constructor(
        public certificateId: number,
        public appointment: Appointment,
        public dateOfVaccination: Date,
        public certificateUrl: string,
        public approvalStatus: string,
    ) {}
}
