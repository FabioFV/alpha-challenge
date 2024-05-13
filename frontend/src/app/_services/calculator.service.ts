import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import { AuthService } from './auth.service';
import { SessionService } from './session.service';
import { Observable } from 'rxjs';
import { API_URL } from '../url.constants'


@Injectable({
  providedIn: 'root'
})
export class CalculatorService {

  constructor(private http: HttpClient, private _sessionService: SessionService) { }
  
  getProducts(): Observable<any> {
    let httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        'Authorization': 'Bearer ' + this._sessionService.getToken()
      })
    };

    return this.http.get(
      API_URL + 'products_short/',
      httpOptions
    );
  }

  calculate(requestData: any): Observable<any> {
    let httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        'Authorization': 'Bearer ' + this._sessionService.getToken()
      })
    };
    
    return this.http.post(
      API_URL + 'calculate/',
      requestData,
      httpOptions
    );
  }
}
