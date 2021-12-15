import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { Tour } from 'src/app/interfaces/interfaces';
import { ToursService } from 'src/app/services/tours.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit, OnDestroy {

  tours: Tour[] = []
  tSub!: Subscription 
  dSub!: Subscription 
  searchTour: string = ''
  constructor(private tour: ToursService) { }

  ngOnInit(): void {
    this.tSub = this.tour.getAll().subscribe((tours)=>{
      this.tours = tours
    })

  }
  ngOnDestroy(){
    if(this.tSub){
      this.tSub.unsubscribe()
    }
    if(this.dSub){
      this.dSub.unsubscribe()
    }
  }
  remove(id: string){
    this.dSub =this.tour.remove(id).subscribe(()=>{
      this.tours = this.tours.filter(tour=>tour.id !== id)
    })
  }
}
