import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { User } from 'src/app/interfaces/interfaces';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './log-in.component.html',
  styleUrls: ['./log-in.component.css']
})

export class LoginComponent implements OnInit {
  form!: FormGroup
  submitted = false
  response = []
  message = ''
  constructor(public auth: AuthService, private route: Router, private router:ActivatedRoute) { }

  ngOnInit(): void {
    this.router.queryParams.subscribe((param: Params)=>{
      if(param['loginAgain']){
        this.message = 'Будь-ласка зареєструйтесь!!!'
      }else if(param['authFailed']){
        this.message = 'Сесія вичерпалась. Будь-ласка зареєструйтесь по-новому!!!'
      }
    })

    if(this.auth.isAuthenticated()){
      this.route.navigate(['/admin','dashboard'])
    }else{
      this.route.navigate(['/admin','login'])
    }
    this.form = new FormGroup({
      login: new FormControl('',[
        Validators.required,
        Validators.minLength(5)
      ]),
      password: new FormControl('',[
        Validators.required,
        Validators.minLength(5)
      ])
    })
  }
  submit(){ 
    if(this.form.valid){
      const user: User = {
        email: this.form.value.login,
        password: this.form.value.password,
        returnSecureToken: true
      }
      this.auth.login(user).subscribe(res => {
        this.form.reset()
        this.route.navigate(['admin','dashboard'])
      },()=>{
        this.submitted = false
      })
    }
    this.submitted = true  
  }
}
