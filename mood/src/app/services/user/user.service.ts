
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { HOST } from 'config/app.config';
import { Observable, throwError, BehaviorSubject } from 'rxjs';
import { UserForm } from 'src/app/models/in/UserForm';
import { TokenStorageService } from '../auth/token-storage.service';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  private url: string = HOST.apiUrl;
  httpOptions : any;

  constructor(
    private http: HttpClient, 
    private token_storage: TokenStorageService
    ) {}

  getUser(id: Number) : Observable<any> {
    return this.http.get(this.url+'user/'+id);
  }

  getUserByEmail(email: String) : Observable<any> {
    return this.http.get(this.url+'user/byemail/'+ email);
  }

  updateUser(id : number, form : UserForm) : Observable<any> {
    return this.http.post(
      this.url+'user/'+id+'/update', 
      form, 
      {
        observe: 'response', 
        headers: { 'Content-Type':  'application/json', 'Accept': 'text/plain', 'Authorization': 'Bearer '+this.token_storage.getToken()}, 
        responseType: 'text'
      }
    );
  }

}