import { Injectable } from '@angular/core';

const TOKEN_KEY = 'TOKEN';
const REFRESH_KEY = 'REFRESH';

@Injectable({
  providedIn: 'root'
})
export class SessionService {

  constructor() { }

  saveTokenData(tokenData: any) {
    window.sessionStorage.setItem(TOKEN_KEY, tokenData['access']);
    window.sessionStorage.setItem(REFRESH_KEY, tokenData['refresh']);
  }

  saveToken(tokenData: any) {
    window.sessionStorage.removeItem(TOKEN_KEY);
    window.sessionStorage.setItem(TOKEN_KEY, tokenData['access']);
  }


  removeTokenData() {
    window.sessionStorage.removeItem(TOKEN_KEY);
    window.sessionStorage.removeItem(REFRESH_KEY);
  }

  getToken(): any {
    const token = window.sessionStorage.getItem(TOKEN_KEY);
    if (token) {
      return token;
    }
    return {};
  }

  getRefreshToken(): any {
    const refreshToken = window.sessionStorage.getItem(REFRESH_KEY);
    if (refreshToken) {
      return refreshToken;
    }
    return {};
  }

  isLoggedIn(): boolean {
    const token = window.sessionStorage.getItem(TOKEN_KEY);
    if (token) {
      return true;
    }

    return false;
  }
}
