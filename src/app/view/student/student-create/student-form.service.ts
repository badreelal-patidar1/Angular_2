import { Injectable } from '@angular/core';

@Injectable()
export class StudentFormService {

    validationMessages: any;

    // Set up errors object
    formErrors = {
        collgeId: '',
        collgeName: '',
        firstName: '',
        lastName: '',
        mobileNo: '',
        email: ''
    };

    // Min/maxlength validation
    textMin = 2;
    textMax = 10;
    mobilePattern = /^[7-9][0-9]{9}$/;
    emailPattern = /^[a-z]+[a-z0-9._]+@[a-z]+\.[a-z.]{2,5}$/;

    constructor() {
        this.validationMessages = {
            collgeId: {
                required: `Role No is <strong>required</strong>.`,
                minlength: `Role No must be ${this.textMin} characters or more.`
            },
            collgeName: {
                required: `collgeName is <strong>required</strong>.`,
                minlength: `collgeName must be ${this.textMin} characters or more.`
            },
            firstName: {
                required: `FirstName is <strong>required</strong>.`,
                minlength: `FirstName must be ${this.textMin} characters or more.`
            },
            lastName: {
                required: `LastName  is <strong>required</strong>.`,
                minlength: `LastName must be ${this.textMin} characters or more.`
            },
            dob: {
                required: `Date of Birth <strong>required</strong>.`
            },
            mobileNo: {
                required: `MobileNo  is <strong>required</strong>.`,
                maxlength: `MobileNo  must be ${this.textMax} characters or less.`,
                pattern: `please enter valid Mobile No.`
            },
            email: {
                required: `Email  is <strong>required</strong>.`,
                pattern: `please enter valid Email  .`
            },
        }
    }
}