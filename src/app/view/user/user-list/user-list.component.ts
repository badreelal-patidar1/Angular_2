import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs/Subscription';
import { Router } from '@angular/router';
import { UtilsService } from './../../../core/utils.service';
import { UserService } from './../../../core/services/user.service';
import { UserModel } from './../../../core/models/user.model';

@Component({
  selector: 'app-user-list',
  templateUrl: './user-list.component.html',
  styleUrls: ['./user-list.component.css'],
  providers: [UserService, UtilsService]
})
export class UserListComponent implements OnInit {
  userListSub: Subscription;
  userList: UserModel[];
  deleteSub: Subscription;
  error: boolean;
  message: boolean;
  submitting: boolean;
  constructor(private userService: UserService,
    private router: Router,
    public utils: UtilsService) { }

  ngOnInit() {
    this._getuserList();
  }
  private _getuserList() {
    // Get All userList
    this.userListSub = this.userService
      .find()
      .subscribe(
        res => {
          this.userList = res;
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

    this.deleteSub = this.userService
      .delete(id)
      .subscribe(
        res => {
          this.submitting = false;
          this.error = false;
          this.message = true;
          this._getuserList();
          this.router.navigate(['/user/UserList']);
        },
        err => {
          console.error(err);
          this.submitting = false;
          this.error = true;
        }
      );
  }
  
  ngOnDestroy() {
    if (this.userListSub) {
      this.userListSub.unsubscribe();
    }
    if (this.deleteSub) {
      this.deleteSub.unsubscribe();
    }
  }
}
