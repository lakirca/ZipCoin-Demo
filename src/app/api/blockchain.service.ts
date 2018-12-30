import {Injectable} from '@angular/core';
import {Observable} from 'rxjs/Observable';
import {HttpClient} from '@angular/common/http';


@Injectable()
export class BlockchainService {
  constructor (private http: HttpClient) {
  }

  public test (url): Observable<any> {
    return this.http.get(url);
  }

  public createAccount (data, url?): Observable<any> {
    return this.http.post(url || `/eosio/create-account/`, data);
  }

  public createAction (data, url?): Observable<any> {
    return this.http.post(url || `/eosio/contract-action`, data);
  }

  public closeOrder (data, orderId, url?): Observable<any> {
    return this.http.put(url || `/orders/${orderId}`, data);
  }

  public getCurrencyStats (data, url?): Observable<any> {
    return this.http.post(url || `/eosio/currency-stats`, data);
  }

  public getBalance (data, url?): Observable<any> {
    return this.http.post(url || `/eosio/token-balance`, data);
  }

  public getBlockchainInfo (): Observable<any> {
    return this.http.get(`/eosio/info`);
  }

  public getKeys (salt): Observable<any> {
    return this.http.get(`/eosio/create-keys/${salt}`);
  }

}
