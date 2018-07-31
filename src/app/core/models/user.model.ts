class UserModel {
    constructor(
        public firstName: string,
        public lastName: string,
        public login: string,
        public password: string,
        public dob: string,
        public mobileNo: string,
        public roleId: string,
        public gender: string,
        public created_by: string,
        public modified_by: string,
        public created_datetime: Date,
        public modified_datetime: Date,
        public id?: string, // _id is present if editing or returning from DB
    ) { }
}
class FormUserModel {
    constructor(
        public firstName: string,
        public lastName: string,
        public login: string,
        public password: string,
        public dob: string,
        public mobileNo: string,
        public roleId: string,
        public gender: string,
    ) { }
}

export { UserModel, FormUserModel };
