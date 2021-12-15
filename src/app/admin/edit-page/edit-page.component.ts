import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { switchMap } from 'rxjs/operators';
import { Tour } from 'src/app/interfaces/interfaces';
import { ToursService } from 'src/app/services/tours.service';

@Component({
  selector: 'app-edit-page',
  templateUrl: './edit-page.component.html',
  styleUrls: ['./edit-page.component.css']
})
export class EditPageComponent implements OnInit, OnDestroy {
  form!: FormGroup
  tourEdit!: Tour
  submitted = false
  uSub!: Subscription

  constructor(private router: Router, private route: ActivatedRoute, private tour: ToursService) { }

  ngOnInit(): void {
    this.route.params.pipe(
      switchMap((params: Params)=>{
        return this.tour.getById(params['id'])
        })
    ).subscribe((tour:Tour)=>{
      this.tourEdit = tour
      this.form = new FormGroup({
        country: new FormControl(tour.country, Validators.required),
        hotel: new FormControl(tour.hotel, Validators.required),
        title: new FormControl(tour.title, Validators.required),
        date: new FormControl(tour.date, Validators.required),
        price: new FormControl(tour.price, Validators.required),
        status: new FormControl(tour.status)
      })
    })
   }
   ngOnDestroy():void{
    if(this.uSub){
      this.uSub.unsubscribe()
    }
   }
  submit(){
    if(this.form.invalid){
      return
    }
    this.submitted = true

    this.uSub = this.tour.update({
      ...this.tourEdit,
      country: this.form.value.country,
      hotel: this.form.value.hotel,
      title: this.form.value.title,
      date: this.form.value.date,
      price: this.form.value.price,
      status: this.form.value.status
    }).subscribe(()=>{
        this.submitted = false
        this.router.navigate(['/admin','dashboard'])
    })
  }
  returnDash(){
    this.router.navigate(['/admin','dashboard'])
  }
}
