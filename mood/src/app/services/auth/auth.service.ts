import { HttpClient, HttpHeaders, HttpClientModule, HttpResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { HOST } from 'config/app.config';
import { BehaviorSubject, catchError, Observable, takeUntil } from 'rxjs';
import { Globals } from 'src/app/global';
import { AuthenticateUser } from 'src/app/models/in/AuthenticateUser';
import { UserDetails } from 'src/app/models/out/UserDetails';
import { BaseComponent } from 'src/app/_shared/core/base.components';
import { UserService } from '../user/user.service';
import { TokenStorageService } from './token-storage.service';

@Injectable({
  providedIn: 'root'
})
export class AuthService extends BaseComponent {
  loggedIn = new BehaviorSubject<boolean>(false);
  userNotFound = new BehaviorSubject<boolean>(false);

  

  
  private url: string = HOST.apiUrl;
 

  constructor(
    private http : HttpClient,
    private tokenService: TokenStorageService,
    private userService: UserService, 
    private _global: Globals
    ) {
    super();
   }

   register(data: any): Observable<any> {
    return this.http.post(this.url+'authentication/register', JSON.stringify(data), {observe: 'response', headers: {'Content-Type':  'application/json'}});
  }


  login(data: AuthenticateUser): void{
    if(!!data){
      console.log(this.url);
      console.log(data);

      this.userNotFound.next(false);
      this.loggedIn.next(false);
      this.http.post(this.url+'authentication/login', data, {observe: 'response', headers: { 'Content-Type':  'application/json', 'Accept': 'text/plain'}, responseType: 'text'})
      .pipe(catchError(async (err) => console.error('login error', err)))
      .subscribe((res: any) => {
        //console.log(res.body);

        let token = res.body;
        
        this.tokenService.saveToken(token);

        this.loggedIn.next(true);

        this.getUser(); 
        
        (error: { status: number; }) => {
          if (error.status === 401) {
            this.userNotFound.next(true);
            this.loggedIn.next(false);
          } else {
            this.loggedIn.next(true);
          }
        }
        
     });
    }
  }

  public getUser(): any {
    this.userService.getUserByEmail(this.tokenService.getUserEmail())
    .pipe(takeUntil(this.ngUnsubscribe))
    .subscribe( data => {
      this.setGlobalUser(data.id)

    })
  }

  public getRole(): any {
    this.userService.getUserByEmail(this.tokenService.getUserEmail())
    .pipe(takeUntil(this.ngUnsubscribe))
    .subscribe( data => {

      return data.role;

    })
  }

  setGlobalUser(id: Number) {
    this.userService.getUser(id).subscribe(
      (rest: UserDetails) => {
        const globalUser = new UserDetails;
        globalUser.birthDate = rest.birthDate;
        globalUser.category = rest.category;
        globalUser.email = rest.email;
        globalUser.firstname = rest.firstname;
        globalUser.name = rest.name;
        globalUser.phone = rest.phone;
        globalUser.role = rest.role;
        // GROUPS
        globalUser.groups = rest.groups;
        // LOCALISATION
        globalUser.localisation = rest.localisation;

        this._global.user = globalUser;

      }
    );
  }
  
  /**
   * Logout the user
   */
   logout(): void {
    // console.log('logout click')
    try{
      this.loggedIn.next(false);
      this.tokenService.signOut();

    } catch (err) {
       console.log(err);
    }

  }

  getUserNotFoundSubject(): Observable<boolean> {
    return this.userNotFound.asObservable();
  }

}