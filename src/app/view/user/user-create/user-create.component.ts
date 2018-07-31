import { Component, OnInit, Input } from '@angular/core';
import { FormGroup, FormBuilder, Validators, AbstractControl } from '@angular/forms';
import { Subscription } from 'rxjs/Subscription';
import { Router } from '@angular/router';
import { Title } from "@angular/platform-browser";
import { UserService } from "../../../core/services/user.service";
import { UserModel, FormUserModel } from "../../../core/models/user.model";
import { UserFormService } from "./user-form.service";
import { PasswordValidation } from './password-validation';
@Component({
  selector: 'app-user-create',
  templateUrl: './user-create.component.html',
  styleUrls: ['./user-create.component.css'],
  providers: [UserService, UserFormService]
})
export class UserCreateComponent implements OnInit {
  @Input() user: UserModel;
  isEdit: boolean;
  // FormBuilder form
  userForm: FormGroup;

  // Model storing initial form values
  formUserModel: FormUserModel;

  // Form validation and disabled logic
  formErrors: any;
  formChangeSub: Subscription;

  // Form submission
  submitUserObj: UserModel;
  submitUserSub: Subscription;
  error: boolean;
  submitting: boolean;
  submitBtnText: string;
  message: boolean;
  userSub: Subscription;
  loading: boolean;

  constructor(
    private userService: UserService,
    public ufs: UserFormService,
    private fb: FormBuilder,
    private router: Router,
    private title: Title) { }

  ngOnInit() {

    this.formErrors = this.ufs.formErrors;
    this.isEdit = !!this.user;

    this.submitBtnText = this.isEdit ? 'Update' : 'Create'
    //set intial form data
    this.formUserModel = this._setFormData();
    // Use FormBuilder to construct the form
    this._buildForm();
    if (!this.isEdit) {
      this.title.setTitle("Create User");
    } else {
      this.title.setTitle("Update User")
    }
  }

  private _buildForm() {
    this.userForm = this.fb.group({
      firstName: [this.formUserModel.firstName, [
        Validators.required,
        Validators.minLength(this.ufs.textMin)
      ]],
      lastName: [this.formUserModel.lastName, [
        Validators.required,
        Validators.minLength(this.ufs.textMin)
      ]],
      login: [this.formUserModel.login, [
        Validators.required,
        Validators.pattern(this.ufs.emailPattern)
      ]],
      password: [this.formUserModel.password, [
        Validators.required,
        Validators.minLength(this.ufs.passwordMin)
      ]],
      confirmPassword: [this.formUserModel.password, [
        Validators.required,
        Validators.minLength(this.ufs.passwordMin),
      ]],
      dob: [this.formUserModel.dob, [Validators.required]],
      mobileNo: [this.formUserModel.mobileNo, [
        Validators.required,
        Validators.maxLength(this.ufs.textMax),
        Validators.pattern(this.ufs.mobilePattern)
      ]],
      roleId: [this.formUserModel.roleId, [
        Validators.required,
      ]],
      gender: [this.formUserModel.gender,
      [Validators.required]]
    }, {
        validator: PasswordValidation.MatchPassword
      });

    // Subscribe to form value changes
    this.formChangeSub = this.userForm
      .valueChanges
      .subscribe(data => this._onValueChanged());
    // If edit: mark fields dirty to trigger immediate
    // validation in case editing an User that is no longer validate

    if (this.isEdit) {
      const _markDirty = group => {
        for (const i in group.controls) {
          if (group.controls.hasOwnProperty(i)) {
            group.controls[i].markAsDirty();
          }
        }
      };
      _markDirty(this.userForm);
    }

    this._onValueChanged();
  }

  private _onValueChanged() {
    if (!this.userForm) { return; }
    const _setErrMsgs = (control: AbstractControl, errorsObj: any, field: string) => {
      if (control && control.dirty && control.invalid) {
        console.log(control);
        const messages = this.ufs.validationMessages[field];
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
        _setErrMsgs(this.userForm.get(field), this.formErrors, field);
      }
    }
  }

  private _getSubmitObj() {
    if (!this.isEdit) {
      return new UserModel(
        this.userForm.get('firstName').value,
        this.userForm.get('lastName').value,
        this.userForm.get('login').value,
        this.userForm.get('password').value,
        this.userForm.get('dob').value,
        this.userForm.get('mobileNo').value,
        this.userForm.get('roleId').value,
        this.userForm.get('gender').value,
        '', '', new Date(), new Date()
      );
    } else {
      return new UserModel(
        this.userForm.get('firstName').value,
        this.userForm.get('lastName').value,
        this.userForm.get('login').value,
        this.userForm.get('password').value,
        this.userForm.get('dob').value,
        this.userForm.get('mobileNo').value,
        this.userForm.get('roleId').value,
        this.userForm.get('gender').value,
        '', '', new Date(), new Date(), this.user.id
      );
    }
  }

  onSubmit() {
    this.submitting = true;
    this.submitUserObj = this._getSubmitObj();
    this.submitUserSub = this.userService
      .add(this.submitUserObj)
      .subscribe(
        data => this._handleSubmitSuccess(data),
        err => this._handleSubmitError(err)
      );
  }

  private _handleSubmitSuccess(res) {
    this.error = false;
    this.submitting = false;
    this.message = true;
    // Redirect to user list
    this.router.navigate(['/user/UserList']);

  }

  private _handleSubmitError(err) {
    console.error(err);
    this.submitting = false;
    this.error = true;
    this.message = false;
  }

  private _setFormData() {
    if (!this.isEdit) {
      // If creating a new user, create new
      // formUserModel with default null data
      return new FormUserModel(null, null, null, null, null, null, null, null);

    } else {
      // If editing existing user, create new
      // formUserModel from existing data 
      return new FormUserModel(
        this.user.firstName,
        this.user.lastName,
        this.user.login,
        this.user.password,
        this.user.dob,
        this.user.mobileNo,
        this.user.roleId,
        this.user.gender
      );
    }
  }

  resetForm() {
    this.userForm.reset();
  }

  ngOnDestroy() {
    if (this.userSub) {
      this.userSub.unsubscribe();
    }
    if (this.submitUserSub) {
      this.submitUserSub.unsubscribe();
    }
    if (this.formChangeSub) {
      this.formChangeSub.unsubscribe();
    }
  }
}
