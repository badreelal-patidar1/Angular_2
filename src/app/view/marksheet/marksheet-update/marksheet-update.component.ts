import { Component, OnInit } from '@angular/core';
import { MarksheetService } from "../../../core/services/marksheet.service";
import { MarksheetModel } from "../../../core/models/marksheet.model";
import { Subscription } from 'rxjs/Subscription';
import { UtilsService } from "../../../core/utils.service";
import { ActivatedRoute } from '@angular/router';
@Component({
  selector: 'app-marksheet-update',
  templateUrl: './marksheet-update.component.html',
  styleUrls: ['./marksheet-update.component.css'],
  providers: [MarksheetService, UtilsService]
})
export class MarksheetUpdateComponent implements OnInit {
  marksheet: MarksheetModel;
  routeSub: Subscription;
  marksheetSub: Subscription;
  loading: boolean;
  error: boolean;
  tabSub: Subscription;
  tab: string;
  private _id: string;
  isDelete: string
  constructor(
    private route: ActivatedRoute,
    private marksheetService: MarksheetService,
    public utils: UtilsService) { }

  ngOnInit() {

    // Set marksheet ID from route params and subscribe
    this.routeSub = this.route.params
      .subscribe(params => {
        this._id = params['id'];
        this._getMarksheet();
      });

    // Subscribe to query params to watch for tab changes
    this.tabSub = this.route.queryParams
      .subscribe(queryParams => {
        this.tab = queryParams['tab'] || 'edit';
      });
  }

  private _getMarksheet() {
    this.loading = true;
    // GET marksheet by ID
    this.marksheetSub = this.marksheetService
      .findByPk(this._id)
      .subscribe(
        res => {
          this.marksheet = res;
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
    if (this.marksheetSub) {
      this.marksheetSub.unsubscribe();
    }
  }
}
