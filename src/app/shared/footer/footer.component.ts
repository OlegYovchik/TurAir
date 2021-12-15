import { Component, OnInit } from '@angular/core';
import { CashService } from '../../services/cash.service';

@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.css']
})
export class FooterComponent implements OnInit {
  arr: any = []
  arrCash: any = []
  constructor(private cash: CashService) { }

  ngOnInit(): void {
    this.cash.getcash().subscribe(res=>{
      this.arr = res
      this.arrCash = this.arr.filter((x:any)=>x.cc == "RUB" || x.cc == "EUR" || x.cc == "USD")
    })
  }
}
