import { Appointment } from "../appointment/appointment";

export class Patient {
    constructor(
        public patientId?: number,
        public email?: string,
        public phoneNumber?: string,
        public password?: string,
        public address?: string,
        public patientName?: string,
        public registrationDate?: string,
        public appointment?: Appointment[]
    ) {}
}
