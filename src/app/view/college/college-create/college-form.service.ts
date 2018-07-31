import { Injectable } from '@angular/core';

@Injectable()
export class CollegeFormService {

	validationMessages: any;

	// Set up errors object
	formErrors = {
		name: '',
		address: '',
		state: '',
		city: '',
		phoneNo: ''
	};

	// Min/maxlength validation
	textMin = 2;
	nameMax = 36;
	pattern=/^[7-9][0-9]{9}$/

	constructor() {
		this.validationMessages = {
			name: {
				required: `Name is <strong>required</strong>.`,
				minlength: `Name must be ${this.textMin} characters or more.`,
				maxlength: `Name must be ${this.nameMax} characters or less.`
			},
			address: {
				required: `Address is <strong>required</strong>.`,
				minlength: `address must be ${this.textMin} characters or more.`
			},
			state: {
				required: `State is <strong>required</strong>.`,
				minlength: `state must be ${this.textMin} characters or more.`
			},
			city: {
				required: `City is <strong>required</strong>.`,
				minlength: `city must be ${this.textMin} characters or more.`
			},
			phoneNo: {
				required: `PhoneNo is <strong>required</strong>.`,
				minlength: `phoneNo must be ${this.textMin} characters or more.`,
				pattern: `please enter valid phoneNo.`
			},
		}
	}
}