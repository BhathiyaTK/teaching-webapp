import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators';
import { Router } from '@angular/router';
import { JwtHelperService } from '@auth0/angular-jwt';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  readonly APIUrl = "http://mastery-env.eba-iuubirgw.us-east-2.elasticbeanstalk.com";

  constructor(
    private http: HttpClient,
    private route: Router
    ) { }

  userLogin(credentials:any){
    return this.http.post<any>(this.APIUrl + '/login', credentials).pipe(
      map(response => {
        if (response && response.jwt) {
          localStorage.setItem('learnbuzz_jwt', response.jwt);
          sessionStorage.removeItem('preloader-status');
          return response;
        }
        return false;
      })
    );
  }

  userLogout(){
    let removeToken = localStorage.removeItem('learnbuzz_jwt');
    if (removeToken == null) {
      this.route.navigate(['/']);
    }
  }

  get isUserLoggedIn(): boolean{
    let token = localStorage.getItem('learnbuzz_jwt');
    return (token !== null) ? true : false;
  }

  get currentUser(){
    const token = localStorage.getItem('learnbuzz_jwt');
    if (!token) {
      return null;
    }
    return new JwtHelperService().decodeToken(token);
  }

  getToken(){
    return localStorage.getItem('learnbuzz_jwt');
  }
}
