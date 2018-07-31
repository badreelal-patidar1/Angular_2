import { Component, OnInit, Input } from '@angular/core';
import { FormGroup, FormBuilder, Validators, AbstractControl } from '@angular/forms';
import { Subscription } from 'rxjs/Subscription';
import { Router } from '@angular/router';
import { Title } from "@angular/platform-browser";
import { StudentService } from "../../../core/services/student.service";
import { StudentModel, FormStudentModel } from "../../../core/models/student.model";
import { StudentFormService } from "./student-form.service";


@Component({
  selector: 'app-student-create',
  templateUrl: './student-create.component.html',
  styleUrls: ['./student-create.component.css'],
  providers: [StudentService, StudentFormService]
})
export class StudentCreateComponent implements OnInit {
  @Input() student: StudentModel;
  isEdit: boolean;
  // FormBuilder form
  studentForm: FormGroup;

  // Model storing initial form values
  formStudentModel: FormStudentModel;

  // Form validation and disabled logic
  formErrors: any;
  formChangeSub: Subscription;

  // Form submission
  submitStudentObj: StudentModel;
  submitStudentSub: Subscription;
  error: boolean;
  submitting: boolean;
  submitBtnText: string;
  message: boolean;
  roleSub: Subscription;
  loading: boolean;

  constructor(
    private studentService: StudentService,
    public sfs: StudentFormService,
    private fb: FormBuilder,
    private router: Router,
    private title: Title) { }

  ngOnInit() {

    this.formErrors = this.sfs.formErrors;
    this.isEdit = !!this.student;

    this.submitBtnText = this.isEdit ? 'Update' : 'Create'
    //set intial form data
    this.formStudentModel = this._setFormData();
    // Use FormBuilder to construct the form
    this._buildForm();
    if (!this.isEdit) {
      this.title.setTitle("Create Student")
    } else {
      this.title.setTitle("Update Student")
    }
  }

  private _buildForm() {
    this.studentForm = this.fb.group({
      collegeId: [this.formStudentModel.collegeId, [
        Validators.required,
        Validators.minLength(this.sfs.textMin)
      ]],
      collegeName: [this.formStudentModel.collegeName, [
        Validators.required,
        Validators.minLength(this.sfs.textMin)
      ]],
      firstName: [this.formStudentModel.firstName, [
        Validators.required,
        Validators.minLength(this.sfs.textMin)
      ]],
      lastName: [this.formStudentModel.lastName, [
        Validators.required,
        Validators.minLength(this.sfs.textMin)
      ]],
      dob: [this.formStudentModel.dob, [Validators.required]],
      mobileNo: [this.formStudentModel.mobileNo, [
        Validators.required,
        Validators.maxLength(this.sfs.textMax),
        Validators.pattern(this.sfs.mobilePattern)
      ]],
      email: [this.formStudentModel.email, [
        Validators.required,
        Validators.pattern(this.sfs.emailPattern)
      ]],
    });

    // Subscribe to form value changes
    this.formChangeSub = this.studentForm
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
      _markDirty(this.studentForm);
    }

    this._onValueChanged();
  }

  private _onValueChanged() {
    if (!this.studentForm) { return; }
    const _setErrMsgs = (control: AbstractControl, errorsObj: any, field: string) => {
      if (control && control.dirty && control.invalid) {
        console.log(control);
        const messages = this.sfs.validationMessages[field];
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
        _setErrMsgs(this.studentForm.get(field), this.formErrors, field);
      }
    }
  }

  private _getSubmitObj() {
    if (!this.isEdit) {
      return new StudentModel(
        this.studentForm.get('collegeId').value,
        this.studentForm.get('collegeName').value,
        this.studentForm.get('firstName').value,
        this.studentForm.get('lastName').value,
        this.studentForm.get('dob').value,
        this.studentForm.get('mobileNo').value,
        this.studentForm.get('email').value,
        '', '', new Date(), new Date()
      );
    } else {
      return new StudentModel(
        this.studentForm.get('collegeId').value,
        this.studentForm.get('collegeName').value,
        this.studentForm.get('firstName').value,
        this.studentForm.get('lastName').value,
        this.studentForm.get('dob').value,
        this.studentForm.get('mobileNo').value,
        this.studentForm.get('email').value,
        '', '', new Date(), new Date(), this.student.id
      );
    }
  }

  onSubmit() {
    this.submitting = true;
    this.submitStudentObj = this._getSubmitObj();
    this.submitStudentSub = this.studentService
      .add(this.submitStudentObj)
      .subscribe(
        data => this._handleSubmitSuccess(data),
        err => this._handleSubmitError(err)
      );
  }

  private _handleSubmitSuccess(res) {
    this.error = false;
    this.submitting = false;
    this.message = true;
    // Redirect to student list
    this.router.navigate(['student/StudentList']);
  }

  private _handleSubmitError(err) {
    console.error(err);
    this.submitting = false;
    this.error = true;
    this.message = false;
  }

  private _setFormData() {
    if (!this.isEdit) {
      // If creating a new student, create new
      // FormStudentModel with default null data
      return new FormStudentModel(null, null, null, null, null, null, null);

    } else {
      // If editing existing student, create new
      // FormStudentModel from existing data 
      return new FormStudentModel(
        this.student.collegeId,
        this.student.collegeName,
        this.student.firstName,
        this.student.lastName,
        this.student.dob,
        this.student.mobileNo,
        this.student.email,
      );
    }
  }

  resetForm() {
    this.studentForm.reset();
  }

  ngOnDestroy() {
    if (this.roleSub) {
      this.roleSub.unsubscribe();
    }
    if (this.submitStudentSub) {
      this.submitStudentSub.unsubscribe();
    }
    if (this.formChangeSub) {
      this.formChangeSub.unsubscribe();
    }
  }
}
