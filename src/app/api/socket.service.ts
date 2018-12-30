import {Injectable, Injector} from '@angular/core';
import {Observable} from 'rxjs/Observable';
import {environment} from '../../environments/environment';
import {AuthService} from '../auth.service';
import {webSocket} from 'rxjs/webSocket';


@Injectable()
export class SocketService {
  public socket: any;

  private auth;
  private authToken;
  private appToken;

  constructor(private injector: Injector) {
    this.auth = this.injector.get(AuthService);
    this.authToken = this.auth.getAccessToken();
    this.appToken = this.auth.getApplicationToken();
  }

  public init(path: string): void {
    let url: any = environment.apiUri.split(':');
    url[0] = url[0] === 'http' ? 'ws' : 'wss';
    url = url.join(':');

    if (!this.isAbsoluteUrl(path)) {
      url = url + path;
    } else {
      url = path + '?EIO=3&transport=websocket&sid=Cej1Kvl65In17l5gAAx1';
    }

    if (this.appToken) {
      url = url + '?Application-Token=' + this.appToken;
    }
    if (this.authToken) {
      url = url + (this.appToken ? '&' : '?') + 'Authorization=' + this.authToken;
    }

    console.log('path : ', url);
    this.socket = webSocket(url);
  }

  public send(topic, message, sender?): void {
    console.log('send: ', message);
    const msg = {
      message: message,
      topic: topic,
      sender: sender || '',
      authToken: `${this.authToken}`,
      appToken: this.appToken,
    };
    this.socket.next(<any>JSON.stringify(msg));
  }

  public onEvent(event): Observable<any> {
    return this.socket;
  }

  private isAbsoluteUrl(url: string): boolean {
    const absolutePattern = /^wss?:\/\//i;
    return absolutePattern.test(url);
  }
}
