import { Admin } from "../admin/admin";
import { Slot } from "../slot/slot";
import { Vaccine } from "../vaccine/vaccine";

export class Center {
    constructor(
        public centerId: number,
        public centerName: string,
        public address: string,
        public pincode: string,
        public district: string,
        public state: string,
        public contactNumber: string,
        public vaccineMap:Vaccine[],
        public slots: Slot[],
        public admin: Admin,
    ) {}
}
