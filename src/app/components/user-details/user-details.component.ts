import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router'
import { UserService } from '../../services/users.service';

@Component({
  selector: 'app-user-details',
  templateUrl: './user-details.component.html',
  styleUrls: ['./user-details.component.scss']
})
export class UserDetailsComponent implements OnInit {
  logged: boolean;
  privileges: any = {};

  canCreate:boolean = false;
  canRead:boolean = false;
  canUpdate:boolean = false;
  canDelete:boolean = false;

  user:any = {};

  constructor(
    private userService:UserService,
    private router:Router,
    private route:ActivatedRoute
  ) { 
  }

  getUser(id:number){
    this.userService.getUser(id)
    .subscribe(
      res =>{
        this.user = res.json().data;
      },
      err => {
        console.log(err.json());
      })
  }

  ngOnInit() {
    this.logged = localStorage.logged == 'true';
    if(this.logged)
    {
      this.logged = localStorage.logged == 'true';
      this.privileges = JSON.parse(localStorage.privileges);
      this.canCreate = this.privileges.users.indexOf('create') >= 0;
      this.canRead = this.privileges.users.indexOf('read') >= 0;
      this.canUpdate = this.privileges.users.indexOf('update') >= 0;
      this.canDelete = this.privileges.users.indexOf('delete') >= 0;
      this.route.params.subscribe(params => this.getUser(params.userId));
    }
    else
    {
      this.router.navigate(['']);
    }
  }
}
