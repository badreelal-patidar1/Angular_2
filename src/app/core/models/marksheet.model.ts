class MarksheetModel {
    constructor(
        public rollNo: string,
        public studentId: string,
        public name: string,
        public physics: string,
        public chemistry: string,
        public maths: string,
        public created_by: string,
        public modified_by: string,
        public created_datetime: Date,
        public modified_datetime: Date,
        public id?: string, // _id is present if editing or returning from DB
    ) { }
}
class FormMarksheetModel {
    constructor(
        public rollNo: string,
        public studentId: string,
        public name: string,
        public physics: string,
        public chemistry: string,
        public maths: string
    ) { }
}

export { MarksheetModel, FormMarksheetModel };
