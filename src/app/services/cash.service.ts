import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class CashService {

  constructor(private http: HttpClient) { }
  getcash(){
    return this.http.get('https://bank.gov.ua/NBUStatService/v1/statdirectory/exchange?json')
    // return this.http.get('assets/cash/cash.json')
  }
}
