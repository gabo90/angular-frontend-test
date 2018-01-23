import { Injectable } from '@angular/core';
import { Api } from '../services/api.endpoints';
import { Http, Headers, RequestOptions, Response } from '@angular/http';
// rx
import { Observable } from 'rxjs/Observable';

import 'rxjs/add/operator/map';
import 'rxjs/add/operator/first';
import 'rxjs/add/operator/catch';

@Injectable()
export class UserService {

  options: RequestOptions;
  constructor (private http: Http) {
      this.options = new RequestOptions({headers: new Headers()});
      this.options.headers.set('Content-Type', 'application/json');
      this.options.headers.set('Authorization', `consumer ${localStorage.authToken}`);
  }

  getUsers ():Observable<Response> {
    return this.http.get(Api.USERS, this.options)
        .map(res => res)
  }

  getUser (id:number):Observable<Response> {
    return this.http.get(`${Api.USERS}/${id}`, this.options)
        .map(res => res)
  }
  
  createUser (user:any):Observable<Response> {
    let params = JSON.stringify({user: user});
    return this.http.post(Api.USERS, params, this.options)
        .map(res => res)
  }
  
  updateUser (id:number, user:any):Observable<Response> {
    let params = JSON.stringify({user: user});
    return this.http.put(`${Api.USERS}/${id}`, params, this.options)
        .map(res => res)
  }
  
  deleteUser (id:number):Observable<Response> {
    return this.http.delete(`${Api.USERS}/${id}`, this.options)
        .map(res => res)
  }
}
