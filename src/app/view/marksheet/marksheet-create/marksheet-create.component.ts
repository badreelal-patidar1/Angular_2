import { Component, OnInit, Input } from '@angular/core';
import { FormGroup, FormBuilder, Validators, AbstractControl } from '@angular/forms';
import { Subscription } from 'rxjs/Subscription';
import { Router } from '@angular/router';
import { Title } from "@angular/platform-browser";
import { MarksheetService } from "../../../core/services/marksheet.service";
import { MarksheetModel, FormMarksheetModel } from "../../../core/models/marksheet.model";
import { MarksheetFormService } from "./marksheet.form.service";
@Component({
  selector: 'app-marksheet-create',
  templateUrl: './marksheet-create.component.html',
  styleUrls: ['./marksheet-create.component.css'],
  providers: [MarksheetService, MarksheetFormService]
})
export class MarksheetCreateComponent implements OnInit {
  @Input() marksheet: MarksheetModel;
  isEdit: boolean;
  // FormBuilder form
  marksheetForm: FormGroup;

  // Model storing initial form values
  formMarksheetModel: FormMarksheetModel;

  // Form validation and disabled logic
  formErrors: any;
  formChangeSub: Subscription;

  // Form submission
  submitMarksheetObj: MarksheetModel;
  submitMarksheetSub: Subscription;
  error: boolean;
  submitting: boolean;
  submitBtnText: string;
  message: boolean;
  routeSub: Subscription;
  marksheetSub: Subscription;
  loading: boolean;

  constructor(
    private marksheetService: MarksheetService,
    public mfs: MarksheetFormService,
    private fb: FormBuilder,
    private router: Router,
    private title: Title) { }

  ngOnInit() {

    this.formErrors = this.mfs.formErrors;
    this.isEdit = !!this.marksheet;

    this.submitBtnText = this.isEdit ? 'Update' : 'Create'
    //set intial form data
    this.formMarksheetModel = this._setFormData();
    // Use FormBuilder to construct the form
    this._buildForm();
    if (!this.isEdit) {
      this.title.setTitle("Create Marksheet")
    } else {
      this.title.setTitle("Update Marksheet")
    }
  }

  private _buildForm() {
    this.marksheetForm = this.fb.group({
      rollNo: [this.formMarksheetModel.rollNo, [
        Validators.required,
        Validators.minLength(this.mfs.textMin)
      ]],
      studentId: [this.formMarksheetModel.studentId, [
        Validators.required,
        Validators.minLength(this.mfs.textMin)
      ]],
      name: [this.formMarksheetModel.name, [
        Validators.required,
        Validators.minLength(this.mfs.textMin)
      ]],
      physics: [this.formMarksheetModel.physics, [
        Validators.required,
        Validators.maxLength(this.mfs.textMax),
        Validators.pattern(this.mfs.pattern)
      ]],
      chemistry: [this.formMarksheetModel.chemistry, [
        Validators.required,
        Validators.maxLength(this.mfs.textMax),
        Validators.pattern(this.mfs.pattern)
      ]],
      maths: [this.formMarksheetModel.maths, [
        Validators.required,
        Validators.maxLength(this.mfs.textMax),
        Validators.pattern(this.mfs.pattern)
      ]],
    });

    // Subscribe to form value changes
    this.formChangeSub = this.marksheetForm
      .valueChanges
      .subscribe(data => this._onValueChanged());
    // If edit: mark fields dirty to trigger immediate
    // validation in case editing an marksheet that is no longer validate

    if (this.isEdit) {
      const _markDirty = group => {
        for (const i in group.controls) {
          if (group.controls.hasOwnProperty(i)) {
            group.controls[i].markAsDirty();
          }
        }
      };
      _markDirty(this.marksheetForm);
    }

    this._onValueChanged();
  }

  private _onValueChanged() {
    if (!this.marksheetForm) { return; }
    const _setErrMsgs = (control: AbstractControl, errorsObj: any, field: string) => {
      if (control && control.dirty && control.invalid) {
        console.log(control);
        const messages = this.mfs.validationMessages[field];
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
        _setErrMsgs(this.marksheetForm.get(field), this.formErrors, field);
      }
    }
  }

  private _getSubmitObj() {
    if (!this.isEdit) {
      return new MarksheetModel(
        this.marksheetForm.get('rollNo').value,
        this.marksheetForm.get('studentId').value,
        this.marksheetForm.get('name').value,
        this.marksheetForm.get('physics').value,
        this.marksheetForm.get('chemistry').value,
        this.marksheetForm.get('maths').value,
        '', '', new Date(), new Date()
      );
    } else {
      return new MarksheetModel(
        this.marksheetForm.get('rollNo').value,
        this.marksheetForm.get('studentId').value,
        this.marksheetForm.get('name').value,
        this.marksheetForm.get('physics').value,
        this.marksheetForm.get('chemistry').value,
        this.marksheetForm.get('maths').value,
        '', '', new Date(), new Date(), this.marksheet.id
      );
    }
  }

  onSubmit() {
    this.submitting = true;
    this.submitMarksheetObj = this._getSubmitObj();
    this.submitMarksheetSub = this.marksheetService
      .add(this.submitMarksheetObj)
      .subscribe(
        data => this._handleSubmitSuccess(data),
        err => this._handleSubmitError(err)
      );
  }

  private _handleSubmitSuccess(res) {
    this.error = false;
    this.submitting = false;
    this.message = true;
    // Redirect to marksheet list
    this.router.navigate(['/marksheet/MarksheetList']);

  }

  private _handleSubmitError(err) {
    console.error(err);
    this.submitting = false;
    this.error = true;
    this.message = false;
  }

  private _setFormData() {
    if (!this.isEdit) {
      // If creating a new marksheet, create new
      // FormMarksheetModel with default null data
      return new FormMarksheetModel(null, null, null, null, null, null);

    } else {
      console.log(this.marksheet.id);
      // If editing existing marksheet, create new
      // FormmarksheetModel from existing data 
      return new FormMarksheetModel(
        this.marksheet.rollNo,
        this.marksheet.studentId,
        this.marksheet.name,
        this.marksheet.physics,
        this.marksheet.chemistry,
        this.marksheet.maths
      );
    }
  }

  resetForm() {
    this.marksheetForm.reset();
  }

  ngOnDestroy() {
    if (this.marksheetSub) {
      this.marksheetSub.unsubscribe();
    }
    if (this.submitMarksheetSub) {
      this.submitMarksheetSub.unsubscribe();
    }
    if (this.formChangeSub) {
      this.formChangeSub.unsubscribe();
    }
  }
}
