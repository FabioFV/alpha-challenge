import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';
import { API_URL } from '../url.constants'
import { SessionService } from '../_services/session.service'

const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private httpOptions: any;

  constructor(private http: HttpClient, private sessionService: SessionService) {
    this.httpOptions = {
      headers: new HttpHeaders({'Content-Type': 'application/json'})
    };
  }

  login(username: string, password: string): Observable<any> {
    return this.http.post(
      API_URL + 'token/',
      {
        username,
        password,
      }
    );
  }

  refreshToken(): Observable<any> {
    return this.http.post(
      API_URL + 'token/refresh/', 
      {refresh: this.sessionService.getRefreshToken()}, 
    this.httpOptions).pipe(
      tap((data: any) => {
        this.sessionService.saveToken(data);
      })
    )
  }

  logout() {
    this.sessionService.removeTokenData();
  }

}
