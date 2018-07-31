import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/catch';
import 'rxjs/add/observable/throw';
import { ENV } from './../env.config';
import { CollegeModel } from './../models/college.model';

@Injectable()
export class CollegeService {

    constructor(
        private http: HttpClient) {

    }

    // GET all colleges
    find(): Observable<CollegeModel[]> {
        return this.http
            .post(`${ENV.BASE_API}College/search`,null)
            .catch(this._handleError);
    }

    // GET college by ID
    findByPk(id: string): Observable<CollegeModel> {
        return this.http
            .get(`${ENV.BASE_API}College/get/${id}`)
            .catch(this._handleError);
    }

    // Create (POST) new college
    add(college: CollegeModel): Observable<CollegeModel> {
        return this.http
            .post(`${ENV.BASE_API}College/save`, college)
            .catch(this._handleError);
    }

    // Edit (PUT) existing college
    update(college: CollegeModel): Observable<CollegeModel> {
        return this.http
            .post(`${ENV.BASE_API}College/save`, college)
            .catch(this._handleError);
    }

    // DELETE existing college
    delete(id: string): Observable<any> {
        return this.http
            .get(`${ENV.BASE_API}College/delete/${id}`)
            .catch(this._handleError);
    }

    private _handleError(err: HttpErrorResponse | any) {
        const errorMsg = err.message || 'Error: Unable to complete request.';
        return Observable.throw(errorMsg);
    }

}