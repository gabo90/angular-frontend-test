import { Component, OnInit } from '@angular/core';
import { UserService } from '../../services/users.service';

@Component({
  selector: 'app-users-list',
  templateUrl: './users-list.component.html',
  styleUrls: ['./users-list.component.scss']
})
export class UsersListComponent implements OnInit {
  logged: boolean;
  privileges: any = {};

  canCreate:boolean = false;
  canRead:boolean = false;
  canUpdate:boolean = false;
  canDelete:boolean = false;

  users:any[];

  constructor(
    private userService:UserService
  ){}

  getUsers(){
    this.userService.getUsers()
    .subscribe(
      res =>{
        this.users = res.json().data;
      },
      err => {
        console.log(err.json());
      })
  }

  deleteUser(id:number) {
    this.userService.deleteUser(id)
    .subscribe(
      res => {
        
        let user = this.users.findIndex((item) => {
          return item.id === id;
        })

        user >= 0 ? this.users.splice(user, 1) : console.log("no se encontro el usuario");
      },
      err => {

      }
    )
  }



  ngOnInit() {
    this.logged = localStorage.logged == 'true';
    this.privileges = JSON.parse(localStorage.privileges);
    this.canCreate = this.privileges.users.indexOf('create') >= 0;
    this.canRead = this.privileges.users.indexOf('read') >= 0;
    this.canUpdate = this.privileges.users.indexOf('update') >= 0;
    this.canDelete = this.privileges.users.indexOf('delete') >= 0;
    this.getUsers();
  }

}
