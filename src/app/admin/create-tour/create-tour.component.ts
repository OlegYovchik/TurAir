import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Tour } from 'src/app/interfaces/interfaces';
import { ToursService } from 'src/app/services/tours.service';

@Component({
  selector: 'app-create-tour',
  templateUrl: './create-tour.component.html',
  styleUrls: ['./create-tour.component.css']
})
export class CreateTourComponent implements OnInit {
  formTour!: FormGroup

  constructor(private tourCreate: ToursService, private router: Router) { }

  ngOnInit(): void {
    this.formTour = new FormGroup({
      hotel: new FormControl('', Validators.required),
      country: new FormControl('', Validators.required),
      title: new FormControl('', Validators.required),
      date: new FormControl('', Validators.required),
      price: new FormControl('', Validators.required),
      status: new FormControl('')
    })
  }
  returnDash(){
    this.router.navigate(['/admin','dashboard'])
  }
  submit(){
    if(this.formTour.invalid){
      return
    }
    const tour: Tour = {
      hotel: this.formTour.value.hotel,
      country: this.formTour.value.country,
      title: this.formTour.value.title,
      date: this.formTour.value.date,
      price: this.formTour.value.price,
      status: this.formTour.value.status
    }
    this.tourCreate.create(tour).subscribe(()=>{
      this.formTour.reset()
    })
  }
}
