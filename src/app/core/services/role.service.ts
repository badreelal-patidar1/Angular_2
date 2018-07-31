import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/catch';
import 'rxjs/add/observable/throw';
import { ENV } from './../env.config';
import { RoleModel } from './../models/role.model';

@Injectable()
export class RoleService {

    constructor(
        private http: HttpClient) {

    }

    // GET all Roles
    find(): Observable<RoleModel[]> {
        return this.http
            .post(`${ENV.BASE_API}Role/search`,null)
            .catch(this._handleError);
    }

    // GET Role by ID
    findByPk(id: string): Observable<RoleModel> {
        return this.http
            .get(`${ENV.BASE_API}Role/get/${id}`)
            .catch(this._handleError);
    }

    // Create (POST) new Role
    add(Role: RoleModel): Observable<RoleModel> {
        return this.http
            .post(`${ENV.BASE_API}Role/save`, Role)
            .catch(this._handleError);
    }

    // Edit (PUT) existing Role
    update(Role: RoleModel): Observable<RoleModel> {
        return this.http
            .post(`${ENV.BASE_API}Role/save`, Role)
            .catch(this._handleError);
    }

    // DELETE existing Role
    delete(id: string): Observable<any> {
        return this.http
            .get(`${ENV.BASE_API}Role/delete/${id}`)
            .catch(this._handleError);
    }

    private _handleError(err: HttpErrorResponse | any) {
        const errorMsg = err.message || 'Error: Unable to complete request.';
        return Observable.throw(errorMsg);
    }

}