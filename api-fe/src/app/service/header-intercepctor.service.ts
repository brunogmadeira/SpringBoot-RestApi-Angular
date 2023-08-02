import {
  HTTP_INTERCEPTORS,
  HttpErrorResponse,
  HttpEvent,
  HttpHandler,
  HttpInterceptor,
  HttpRequest,
  HttpResponse,
} from '@angular/common/http';
import { Injectable, NgModule } from '@angular/core';
import { Observable, tap } from 'rxjs';
import { throwError } from 'rxjs';
import { catchError } from 'rxjs';

@Injectable()
export class HeaderIntercepctorService implements HttpInterceptor {
  intercept(
    req: HttpRequest<any>,
    next: HttpHandler
  ): Observable<HttpEvent<any>> {
    if (localStorage.getItem('token') !== null) {
      const token = 'Bearer ' + localStorage.getItem('token');
      const tokenRequest = req.clone({
        headers: req.headers.set('Authorization', token),
      });
      return next.handle(tokenRequest).pipe(
        tap((event: HttpEvent<any>) => {
          if (
            event instanceof HttpResponse &&
            (event.status === 200 || event.status === 201)
          ) {
            console.info('Sucesso na operação');
          }
        }),
        catchError(this.processaError)
      );
    } else {
      return next.handle(req);
    }
  }

  constructor() {}

  processaError(error: HttpErrorResponse) {
    let errorMessage = 'erro desconhecido';
    if (error.error instanceof ErrorEvent) {
      console.error(error.error);
      errorMessage = 'error:' + error.error.error;
    } else {
      errorMessage =
        'código: ' + error.error.code + '\nMensagem' + error.error.error;
    }
    window.alert(errorMessage);
    return throwError(errorMessage);
  }
}

@NgModule({
  providers: [
    {
      provide: HTTP_INTERCEPTORS,
      useClass: HeaderIntercepctorService,
      multi: true,
    },
  ],
})
export class HttpInterceptorMoodule {}
