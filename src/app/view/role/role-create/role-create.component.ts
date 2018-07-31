import { Component, OnInit, Input } from '@angular/core';
import { FormGroup, FormBuilder, Validators, AbstractControl } from '@angular/forms';
import { Subscription } from 'rxjs/Subscription';
import { Router } from '@angular/router';
import { Title } from "@angular/platform-browser";

import { RoleService } from "../../../core/services/role.service";
import { RoleModel, FormRoleModel } from "../../../core/models/role.model";
import { RoleFormService } from "./role-form.service";

@Component({
  selector: 'app-role-create',
  templateUrl: './role-create.component.html',
  styleUrls: ['./role-create.component.css'],
  providers: [RoleService, RoleFormService]
})
export class RoleCreateComponent implements OnInit {
  @Input() role: RoleModel;
  isEdit: boolean;
  // FormBuilder form
  roleForm: FormGroup;

  // Model storing initial form values
  formRoleModel: FormRoleModel;

  // Form validation and disabled logic
  formErrors: any;
  formChangeSub: Subscription;

  // Form submission
  submitRoleObj: RoleModel;
  submitRoleSub: Subscription;
  error: boolean;
  submitting: boolean;
  submitBtnText: string;
  message: boolean;

  randomString: string;
  routeSub: Subscription;
  roleSub: Subscription;
  loading: boolean;

  constructor(
    private roleService: RoleService,
    public rfs: RoleFormService,
    private fb: FormBuilder,
    private router: Router,
    private title: Title) { }

  ngOnInit() {

    this.formErrors = this.rfs.formErrors;
    this.isEdit = !!this.role;

    this.submitBtnText = this.isEdit ? 'Update' : 'Create'
    //set intial form data
    this.formRoleModel = this._setFormData();
    // Use FormBuilder to construct the form
    this._buildForm();
    if (!this.isEdit) {
      this.title.setTitle("Create Role")
    } else {
      this.title.setTitle("Update Role")
    }
  }

  private _buildForm() {
    this.roleForm = this.fb.group({
      name: [this.formRoleModel.name, [

        Validators.required,
        Validators.minLength(this.rfs.textMin),
        Validators.maxLength(this.rfs.nameMax)
      ]],
      description: [this.formRoleModel.description, [
        Validators.required,
        Validators.minLength(this.rfs.textMin)
      ]],
    });

    // Subscribe to form value changes
    this.formChangeSub = this.roleForm
      .valueChanges
      .subscribe(data => this._onValueChanged());
    // If edit: mark fields dirty to trigger immediate
    // validation in case editing an Role that is no longer validate

    if (this.isEdit) {
      const _markDirty = group => {
        for (const i in group.controls) {
          if (group.controls.hasOwnProperty(i)) {
            group.controls[i].markAsDirty();
          }
        }
      };
      _markDirty(this.roleForm);
    }

    this._onValueChanged();
  }

  private _onValueChanged() {
    if (!this.roleForm) { return; }
    const _setErrMsgs = (control: AbstractControl, errorsObj: any, field: string) => {
      if (control && control.dirty && control.invalid) {
        console.log(control);
        const messages = this.rfs.validationMessages[field];
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
        _setErrMsgs(this.roleForm.get(field), this.formErrors, field);
      }
    }
  }

  private _getSubmitObj() {
    if (!this.isEdit) {
      return new RoleModel(
        this.roleForm.get('name').value,
        this.roleForm.get('description').value,
        '', '', new Date(), new Date()
      );
    } else {
      return new RoleModel(
        this.roleForm.get('name').value,
        this.roleForm.get('description').value,
        '', '', new Date(), new Date(), this.role.id
      );
    }
  }

  onSubmit() {
    this.submitting = true;
    this.submitRoleObj = this._getSubmitObj();
    this.submitRoleSub = this.roleService
      .add(this.submitRoleObj)
      .subscribe(
        data => this._handleSubmitSuccess(data),
        err => this._handleSubmitError(err)
      );
  }

  private _handleSubmitSuccess(res) {
    this.error = false;
    this.submitting = false;
    this.message = true;
    // Redirect to Role list
    this.router.navigate(['role/RoleList']);

  }

  private _handleSubmitError(err) {
    console.error(err);
    this.submitting = false;
    this.error = true;
    this.message = false;
  }

  private _setFormData() {
    if (!this.isEdit) {
      // If creating a new Role, create new
      // FormRoleModel with default null data
      return new FormRoleModel(null, null);

    } else {
      console.log(this.role.id);
      // If editing existing Role, create new
      // FormRoleModel from existing data 
      return new FormRoleModel(
        this.role.name,
        this.role.description,
      );
    }
  }

  resetForm() {
    this.roleForm.reset();
  }

  ngOnDestroy() {
    if (this.roleSub) {
      this.roleSub.unsubscribe();
    }
    if (this.submitRoleSub) {
      this.submitRoleSub.unsubscribe();
    }
    if (this.formChangeSub) {
      this.formChangeSub.unsubscribe();
    }
  }
}
