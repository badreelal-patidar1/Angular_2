import { Component, OnInit } from '@angular/core';
import { Subscription } from 'rxjs/Subscription';
import { UtilsService } from "../../../core/utils.service";
import { ActivatedRoute } from '@angular/router';

import { StudentService } from "../../../core/services/student.service";
import { StudentModel, FormStudentModel } from "../../../core/models/student.model";

@Component({
  selector: 'app-student-update',
  templateUrl: './student-update.component.html',
  styleUrls: ['./student-update.component.css'],
  providers: [StudentService, UtilsService]
})
export class StudentUpdateComponent implements OnInit {
  student: StudentModel;
  routeSub: Subscription;
  studentSub: Subscription;
  formStudentModel: FormStudentModel;
  loading: boolean;
  submitting: boolean;
  error: boolean;
  tabSub: Subscription;
  tab: string;
  private _id: string;
  constructor(
    private route: ActivatedRoute,
    private studentService: StudentService,
    public utils: UtilsService) { }

  ngOnInit() {

    // Set student ID from route params and subscribe
    this.routeSub = this.route.params
      .subscribe(params => {
        this._id = params['id'];
        this._getStudent();
      });

    // Subscribe to query params to watch for tab changes
    this.tabSub = this.route.queryParams
      .subscribe(queryParams => {
        this.tab = queryParams['tab'] || 'edit';
      });
  }

  private _getStudent() {
    this.loading = true;
    // GET student by ID
    this.studentSub = this.studentService
      .findByPk(this._id)
      .subscribe(
        res => {
          this.student = res;
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
    if (this.studentSub) {
      this.studentSub.unsubscribe();
    }
  }
}
