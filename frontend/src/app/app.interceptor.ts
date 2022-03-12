import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor
} from '@angular/common/http';
import { Observable } from 'rxjs';

import { TokenService } from './shared/services/token.service'

@Injectable()
export class AppInterceptor implements HttpInterceptor {

  constructor(private tokenService: TokenService) {}

  intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {
    // TODO: - Append authorization header once
    if (this.tokenService.getToken()) {
      const clone = request.clone({ setHeaders: { Authorization: `Bearer ${this.tokenService.getToken()}` } })
      return next.handle(clone);
    }

    return next.handle(request)
  }
}
