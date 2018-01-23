import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../../services/authservice.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
  title = 'Angular APP';
 
  logged: boolean;
  privileges: any = {};

  constructor(
    private auth:AuthService,
    private router:Router
  ){}

  
  ngOnInit() {
    this.logged = localStorage.logged == 'true';
    if(this.logged)
    {
      this.privileges = JSON.parse(localStorage.privileges);
    }
    else
    {
      this.router.navigate(['']);
    }
  }

}