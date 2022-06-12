import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { AuthService } from '../AUTH/auth.service';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  BASE_URL = 'http://127.0.0.1:8000'

  token = localStorage.getItem('currentUser')
  header = new HttpHeaders({"Authorization": "Bearer " + this.token,"Content-Type": "application/json"})
  formHeader = new HttpHeaders({"Authorization": "Bearer " + this.token})
  
  user = new Subject<any[]>()
  params = new URLSearchParams();

  constructor(private http:HttpClient, private authService:AuthService) { 
  }
  
  presentUser():Observable<any>{
    return this.http.get(this.BASE_URL+'/user/pu/',{headers:this.header})
  }
  
  onboadUserDetails(data:any):Observable<any>{
    return this.http.post(this.BASE_URL+'/user/add-user/', data, {headers:this.formHeader})
  }

  listUser():Observable<any>{
    return this.http.get(this.BASE_URL+'/user/list-user/',{headers:this.header})
  }

  updateUser(data:any):Observable<any>{
    return this.http.put(this.BASE_URL+'/user/update-user/', data, {headers:this.formHeader})
  }

  fetchUserDetails(user:any):Observable<any>{
    this.params.append('username',user)
    return this.http.get(this.BASE_URL+'/user/user-details/'+user+'/',{headers:this.header})
  }

}
