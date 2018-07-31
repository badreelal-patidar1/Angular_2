import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs/Subscription';
import { Router } from '@angular/router';

import { UtilsService } from './../../../core/utils.service';
import { MarksheetService } from './../../../core/services/marksheet.service';
import { MarksheetModel } from './../../../core/models/marksheet.model';

@Component({
  selector: 'app-marksheet-list',
  templateUrl: './marksheet-list.component.html',
  styleUrls: ['./marksheet-list.component.css'],
  providers: [MarksheetService, UtilsService]
})
export class MarksheetListComponent implements OnInit, OnDestroy {

  marksheetListSub: Subscription;
  marksheetList: MarksheetModel[];
  deleteSub: Subscription;
  error: boolean;
  message: boolean;
  submitting: boolean;
  constructor(private marksheetService: MarksheetService,
    private router: Router,
    public utils: UtilsService) { }

  ngOnInit() {
    this._getMarksheetList();
  }
  private _getMarksheetList() {
    // Get All marksheetlist
    this.marksheetListSub = this.marksheetService
      .find()
      .subscribe(
        res => {
          this.marksheetList = res;
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
    // DELETE marksheet by ID
    this.deleteSub = this.marksheetService
      .delete(id)
      .subscribe(
        res => {
          this.submitting = false;
          this.error = false;
          this.message = true;
          this._getMarksheetList();
          this.router.navigate(['/marksheet/MarksheetList']);
        },
        err => {
          console.error(err);
          this.submitting = false;
          this.error = true;
        }
      );
  }
  ngOnDestroy() {
    if (this.marksheetListSub) {
      this.marksheetListSub.unsubscribe();
    }
    if (this.deleteSub) {
      this.deleteSub.unsubscribe();
    }
  }
}
