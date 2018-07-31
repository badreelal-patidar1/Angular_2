class StudentModel {
    constructor(
        public collegeId: string,
        public collegeName: string,
        public firstName: string,
        public lastName: string,
        public dob: string,
        public mobileNo: string,
        public email: string,
        public created_by: string,
        public modified_by: string,
        public created_datetime: Date,
        public modified_datetime: Date,
        public id?: string, // _id is present if editing or returning from DB
    ) { }
}
class FormStudentModel {
    constructor(
        public collegeId: string,
        public collegeName: string,
        public firstName: string,
        public lastName: string,
        public dob: string,
        public mobileNo: string,
        public email: string,
    ) { }
}

export { StudentModel, FormStudentModel };
