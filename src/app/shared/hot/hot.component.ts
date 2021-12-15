import { Component, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { Tour } from 'src/app/interfaces/interfaces';
import { ToursService } from 'src/app/services/tours.service';

@Component({
  selector: 'app-hot',
  templateUrl: './hot.component.html',
  styleUrls: ['./hot.component.css']
})
export class HotComponent implements OnInit {
  status: number = 0
  tours: Tour[] = []
  toursHot: Tour[] = []
  sortingTours: Tour [] = []
  tSub!: Subscription
  constructor(private tourService: ToursService) { }
  
  ngOnInit(): void {
    this.tSub = this.tourService.getAll().subscribe((tours)=>{
        this.tours = tours.filter(h=>h.status)
    })
  }
  ngOnDestroy(){
    if(this.tSub){
      this.tSub.unsubscribe()
    }
  }
  sorting(field: string){
    this.sortingTours = this.tours
    this.sortingTours.sort(this.byField(field))
  }
  byField(field: any) {
    if(this.status == 1){
      this.status = 0
      return (a: any, b: any) => a[field] > b[field] ? -1 : 1;
    }else{
      this.status = 1
      return (a: any, b: any) => a[field] > b[field] ? 1 : -1;
    }
  }
}
