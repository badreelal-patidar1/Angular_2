import { Injectable } from '@angular/core';

@Injectable()
export class MarksheetFormService {

    validationMessages: any;

    // Set up errors object
    formErrors = {
        rollNo: '',
        studentId: '',
        name: '',
        physics: '',
        chemistry: '',
        maths: ''
    };

    // Min/maxlength validation
    textMin = 2;
    textMax = 3;
    pattern = /\b(0?[0-9]|[1-9][0-9]|100)\b/

    constructor() {
        this.validationMessages = {
            rollNo: {
                required: `Role No is <strong>required</strong>.`,
                minlength: `Role No must be ${this.textMin} characters or more.`
            },
            studentId: {
                required: `StudentId is <strong>required</strong>.`,
                minlength: `StudentId must be ${this.textMin} characters or more.`
            },
            name: {
                required: `Name is <strong>required</strong>.`,
                minlength: `Name must be ${this.textMin} characters or more.`
            },
            physics: {
                required: `Physics Marks is <strong>required</strong>.`,
                maxlength: `Physics Marks must be ${this.textMax} characters or less.`,
                pattern: `please enter valid Marks.`
            },
            chemistry: {
                required: `Chemistry Marks is <strong>required</strong>.`,
                maxlength: `Chemistry Marks must be ${this.textMax} characters or less.`,
                pattern: `please enter valid Marks.`
            },
            maths: {
                required: `Maths Marks is <strong>required</strong>.`,
                maxlength: `Maths Marks must be ${this.textMax} characters or less.`,
                pattern: `please enter valid Marks.`
            },
        }
    }
}