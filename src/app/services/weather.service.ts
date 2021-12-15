import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class WeatherService {
  constructor(private http: HttpClient) {}

  getWeather1(): Observable<any>{
    return this.http.get('http://api.openweathermap.org/data/2.5/weather?units=metric&appid=8bfab08f5522f06f55ad1f7ac130e9ed&lang=ua&q=Kyiv')
    // return this.http.get('assets/Kyiv/weather.json')
  }
  getWeather2(): Observable<any>{
    return this.http.get('http://api.openweathermap.org/data/2.5/weather?units=metric&appid=8bfab08f5522f06f55ad1f7ac130e9ed&lang=ua&q=London')
    // return this.http.get('assets/London/weather.json')
  }
  getWeather3(): Observable<any>{
    return this.http.get('http://api.openweathermap.org/data/2.5/weather?units=metric&appid=8bfab08f5522f06f55ad1f7ac130e9ed&lang=ua&q=Side')
    // return this.http.get('assets/Side/weather.json')
  }
}
