import { Injectable } from '@angular/core';
import { Api } from '../services/api.endpoints';
import { Http, Headers, RequestOptions, Response } from '@angular/http';
// rx
import { Observable } from 'rxjs/Observable';

import 'rxjs/add/operator/map';
import 'rxjs/add/operator/first';
import 'rxjs/add/operator/catch';

@Injectable()
export class AuthService {

  options;

  constructor(private http: Http) {
    let headers = new Headers({
      'Content-Type': 'application/json'
  });

  this.options = new RequestOptions({headers: headers});
  }

  logIn (authData: any):Observable<Response> {
    let authParams = JSON.stringify(authData);

    return this.http.post(Api.AUTH, authParams, this.options)
        .map(res => res);
  }

  getSession (){
    let session = {};

    session['logged'] = localStorage.logged == 'true';
    this.privileges = JSON.parse(localStorage.privileges);
    this.canCreate = this.privileges.users.indexOf('create') >= 0;
    this.canRead = this.privileges.users.indexOf('read') >= 0;
    this.canUpdate = this.privileges.users.indexOf('update') >= 0;
    this.canDelete = this.privileges.users.indexOf('delete') >= 0;
    this.route.params.subscribe(params => this.getUser(params.userId));
  }
}
