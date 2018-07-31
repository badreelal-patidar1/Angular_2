import { Component, OnInit } from '@angular/core';
import { CollegeService } from "../../../core/services/college.service";
import { CollegeModel } from "../../../core/models/college.model";
import { Subscription } from 'rxjs/Subscription';
import { UtilsService } from "../../../core/utils.service";
import { ActivatedRoute } from '@angular/router';
@Component({
  selector: 'app-college-update',
  templateUrl: './college-update.component.html',
  styleUrls: ['./college-update.component.css'],
  providers: [CollegeService, UtilsService]
})
export class CollegeUpdateComponent implements OnInit {
  college: CollegeModel;
  routeSub: Subscription;
  collegeSub: Subscription;
  loading: boolean;
  error: boolean;
  tabSub: Subscription;
  tab: string;
  private _id: string;
  isDelete: string
  constructor(
    private route: ActivatedRoute,
    private collegeService: CollegeService,
    public utils: UtilsService) { }

  ngOnInit() {

    // Set college ID from route params and subscribe
    this.routeSub = this.route.params
      .subscribe(params => {
        this._id = params['id'];
        this._getcollege();
      });

    // Subscribe to query params to watch for tab changes
    this.tabSub = this.route.queryParams
      .subscribe(queryParams => {
        this.tab = queryParams['tab'] || 'edit';
      });
  }

  private _getcollege() {
    this.loading = true;
    // GET college by ID
    this.collegeSub = this.collegeService
      .findByPk(this._id)
      .subscribe(
        res => {
          this.college = res;
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
    if (this.collegeSub) {
      this.collegeSub.unsubscribe();
    }
  }
}
