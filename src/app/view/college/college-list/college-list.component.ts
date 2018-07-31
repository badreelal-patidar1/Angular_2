import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs/Subscription';
import { Router } from '@angular/router';
import { UtilsService } from './../../../core/utils.service';
import { CollegeService } from './../../../core/services/college.service';
import { CollegeModel } from './../../../core/models/college.model';

@Component({
  selector: 'app-college-list',
  templateUrl: './college-list.component.html',
  styleUrls: ['./college-list.component.css'],
  providers: [CollegeService, UtilsService]
})
export class CollegeListComponent implements OnInit, OnDestroy {
  collegeListSub: Subscription;
  collegeList: CollegeModel[];
  deleteSub: Subscription;
  error: boolean;
  message: boolean;
  submitting: boolean;
  constructor(private collegeService: CollegeService,
    private router: Router,
    public utils: UtilsService) { }

  ngOnInit() {
    this._getCollegeList();
  }
  private _getCollegeList() {
    // Get All collegelist
    this.collegeListSub = this.collegeService
      .find()
      .subscribe(
        res => {
          this.collegeList = res;
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
    // DELETE project by ID
    this.deleteSub = this.collegeService
      .delete(id)
      .subscribe(
        res => {
          this.submitting = false;
          this.error = false;
          this.message = true;
          this._getCollegeList();
          this.router.navigate(['/college/CollegeList']);
        },
        err => {
          console.error(err);
          this.submitting = false;
          this.error = true;
        }
      );
  }
  ngOnDestroy() {
    if (this.collegeListSub) {
      this.collegeListSub.unsubscribe();
    }
    if (this.deleteSub) {
      this.deleteSub.unsubscribe();
    }
  }
}
