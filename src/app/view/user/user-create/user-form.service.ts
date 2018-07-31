import { Injectable } from '@angular/core';

@Injectable()
export class UserFormService {

    validationMessages: any;

    // Set up errors object
    formErrors = {
        firstName: '',
        lastName: '',
        login: '',
        password: '',
        confirmPassword: '',
        dob: '',
        mobileNo: '',
        roleId: '',
        gender: ''
    };

    // Min/maxlength validation
    textMin = 2;
    textMax = 10;
    passwordMin = 6;
    mobilePattern = /^[7-9][0-9]{9}$/;
    emailPattern = /^[a-z]+[a-z0-9._]+@[a-z]+\.[a-z.]{2,5}$/;

    constructor() {
        this.validationMessages = {
            firstName: {
                required: `FirstName is <strong>required</strong>.`,
                minlength: `FirstName must be ${this.textMin} characters or more.`
            },
            lastName: {
                required: `LastName  is <strong>required</strong>.`,
                minlength: `LastName must be ${this.textMin} characters or more.`
            },
            login: {
                required: `Login(Email)  is <strong>required</strong>.`,
                pattern: `please enter valid Email  .`
            },
            password: {
                required: `Password  is <strong>required</strong>.`,
                minlength: `Password must be ${this.passwordMin} characters or more.`
            },
            confirmPassword: {
                required: `Confirm Password  is <strong>required</strong>.`,
                minlength: `Confirm Password must be ${this.passwordMin} characters or more.`
            },
            dob: {
                required: `Date of Birth <strong>required</strong>.`
            },
            mobileNo: {
                required: `MobileNo  is <strong>required</strong>.`,
                maxlength: `MobileNo  must be ${this.textMax} characters or less.`,
                pattern: `please enter valid Mobile No.`
            },
            roleId: {
                required: `RoleId  is <strong>required</strong>.`
            },
            gender: {
                required: `Please select your is <strong>gender</strong>.`,
            }
        }
    }
}