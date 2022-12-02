import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor,
  HttpErrorResponse
} from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { SecurityService } from '../sevices/security.service';
import { Router } from '@angular/router';
import { catchError } from 'rxjs/operators';

@Injectable()
export class TokenInterceptor implements HttpInterceptor {

  constructor(private securityService: SecurityService,
              private router: Router) {}

  intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<any>> {
    // Request: From Angular to ApiGateway

    let currentSession = this.securityService.userCurrentSession;

    if(currentSession){
      request = request.clone({
        setHeaders:{
          Authorization: `Bearer ${currentSession.token}`
        }
      });
    }
    // Process response: from API Gateway to Angular
    return next.handle(request).pipe(
      catchError((err: HttpErrorResponse) => {
        if(err.status == 401){
          this.router.navigateByUrl('/pages/dashboard');
        }
        return throwError(err);
      })
    );
  }
}
