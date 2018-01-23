import { Component, Input } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent {
  @Input() logged:boolean;
  @Input() privileges:any;

  constructor(private router:Router) {}

  logOut(){
    localStorage.clear();
    this.router.navigate([''])
  }
}
