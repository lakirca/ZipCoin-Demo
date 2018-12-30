import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable()
export class geoip {
  Response: any;
  Country: any;
  constructor(private http: HttpClient) { }

  getUsrIp() {
    this.http.get('https://jsonip.com/').subscribe(
      data => {
        this.Response = data;
        console.log("usr ip ", this.Response);
        this.getCountry();
      }
    );
  }
  getCountry() {
    return this.http.get("http://api.ipstack.com/" + this.Response.ip +"?access_key=d3d51d9d72da587af57fd0c8272328f6").subscribe(
      data => {
        this.Country = data;
        console.log("Country: ", this.Country.country_name, "City:" , this.Country.city);
      }
    );
  }
 }
