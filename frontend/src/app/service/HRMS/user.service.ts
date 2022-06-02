import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  BASE_URL = 'http://127.0.0.1:8000/'
  header = new HttpHeaders({'Content-Type': 'application/json'})

  constructor(private http:HttpClient) { }

  onboadUserDetails(data:any):Observable<any>{
    return this.http.post(this.BASE_URL+'user/add-user/', data)
  }

  listUsers():Observable<any>{
    return this.http.get(this.BASE_URL+'user/list-users/',{headers:this.header})
  }

}
