import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class EntitlementsService {

  BASE_URL = 'http://127.0.0.1:8000'

  token = localStorage.getItem('currentUser')
  header = new HttpHeaders({"Authorization": "Bearer " + this.token,"Content-Type": "application/json"})
  formHeader = new HttpHeaders({"Authorization": "Bearer " + this.token})

  constructor(private http:HttpClient) { }

  hasPermission():Observable<any>{
    return this.http.get(this.BASE_URL+'/entitlements/aoth/user/',{headers:this.header})
  }

  getUserEntitlements():Observable<any>{
    return this.http.get(this.BASE_URL+'/entitlements/user/entitlemets/',{headers:this.header})
  
  }

  setUserEntitlements(data:any):Observable<any>{
    return this.http.post(this.BASE_URL+'/entitlements/user/entitlemets/',data,{headers:this.formHeader})
  }

  getUserRoleEntitlements():Observable<any>{
    return this.http.get(this.BASE_URL+'/entitlements/user/role-entitlemets/',{headers:this.formHeader})
  }
  
  updateUserRoleEntitlements(data:any):Observable<any>{
    return this.http.put(this.BASE_URL+'/entitlements/user/update-entitlemets/', data, {headers:this.formHeader})
  }
}
