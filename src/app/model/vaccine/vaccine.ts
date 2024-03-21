export class Vaccine {
    constructor(
        public vaccineName?: string,
        public manufacturingDate?: Date,
        public expiryDate?: Date,
        public description?: string,
        public vaccineId?: number,
    ) {}
}
