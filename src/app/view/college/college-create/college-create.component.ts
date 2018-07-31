import { Component, OnInit, Input } from '@angular/core';
import { FormGroup, FormBuilder, Validators, AbstractControl } from '@angular/forms';
import { Subscription } from 'rxjs/Subscription';
import { Title } from '@angular/platform-browser';
import { Router } from '@angular/router';
import { CollegeService } from "../../../core/services/college.service";
import { CollegeModel, FormCollegeModel } from "../../../core/models/college.model";
import { CollegeFormService } from "./college-form.service";
@Component({
  selector: 'app-college-create',
  templateUrl: './college-create.component.html',
  styleUrls: ['./college-create.component.css'],
  providers: [CollegeService, CollegeFormService]
})
export class CollegeCreateComponent implements OnInit {
  @Input() college: CollegeModel;
  isEdit: boolean;
  // FormBuilder form
  collegeForm: FormGroup;

  // Model storing initial form values
  formCollegeModel: FormCollegeModel;

  // Form validation and disabled logic
  formErrors: any;
  formChangeSub: Subscription;

  // Form submission
  submitCollegeObj: CollegeModel;
  submitCollegeSub: Subscription;
  error: boolean;
  submitting: boolean;
  submitBtnText: string;
  message: boolean;
  routeSub: Subscription;
  collegeSub: Subscription;
  loading: boolean;

  constructor(
    private collegeservice: CollegeService,
    public cfs: CollegeFormService,
    private fb: FormBuilder,
    private router: Router,
    private title: Title) { }

  ngOnInit() {

    this.formErrors = this.cfs.formErrors;
    this.isEdit = !!this.college;

    this.submitBtnText = this.isEdit ? 'Update' : 'Create'
    //set intial form data
    this.formCollegeModel = this._setFormData();
    // Use FormBuilder to construct the form
    this._buildForm();
    //set PageTitle
    if (!this.isEdit) {
      this.title.setTitle("Create College")
    } else {
      this.title.setTitle("Update College")
    }

  }

  private _buildForm() {
    this.collegeForm = this.fb.group({
      name: [this.formCollegeModel.name, [

        Validators.required,
        Validators.minLength(this.cfs.textMin),
        Validators.maxLength(this.cfs.nameMax)
      ]],
      address: [this.formCollegeModel.address, [
        Validators.required,
        Validators.minLength(this.cfs.textMin)
      ]],
      state: [this.formCollegeModel.state, [
        Validators.required,
        Validators.minLength(this.cfs.textMin)
      ]],
      city: [this.formCollegeModel.city, [
        Validators.required,
        Validators.minLength(this.cfs.textMin)
      ]],
      phoneNo: [this.formCollegeModel.phoneNo, [
        Validators.required,
        Validators.minLength(this.cfs.textMin)
      ]],
    });

    // Subscribe to form value changes
    this.formChangeSub = this.collegeForm
      .valueChanges
      .subscribe(data => this._onValueChanged());
    // If edit: mark fields dirty to trigger immediate
    // validation in case editing an college that is no longer validate

    if (this.isEdit) {
      const _markDirty = group => {
        for (const i in group.controls) {
          if (group.controls.hasOwnProperty(i)) {
            group.controls[i].markAsDirty();
          }
        }
      };
      _markDirty(this.collegeForm);
    }

    this._onValueChanged();
  }

  private _onValueChanged() {
    if (!this.collegeForm) { return; }
    const _setErrMsgs = (control: AbstractControl, errorsObj: any, field: string) => {
      if (control && control.dirty && control.invalid) {
        console.log(control);
        const messages = this.cfs.validationMessages[field];
        for (const key in control.errors) {
          if (control.errors.hasOwnProperty(key)) {
            errorsObj[field] += messages[key] + '<br>';
          }
        }
      }
    };

    // Check validation and set errors
    for (const field in this.formErrors) {
      if (this.formErrors.hasOwnProperty(field)) {
        this.formErrors[field] = '';
        _setErrMsgs(this.collegeForm.get(field), this.formErrors, field);
      }
    }
  }

  private _getSubmitObj() {
    if (!this.isEdit) {
      return new CollegeModel(
        this.collegeForm.get('name').value,
        this.collegeForm.get('address').value,
        this.collegeForm.get('state').value,
        this.collegeForm.get('city').value,
        this.collegeForm.get('phoneNo').value,
        '', '', new Date(), new Date()
      );
    } else {
      return new CollegeModel(
        this.collegeForm.get('name').value,
        this.collegeForm.get('address').value,
        this.collegeForm.get('state').value,
        this.collegeForm.get('city').value,
        this.collegeForm.get('phoneNo').value,
        '', '', new Date(), new Date(), this.college.id
      );
    }
  }

  onSubmit() {
    this.submitting = true;
    this.submitCollegeObj = this._getSubmitObj();
    this.submitCollegeSub = this.collegeservice
      .add(this.submitCollegeObj)
      .subscribe(
        data => this._handleSubmitSuccess(data),
        err => this._handleSubmitError(err)
      );
  }

  private _handleSubmitSuccess(res) {
    this.error = false;
    this.submitting = false;
    this.message = true;
    // Redirect to college list
    this.router.navigate(['college/CollegeList']);

  }

  private _handleSubmitError(err) {
    console.error(err);
    this.submitting = false;
    this.error = true;
    this.message = false;
  }

  private _setFormData() {
    if (!this.isEdit) {
      // If creating a new college, create new
      // FormCollegeModel with default null data
      return new FormCollegeModel(null, null, null, null, null);

    } else {
      console.log(this.college.id);
      // If editing existing college, create new
      // FormCollegeModel from existing data 
      return new FormCollegeModel(
        this.college.name,
        this.college.address,
        this.college.state,
        this.college.city,
        this.college.phoneNo,
      );
    }
  }

  resetForm() {
    this.collegeForm.reset();
  }


  ngOnDestroy() {
    if (this.collegeSub) {
      this.collegeSub.unsubscribe();
    }
    if (this.submitCollegeSub) {
      this.submitCollegeSub.unsubscribe();
    }
    if (this.formChangeSub) {
      this.formChangeSub.unsubscribe();
    }
  }
}
