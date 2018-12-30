import {NgModule} from '@angular/core';
import {HttpClientModule, HTTP_INTERCEPTORS} from '@angular/common/http';

import {AuthService} from '../auth.service';
import {RequestInterceptor} from './request-interseptor';
import {ResponseInterceptor} from './response-interseptor';
import {BlockchainService} from './blockchain.service';
import {SocketService} from './socket.service';


@NgModule({
  imports: [
    HttpClientModule
  ],
  providers: [
    AuthService,
    SocketService,
    BlockchainService,
    {
      provide: HTTP_INTERCEPTORS,
      useClass: RequestInterceptor,
      multi: true
    },
    {
      provide: HTTP_INTERCEPTORS,
      useClass: ResponseInterceptor,
      multi: true
    }
  ]
})
export class APIModule {
}
