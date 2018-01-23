import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router'
import { AuthService } from '../../services/authservice.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  privileges: any = {};
  logged:boolean;
  email: string;
  password: string;

  constructor(
    private router:Router,
    private auth:AuthService
  ) { }

  login() {
    let authParams = {
      email: this.email,
      password: this.password
    }

    this.auth.logIn(authParams)
    .subscribe(
      res => {
        let data = res.json().data;
        localStorage.user = data.nombre;
        localStorage.user_type = data.tipo;
        localStorage.privileges = JSON.stringify(data.privilegios);
        localStorage.authToken = data.authToken;
        localStorage.logged = 'true';
        this.logged = true;
        this.privileges = data.privilegios;
        this.router.navigate(['home']);
      },
      err =>
      {
        console.log(err.json());
      }
    )
  }


  ngOnInit() {
    this.logged = localStorage.logged === 'true';

    if(this.logged)
    {
      this.router.navigate(['home']);
    }
  }

}
