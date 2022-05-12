
import { Injectable } from '@angular/core';
import jwt_decode from 'jwt-decode';

@Injectable({
  providedIn: 'root'
})
export class TokenStorageService {

  token_key:string = 'auth-token';
 
  constructor() { }

  signOut(): void {
    window.sessionStorage.clear();
  }

  public saveToken(token: string): void {
    window.sessionStorage.removeItem(this.token_key);
    window.sessionStorage.setItem(this.token_key, token);
  }

  public getToken(): string {
    return sessionStorage.getItem(this.token_key) || '';
  }

  public getUserEmail(): any {
    let jwt_object: any = jwt_decode(sessionStorage.getItem(this.token_key) || '');
    return jwt_object.sub;
  }


}