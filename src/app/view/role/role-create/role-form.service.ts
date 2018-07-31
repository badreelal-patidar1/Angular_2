import { Injectable } from '@angular/core';

@Injectable()
export class RoleFormService {

    validationMessages: any;

    // Set up errors object
    formErrors = {
        name: '',
        description: '',
        state: '',
        city: '',
        phoneNo: ''
    };

    // Min/maxlength validation
    textMin = 2;
    nameMax = 36;

    constructor() {
        this.validationMessages = {
            name: {
                required: `Name is <strong>required</strong>.`,
                minlength: `Name must be ${this.textMin} characters or more.`,
                maxlength: `Name must be ${this.nameMax} characters or less.`
            },
            description: {
                required: `Description is <strong>required</strong>.`,
                minlength: `Description must be ${this.textMin} characters or more.`
            }
        }
    }
}