import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/catch';
import 'rxjs/add/observable/throw';
import { ENV } from './../env.config';
import { MarksheetModel } from './../models/marksheet.model';

@Injectable()
export class MarksheetService {

    constructor(
        private http: HttpClient) {

    }

    // GET all Marksheets
    find(): Observable<MarksheetModel[]> {
        return this.http
            .post(`${ENV.BASE_API}Marksheet/search`,null)
            .catch(this._handleError);
    }

    // GET Marksheet by ID
    findByPk(id: string): Observable<MarksheetModel> {
        return this.http
            .get(`${ENV.BASE_API}Marksheet/get/${id}`)
            .catch(this._handleError);
    }

    // Create (POST) new Marksheet
    add(Marksheet: MarksheetModel): Observable<MarksheetModel> {
        return this.http
            .post(`${ENV.BASE_API}Marksheet/save`, Marksheet)
            .catch(this._handleError);
    }

    // Edit (PUT) existing Marksheet
    update(Marksheet: MarksheetModel): Observable<MarksheetModel> {
        return this.http
            .post(`${ENV.BASE_API}Marksheet/save`, Marksheet)
            .catch(this._handleError);
    }

    // DELETE existing Marksheet
    delete(id: string): Observable<any> {
        return this.http
            .get(`${ENV.BASE_API}Marksheet/delete/${id}`)
            .catch(this._handleError);
    }

    private _handleError(err: HttpErrorResponse | any) {
        const errorMsg = err.message || 'Error: Unable to complete request.';
        return Observable.throw(errorMsg);
    }

}