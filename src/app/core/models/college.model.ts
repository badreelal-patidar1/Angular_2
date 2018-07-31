class CollegeModel {
    constructor(
        public name: string,
        public address: string,
        public state: string,
        public city: string,
        public phoneNo: string,
        public created_by: string,
        public modified_by: string,
        public created_datetime: Date,
        public modified_datetime: Date,
        public id?: string, // _id is present if editing or returning from DB
    ) { }
}
class FormCollegeModel {
    constructor(
        public name: string,
        public address: string,
        public state: string,
        public city: string,
        public phoneNo: string,
    ) { }
}

export { CollegeModel, FormCollegeModel };
