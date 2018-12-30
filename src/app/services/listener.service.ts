import {Injectable} from '@angular/core';
import {SocketService} from '../api/socket.service';

@Injectable({
  providedIn: 'root'
})
export class ListenerService {
 
  constructor (public socketService: SocketService) {
  }

  public connection (path, messageCB?, errorCB?, closeCB?) {
    const id = '1';
    this.socketService.init(path);
    console.log('socket : ', this.socketService.socket);
    this.socketService.socket 
      ? this.socketService.socket
        .subscribe(
          (message) => messageCB && typeof messageCB === "function" ? messageCB(message) : this.gettingSocketMessage(message),
          (err) => errorCB && typeof errorCB === "function" ? errorCB(err) : this.gettingSocketError(err),
          () => closeCB && typeof closeCB === "function" ? closeCB() : this.gettingSocketClose()
        )
      : setTimeout(() => {
        console.log('Warning: socket on SocketService is undefined!');
      }, 1);
  }

  public gettingSocketMessage (message): void {
    console.log('socket message: ', message);
  }

  public gettingSocketError (err): void {
    console.log('socket error: ', err);
  }

  public gettingSocketClose (): void {
    console.log('socket closed');
  }
}
