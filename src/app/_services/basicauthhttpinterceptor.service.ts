import { Injectable } from '@angular/core';
import { HttpInterceptor, HttpRequest, HttpHandler } from '@angular/common/http';
@Injectable({
  providedIn: 'root'
})
export class BasicAuthHtppInterceptorService implements HttpInterceptor {
  constructor() { }
  intercept(req: HttpRequest<any>, next: HttpHandler) {
    if (localStorage.getItem('currentUser')) {
      req = req.clone({
        setHeaders: {
          Authorization: localStorage.getItem('currentUser')
        }
      });
    }
    return next.handle(req);
  }
}
