import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { Tour } from 'src/app/interfaces/interfaces';
import { ToursService } from 'src/app/services/tours.service';


@Component({
  selector: 'app-prices',
  templateUrl: './prices.component.html',
  styleUrls: ['./prices.component.css']
})
export class PricesComponent implements OnInit {
  search:boolean = false
  form!:FormGroup
  tours: Tour [] = []
  toursSelect: Tour [] = []
  countriesArr: any = []
  errorSearch: string = ''

  constructor(private tourServ: ToursService){}

  ngOnInit(){
    this.tourServ.getAll().subscribe((res)=>{
      this.tours = res
      this.countriesArr = this.tours.map(x=>x.country).filter(function (e, i, arr) {
        return arr.lastIndexOf(e) === i;
      })
    })
    this.form = new FormGroup({
      country: new FormControl(''),
      dateIn: new FormControl(''),
    })
  }
  submit(){
    this.search = true
    this.errorSearch = ''
    if(!this.form.value.country && !this.form.value.dateIn){
      this.errorSearch = 'Будь-ласка, виберіть хоча б один критерій для пошуку!'
    }else if(this.form.value.country && this.form.value.dateIn){
      this.toursSelect = this.tours.filter(res=>res.country === this.form.value.country)
      this.toursSelect = this.toursSelect.filter(res=>res.date >= new Date(this.form.value.dateIn))
      if(this.toursSelect.length == 0){
        this.errorSearch = 'На жаль, по заданим критеріям нічого не знайдено!'
      }
    }else if(this.form.value.country){
      this.toursSelect = this.tours.filter(res=>res.country === this.form.value.country)
      if(this.toursSelect.length == 0){
        this.errorSearch = 'На жаль, по заданим критеріям нічого не знайдено!'
      }
    }else if(this.form.value.dateIn){
      this.toursSelect = this.tours.filter(res=>res.date >= new Date(this.form.value.dateIn))
      if(this.toursSelect.length == 0){
        this.errorSearch = 'На жаль, по заданим критеріям нічого не знайдено!'
      }
    }
  }
  back(){
    this.search = false
    this.toursSelect = []
  }
}