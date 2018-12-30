import {Injectable} from '@angular/core';
import {HttpClient, HttpRequest} from '@angular/common/http';
import {CanActivate, Router} from '@angular/router';
import {Observable} from 'rxjs/Observable';
import {webSocket} from 'rxjs/webSocket';
import {environment} from '../environments/environment';
import {Subject} from "rxjs/Subject";
import {LocalStorageService} from 'ngx-webstorage';


@Injectable({
  providedIn: 'root'
})

export class AuthService {
  public appToken = 'appToken';
  public authToken = 'authToken';
  private socket: any;
  private socketSubscriber;
  public socketStatus = false;
  isLoggedIn; 
  constructor(public router: Router,
              private http: HttpClient,
              private storage: LocalStorageService
  ) {
    const token = this.storage.retrieve('authToken');
    if (token) this.authToken = token;
  }

  logout() {
    console.log('You have been logged out!');
    this.socketStatus = false;
    if (this.socketSubscriber) this.socketSubscriber.unsubscribe()
    this.storage.clear('authToken');
    this.router.navigate(['/login']);
  }

  private showSnakeError(err): void {
    console.log('showSnakeError : ', err);
  }

  public authSocketMessage(message): void {
    console.log('authSocketMessage : ', message);
    if (message && message.token && message.status === 200) {
      this.authToken = message.token;
      this.socketStatus = true;
      this.storage.store('authToken', this.authToken);
    }
  }

  public getAccessToken(): string {
    return this.authToken;
  }

  public getApplicationToken(): string {
    return this.appToken;
  }

  public checkSocket(): boolean {
    // console.log('socketStatus: ', this.socketStatus);
    return this.socketStatus;
  }

  public updateToken(): Observable<any> {
    return Observable.create(observer => {
      if (this.socket) {
        const sub = this.socket
          .subscribe(
            (message) => {
              if (message.token) this.authToken = message.token;
              observer.next(this.authToken);
              sub.unsubscribe();
              observer.complete();
            },
            (err) => {
              // observer.error('socket err: ' + err);
              sub.unsubscribe();
              observer.complete();
            },
            () => {
              // observer.error('socket closing');
              sub.unsubscribe();
              observer.complete();
            }
          )
        this.sendAuthToken();
      } else {
        // observer.error('invalid socket connection');
        observer.complete();
      }
    });
  }

  public start(data) {
    this.initAuthSocket('/users/auth', data);
    this.socket
      ? (
        this.socketSubscriber = this.socket
          .subscribe(
            (message) => this.authSocketMessage(message),
            (err) => this.showSnakeError(err),
            () => this.showSnakeError('Connection lost')
          )
      )
      : setTimeout(() => {
        console.log('Warning: socket on SocketService is undefined!');
      }, 1);
  }

  public initAuthSocket(path: string, data): void {
    let url: any = environment.authUri.split(':');
    url[0] = url[0] === 'http' ? 'ws' : 'wss';
    url = url.join(':');

    let isUsed = false;

    if (!this.isAbsoluteUrl(path)) {
      url = url + path;
    } else {
      url = path + '?EIO=3&transport=websocket&sid=Cej1Kvl65In17l5gAAx1';
      isUsed = true;
    }

    // TODO: sould to change the this.appToken to data.appToken
    if (this.appToken) {
      url = url + (isUsed ? '&' : '?') + 'Application-Token=' + encodeURIComponent(this.appToken);
      isUsed = true;
    }

    if (data.authToken) {
      url = url + (isUsed ? '&' : '?') + 'Authorization=' + encodeURIComponent(this.authToken);
      isUsed = true;
    }

    if (data.name && data.pass) {
      url = url + (isUsed ? '&' : '?') +
        'name=' + encodeURIComponent(data.name) +
        '&pass=' + encodeURIComponent(data.pass);
      isUsed = true;
    }

    console.log('path : ', url);
    this.socket = webSocket(url);
  }

  public sendAuthToken(): void {
    const msg = {
      token: this.authToken
    };
    this.socket.next(msg);
  }

  public onEvent(): Observable<any> {
    return this.socket;
  }

  private isAbsoluteUrl(url: string): boolean {
    const absolutePattern = /^wss?:\/\//i;
    return absolutePattern.test(url);
  }
}


@Injectable()
export class AuthGuard implements CanActivate {
  constructor(
    private _authService: AuthService,
    private _router: Router
  ) {
  }

  canActivate(): Promise<boolean> {
    return new Promise((resolve) => {
      if (this._authService.socketStatus) {
        return resolve(true);
      }
      this._authService.start({authToken: true});
      this._authService.onEvent().subscribe(
        res => {
          return resolve(true);
        },
        err => {
          this._router.navigate(['/login']);
          return resolve(false);
        },
        () => {
          this._router.navigate(['/login']);
          return resolve(false);
        }
      )
    });
  }
}
