import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, Subject, throwError } from 'rxjs';
import { environment } from 'src/environments/environment';
import { FbResponse } from '../interfaces/interfaces';
import { catchError, map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  public error$: Subject<string> = new Subject<string>()

  constructor(private http: HttpClient) { }

  get token(): any {
    const expDate = new Date(localStorage.getItem('fb-token-exp')!)
    if(new Date() > expDate!){
      this.logOut()
      return null
    }
    return localStorage.getItem('fb-token')
  }

  public logOut():void{
    this.setToken(null)
  }

  isAuthenticated(): boolean {
    return !!this.token
  }

  login(user:any):Observable<any>{
    return this.http.post(`https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=${environment.ApiKey}`,user)
      .pipe(
        map(this.setToken),
        catchError(this.handleError.bind(this))
      )
  }
  
  private handleError(error: HttpErrorResponse){
    const {message} = error.error.error
    switch(message){
      case 'EMAIL_NOT_FOUND':
        this.error$.next('Email не знайдено!')
        break
      case 'INVALID_EMAIL':
        this.error$.next('Некоректний Email!')
        break
      case 'INVALID_PASSWORD':
        this.error$.next('Некоректний пароль!')
        break
    }
     return throwError(error)
  }

  private setToken(response: FbResponse | null){
    if(response){
      const expDate = new Date(new Date().getTime() + +response.expiresIn! * 1000)
      localStorage.setItem('fb-token', response.idToken!)
      localStorage.setItem('fb-token-exp', expDate.toString())
    }else{
      localStorage.clear()
    }
  }
}
