import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs/Subscription';
import { Router } from '@angular/router';
import { UtilsService } from './../../../core/utils.service';
import { RoleService } from './../../../core/services/role.service';
import { RoleModel } from './../../../core/models/role.model';

@Component({
  selector: 'app-role-list',
  templateUrl: './role-list.component.html',
  styleUrls: ['./role-list.component.css'],
  providers: [RoleService, UtilsService]
})
export class RoleListComponent implements OnInit, OnDestroy {
  roleListSub: Subscription;
  roleList: RoleModel[];
  deleteSub: Subscription;
  error: boolean;
  message: boolean;
  submitting: boolean;
  constructor(private roleService: RoleService,
    private router: Router,
    public utils: UtilsService) { }

  ngOnInit() {
    this._getroleList();
  }
  private _getroleList() {
    // Get All roleList
    this.roleListSub = this.roleService
      .find()
      .subscribe(
        res => {
          this.roleList = res;
        },
        err => {
          this.error = true;
          console.error(err);
        }
      );
  }
  delete(id) {
    console.log(id);
    this.submitting = true;

    this.deleteSub = this.roleService
      .delete(id)
      .subscribe(
        res => {
          this.submitting = false;
          this.error = false;
          this.message = true;
          this._getroleList();
          console.log(res.message);

          this.router.navigate(['/role/RoleList']);
        },
        err => {
          console.error(err);
          this.submitting = false;
          this.error = true;
        }
      );
  }
  ngOnDestroy() {
    if (this.roleListSub) {
      this.roleListSub.unsubscribe();
    }
  }
}
