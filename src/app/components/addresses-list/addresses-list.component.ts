import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-addresses-list',
  templateUrl: './addresses-list.component.html',
  styleUrls: ['./addresses-list.component.scss']
})
export class AddressesListComponent implements OnInit {
  logged: boolean;
  privileges: any = {};

  constructor(
    // private auth:AuthService
  ){}

  ngOnInit() {
    this.logged = localStorage.logged == 'true';
    this.privileges = JSON.parse(localStorage.privileges);
  }

}
