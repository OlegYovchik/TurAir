import { Component, OnInit } from '@angular/core';
import { WeatherService } from '../../services/weather.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  weatherBlocks:any = []

  constructor(private weath: WeatherService) { }

  ngOnInit(): void {
    this.getData()
  }
  getData(){
    this.weath.getWeather1().subscribe(res=>{this.weatherBlocks.push(res)})
    this.weath.getWeather2().subscribe(res=>{this.weatherBlocks.push(res)})
    this.weath.getWeather3().subscribe(res=>{this.weatherBlocks.push(res)})
  }
}
