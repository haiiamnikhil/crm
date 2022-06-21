import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  BASE_URL = 'http://127.0.0.1:8000'

  userToken = localStorage.getItem('currentUser')
  header = new HttpHeaders({"Authorization": "Bearer " + this.userToken,"Content-Type": "application/json"})
  formHeader = new HttpHeaders({"Authorization": "Bearer " + this.userToken})

  public token: any
  public username: any
  public token_expires: any

  constructor(private http: HttpClient) {
  }

  updateData(token: any) {
    this.token = token;

    const token_parts = this.token.split(/\./);
    const token_decoded = JSON.parse(window.atob(token_parts[1]));

    this.token_expires = new Date(token_decoded.exp * 1000);
    this.username = token_decoded.used_id;

    localStorage.setItem("currentUser", token)

  }

  removeToken(){
    localStorage.removeItem("currentUser")
  }

  registerUser(data: any): Observable<any> {
    return this.http.post(this.BASE_URL+'/auth/user/register/', data)
  }

  loginUser(data: any): Observable<any> {
    return this.http.post(this.BASE_URL+'/auth/api/token-auth/', data)
  }

  updatePassword(data:any){
    return this.http.post(this.BASE_URL+'/auth/user/change-password/',data, {headers:this.formHeader})
  }

  logoutUser():Observable<any>{
    return this.http.post(this.BASE_URL+'/auth/user/logout/',{headers:this.header})
  }
}
