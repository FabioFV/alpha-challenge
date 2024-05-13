import { Injectable } from '@angular/core';
import { Observable, throwError  } from 'rxjs';
import { catchError, switchMap } from 'rxjs/operators';
import { HttpEvent, HttpInterceptor, HttpHandler, HttpRequest, HTTP_INTERCEPTORS, HttpErrorResponse } from '@angular/common/http';
import { AuthService } from '../_services/auth.service'

@Injectable()
export class HttpRequestInterceptor implements HttpInterceptor {
  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    req = req.clone({
      withCredentials: true,
    });

    return next.handle(req);
  }
}

export const httpInterceptorProviders = [
  { provide: HTTP_INTERCEPTORS, useClass: HttpRequestInterceptor, multi: true },
];

@Injectable()
export class TokenInterceptor implements HttpInterceptor {

  constructor(private authService: AuthService) {}

  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    return next.handle(request).pipe(
      catchError((error: HttpErrorResponse) => {
        if (error.status === 401 || error.status === 403) {
          return this.handle400Error(request, next);
        }
        return throwError(error);
      })
    );
  }

  private handle400Error(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    return this.authService.refreshToken().pipe(
      switchMap((response) => {
        const authRequest = request.clone({
          setHeaders: {
            Authorization: `Bearer ${response.access}`
          }
        });
        return next.handle(authRequest);
      }),
      catchError((err) => {
        this.authService.logout(); // Handle refresh token failure
        return throwError(err);
      })
    );
  }
}