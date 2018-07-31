import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/catch';
import 'rxjs/add/observable/throw';
import { ENV } from './../env.config';
import { StudentModel } from './../models/student.model';

@Injectable()
export class StudentService {

    constructor(
        private http: HttpClient) {

    }

    // GET all students
    find(): Observable<StudentModel[]> {
        return this.http
            .post(`${ENV.BASE_API}Student/search`,null)
            .catch(this._handleError);
    }

    // GET Student by ID
    findByPk(id: string): Observable<StudentModel> {
        return this.http
            .get(`${ENV.BASE_API}Student/get/${id}`)
            .catch(this._handleError);
    }

    // Create (POST) new Student
    add(Student: StudentModel): Observable<StudentModel> {
        return this.http
            .post(`${ENV.BASE_API}Student/save`, Student)
            .catch(this._handleError);
    }

    // Edit (PUT) existing Student
    update(Student: StudentModel): Observable<StudentModel> {
        return this.http
            .post(`${ENV.BASE_API}Student/save`, Student)
            .catch(this._handleError);
    }

    // DELETE existing Student
    delete(id: string): Observable<any> {
        return this.http
            .get(`${ENV.BASE_API}Student/delete/${id}`)
            .catch(this._handleError);
    }

    private _handleError(err: HttpErrorResponse | any) {
        const errorMsg = err.message || 'Error: Unable to complete request.';
        return Observable.throw(errorMsg);
    }

}