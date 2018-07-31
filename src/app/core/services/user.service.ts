import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/catch';
import 'rxjs/add/observable/throw';
import { ENV } from './../env.config';
import { UserModel } from './../models/user.model';

@Injectable()
export class UserService {

    constructor(
        private http: HttpClient) {

    }

    // GET all user
    find(): Observable<UserModel[]> {
        return this.http
            .post(`${ENV.BASE_API}User/search`,null)
            .catch(this._handleError);
    }

    // GET User by ID
    findByPk(id: string): Observable<UserModel> {
        return this.http
            .get(`${ENV.BASE_API}User/get/${id}`)
            .catch(this._handleError);
    }

    // Create (POST) new User
    add(User: UserModel): Observable<UserModel> {
        return this.http
            .post(`${ENV.BASE_API}User/save`, User)
            .catch(this._handleError);
    }

    // Edit (PUT) existing User
    update(User: UserModel): Observable<UserModel> {
        return this.http
            .post(`${ENV.BASE_API}User/save`, User)
            .catch(this._handleError);
    }

    // DELETE existing User
    delete(id: string): Observable<any> {
        return this.http
            .get(`${ENV.BASE_API}User/delete/${id}`)
            .catch(this._handleError);
    }

    private _handleError(err: HttpErrorResponse | any) {
        const errorMsg = err.message || 'Error: Unable to complete request.';
        return Observable.throw(errorMsg);
    }

}