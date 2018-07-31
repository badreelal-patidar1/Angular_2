import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs/Subscription';
import { Router } from '@angular/router';
import { UtilsService } from './../../../core/utils.service';
import { StudentService } from './../../../core/services/student.service';
import { StudentModel } from './../../../core/models/student.model';

@Component({
  selector: 'app-student-list',
  templateUrl: './student-list.component.html',
  styleUrls: ['./student-list.component.css'],
  providers: [StudentService, UtilsService]
})
export class StudentListComponent implements OnInit, OnDestroy {
  studentListSub: Subscription;
  studentList: StudentModel[];
  deleteSub: Subscription;
  error: boolean;
  message: boolean;
  submitting: boolean;
  constructor(private studentService: StudentService,
    private router: Router,
    public utils: UtilsService) { }

  ngOnInit() {
    this._getStudentList();
  }
  private _getStudentList() {
    // Get All studentList
    this.studentListSub = this.studentService
      .find()
      .subscribe(
        res => {
          this.studentList = res;
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
    this.deleteSub = this.studentService
      .delete(id)
      .subscribe(
        res => {
          this.submitting = false;
          this.error = false;
          this.message = true;
          this._getStudentList();
          this.router.navigate(['/student/StudentList']);
        },
        err => {
          console.error(err);
          this.submitting = false;
          this.error = true;
        }
      );
  }
  
  ngOnDestroy() {
    if (this.studentListSub) {
      this.studentListSub.unsubscribe();
    }
    if (this.deleteSub) {
      this.deleteSub.unsubscribe();
    }
  }
}
