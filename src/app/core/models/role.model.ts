class RoleModel {
    constructor(
        public name: string,
        public description: string,
        public created_by: string,
        public modified_by: string,
        public created_datetime: Date,
        public modified_datetime: Date,
        public id?: string, // _id is present if editing or returning from DB
    ) { }
}
class FormRoleModel {
    constructor(
        public name: string,
        public description: string,
    ) { }
}

export { RoleModel, FormRoleModel };
