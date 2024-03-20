import { Appointment } from "../appointment/appointment";
import { Center } from "../center/center";

export class Slot {
    constructor(
        public id?: number,
        public date?: Date,
        public startTime?: string,
        public endTime?: string,
        public availableSlots?: number,
        public center?: Center,
        public appointments?: Appointment[]
    ) {}
}
