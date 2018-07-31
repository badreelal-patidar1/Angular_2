import { Component, OnInit } from '@angular/core';
import { UserService } from "../../../core/services/user.service";
import { Subscription } from 'rxjs/Subscription';
import { UtilsService } from "../../../core/utils.service";
import { ActivatedRoute } from '@angular/router';
import { UserModel } from "../../../core/models/user.model";

@Component({
  selector: 'app-user-update',
  templateUrl: './user-update.component.html',
  styleUrls: ['./user-update.component.css'],
  providers: [UserService, UtilsService]
})
export class UserUpdateComponent implements OnInit {
  user: UserModel;
  routeSub: Subscription;
  userSub: Subscription;
  loading: boolean;
  error: boolean;
  tabSub: Subscription;
  tab: string;
  private _id: string;
  constructor(
    private route: ActivatedRoute,
    private userService: UserService,
    public utils: UtilsService) { }

  ngOnInit() {

    // Set user ID from route params and subscribe
    this.routeSub = this.route.params
      .subscribe(params => {
        this._id = params['id'];
        this._getUser();
      });

    // Subscribe to query params to watch for tab changes
    this.tabSub = this.route.queryParams
      .subscribe(queryParams => {
        this.tab = queryParams['tab'] || 'edit';
      });
  }

  private _getUser() {
    this.loading = true;
    // GET user by ID
    this.userSub = this.userService
      .findByPk(this._id)
      .subscribe(
        res => {
          this.user = res;
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
    if (this.userSub) {
      this.userSub.unsubscribe();
    }
  }
}
