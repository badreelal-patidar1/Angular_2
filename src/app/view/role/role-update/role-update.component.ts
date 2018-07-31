import { Component, OnInit } from '@angular/core';
import { Subscription } from 'rxjs/Subscription';
import { UtilsService } from "../../../core/utils.service";
import { ActivatedRoute } from '@angular/router';

import { RoleService } from "../../../core/services/role.service";
import { RoleModel } from "../../../core/models/role.model";

@Component({
  selector: 'app-role-update',
  templateUrl: './role-update.component.html',
  styleUrls: ['./role-update.component.css'],
  providers: [RoleService, UtilsService]
})
export class RoleUpdateComponent implements OnInit {
  role: RoleModel;
  routeSub: Subscription;
  roleSub: Subscription;
  loading: boolean;
  error: boolean;
  tabSub: Subscription;
  tab: string;
  private _id: string;
  constructor(
    private route: ActivatedRoute,
    private roleService: RoleService,
    public utils: UtilsService) { }

  ngOnInit() {

    // Set role ID from route params and subscribe
    this.routeSub = this.route.params
      .subscribe(params => {
        this._id = params['id'];
        this._getRole();
      });

    // Subscribe to query params to watch for tab changes
    this.tabSub = this.route.queryParams
      .subscribe(queryParams => {
        this.tab = queryParams['tab'] || 'edit';
      });
  }

  private _getRole() {
    this.loading = true;
    // GET role by ID
    this.roleSub = this.roleService
      .findByPk(this._id)
      .subscribe(
        res => {
          this.role = res;
          console.log(res)
          this.loading = false;
        },
        err => {
          console.error(err);
          this.loading = false;
          this.error = true;
        }
      );
  }

  ngOnDestroy() {
    if (this.routeSub) {
      this.routeSub.unsubscribe();
    }
    if (this.tabSub) {
      this.tabSub.unsubscribe();
    }
    if (this.roleSub) {
      this.roleSub.unsubscribe();
    }
  }
}
