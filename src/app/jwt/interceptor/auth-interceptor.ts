import { HttpErrorResponse, HttpEvent, HttpHandler, HttpInterceptor, HttpInterceptorFn, HttpRequest } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, Observable, switchMap, throwError } from 'rxjs';
import { Auth } from '../service/auth';


@Injectable({
  providedIn: 'root',
})
export class AuthInterceptor implements HttpInterceptor {

   constructor(private authService: Auth) {}

  intercept(req: HttpRequest<any>,next: HttpHandler): Observable<HttpEvent<any>> {

    const clonedReq = req.clone({
      withCredentials: true
    });

    return next.handle(clonedReq).pipe(

      catchError((error: HttpErrorResponse) => {

        if (error.status === 401 && !req.url.includes('/refresh')) {

          return this.authService
            .refreshToken()
            .pipe(

              switchMap(() => {

                return next.handle(
                  req.clone({
                    withCredentials: true
                  })
                );

              })

            );

        }

        return throwError(
          () => error
        );

      })

    );
  }
}
