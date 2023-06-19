import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {Observable} from 'rxjs';
import {User} from '../models/user.model';
import {APIEndpointURLs} from '../../api-endpoint-urls';
import {Stuff} from '../models/stuff.model';
import {AccountService} from '../../account/component/services/account.service';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(private http: HttpClient,
              private auth: AccountService) {}

  public getAllUsers(): Observable<User[]> {
    return this.http.get<User[]>(APIEndpointURLs.allUser);
  }

  public getMyStuff(): Observable<Stuff[]> {
    const headers = new HttpHeaders({
      Authorization: 'Bearer ' + this.auth.getToken()
    });
    return this.http.get<Stuff[]>(APIEndpointURLs.myStuff, {headers});
  }
}
