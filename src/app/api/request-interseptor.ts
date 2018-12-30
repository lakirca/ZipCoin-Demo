import {Injectable, Injector} from '@angular/core';
import {HttpEvent, HttpInterceptor, HttpHandler, HttpRequest} from '@angular/common/http';
import {Observable} from 'rxjs/Observable';

import {environment} from '../../environments/environment';
import {AuthService} from '../auth.service';
import 'rxjs/add/operator/mergeMap';


@Injectable()
export class RequestInterceptor implements HttpInterceptor {
  constructor(private injector: Injector) {
  }

  intercept(req: HttpRequest<any>, next: any): Observable<any> {
    // console.log('http intercept start...');
    const auth = this.injector.get(AuthService);
    if (auth.checkSocket()) {
      return auth.updateToken()
        .mergeMap((token) => {
          const authToken = token;
          const appToken = auth.getApplicationToken();

          let requestToApi = true;

          if (this.isAbsoluteUrl(req.url)) {
            requestToApi = req.url.startsWith(environment.apiUri);
          }

          if (requestToApi) {
            const extraHeaders = {
              Authorization: authToken,
            };
            if (appToken) {
              extraHeaders['Application-Token'] = appToken;
            }
            // Clone the request to add Authorization.
            req = req.clone({
              url: this.prepareUrl(req.url),
              setHeaders: extraHeaders
            });
          }
          return next.handle(req);
        });
    } else {
      console.log('RequestInterceptor socket disconnected: ', auth.checkSocket());
      return next.handle(req);
    }
  }

  private isAbsoluteUrl(url: string): boolean {
    const absolutePattern = /^https?:\/\//i;
    return absolutePattern.test(url);
  }

  private prepareUrl(url: string): string {
    url = this.isAbsoluteUrl(url) ? url : `${environment.apiUri}/${url}`;
    return url.replace(/([^:]\/)\/+/g, '$1');
  }
}
