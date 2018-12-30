import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {BlockchainService} from '../../api/blockchain.service';
import * as dJSON from 'dirty-json';
import * as _ from 'lodash';
import {constants} from '../../constants';


@Component({
  selector: 'remit-component',
  templateUrl: './remit.component.html',
  styleUrls: ['./remit.component.css']
})
export class RemitComponent implements OnInit {
  public cForm: FormGroup;
  public error = '';
  public status: string;

  public blockchainInfoData: any;
  public tokenBalance: any;
  public currencyStats: any;

  public blockNumber = 0;
  public transactionNumber;
  public code = 'zkoin';
  public authAccount = 'zkoin';
  public authKey = '5JYeqQhGYiQckrGxNBE4ktgiWtWtmDSTeGpBm6zRvU1A2bEKwvj';
  public currency: string;

  constructor(private blockchain: BlockchainService,
              private formBuilder: FormBuilder) {
    this.createForm();
  }

  ngOnInit() {
  }

  public createForm(): void {
    this.cForm = this.formBuilder.group({
      name: ['', Validators.required],
      type: ['', Validators.required],
      code: this.code,
      authAccount: this.authAccount,
      authKey: this.authKey,
      currency: ''
    });
  }

  getCurrencyStats = () => {
    console.log('this.authAccount : ', this.cForm.value.authAccount);
    const data = {
      code: this.cForm.value.code,
      symbol: this.cForm.value.currency
    };
    this.blockchain.getCurrencyStats(data)
      .subscribe(
        stats => {
          console.log('currency: ', stats);
          this.currencyStats = stats.result;
          if (stats) this.status = 'Complete';
          this.error = '';
        },
        error => {
          try {
            console.log('err: ', dJSON.parse(error.error.eosServer).error.what);
            this.error = '\n\r\t' + typeof error !== 'string' ? dJSON.parse(error.error.eosServer).error.what : error;
          } catch (e) {
            this.error = error.error.eosServer.error;
          }
          if (error) this.status = 'Failed';
        }
      );
  }

  public getInfo() {
    console.log('get info');
    this.blockchain.getBlockchainInfo()
      .subscribe(
        info => {
          console.log('currency: ', info);
          this.blockchainInfoData = typeof info.result === 'object'
            ? _.map(info.result, (value, key) => {
              let item = {};
              item[key] = value;
              return item;
            })
            : info.result;
          if (info) this.status = 'Complete';
          this.error = '';
        },
        error => {
          try {
            console.log('err: ', dJSON.parse(error.error.eosServer).error.what);
            this.error = '\n\r\t' + typeof error !== 'string' ? dJSON.parse(error.error.eosServer).error.what : error;
          } catch (e) {
            this.error = error.error.eosServer.error;
          }
          if (error) this.status = 'Failed';
        }
      );
  }

  public getTokenBalance() {
    console.log('get balance');
    const data = {
      code: this.cForm.value.code,
      account: this.cForm.value.authAccount,
      symbol: this.cForm.value.currency
    };
    this.blockchain.getBalance(data)
      .subscribe(
        info => {
          console.log('currency: ', info);
          this.tokenBalance = info.result;
          if (info) this.status = 'Complete';
          this.error = '';
        },
        error => {
          try {
            console.log('err: ', dJSON.parse(error.error.eosServer).error.what);
            this.error = '\n\r\t' + typeof error !== 'string' ? dJSON.parse(error.error.eosServer).error.what : error;
          } catch (e) {
            this.error = error.error.eosServer.error;
          }
          if (error) this.status = 'Failed';
        }
      );
  }

  public getFirstKeyFromObject(data): string {
    return Object.keys(data)[0];
  }

  public getFirstValueFromObject(data): any {
    return data[Object.keys(data)[0]];
  }

}
