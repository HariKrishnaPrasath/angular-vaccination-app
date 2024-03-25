import { Time } from "@angular/common";
import { Appointment } from "../appointment/appointment";
import { Center } from "../center/center";

export class Slot {
    constructor(
        public id?: number,
        public date?: string,
        public startTime?: Date,
        public endTime?: Date,
        public availableSlots?: number,
        public center?: Center,
        public appointments?: Appointment[]
    ) {}
}
