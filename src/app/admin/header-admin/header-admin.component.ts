import { Component, OnInit } from '@angular/core';
import { Event, Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-header-admin',
  templateUrl: './header-admin.component.html',
  styleUrls: ['./header-admin.component.css']
})
export class HeaderAdminComponent implements OnInit {
  acti!: boolean
  constructor(private aut: AuthService, private router: Router) { }

  ngOnInit(): void {
    this.acti = this.aut.isAuthenticated()
  }
  logout(event: any){
    event.preventDefault()
    this.aut.logOut()
    this.router.navigate(['/admin','login'])
  }
}
