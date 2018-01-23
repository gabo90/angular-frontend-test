import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router'
import { UserService } from '../../services/users.service';

@Component({
  selector: 'app-user-form',
  templateUrl: './user-form.component.html',
  styleUrls: ['./user-form.component.scss']
})
export class UserFormComponent implements OnInit {
  logged: boolean;
  privileges: any = {};

  canCreate:boolean = false;
  canRead:boolean = false;
  canUpdate:boolean = false;
  canDelete:boolean = false;

  title:string;
  userId:number;

  userTypes:any[] = [
    { id: 'admin', desc: 'Administrador' },
    { id: 'staff', desc: 'Personal' },
    { id: 'customer', desc: 'Cliente' }
  ];

  user:any = {};

  // user:any = {
  //   email: '',
  //   password: '',
  //   nombre: '',
  //   apellidos: '',
  //   user_type: ''
  // };

  constructor(
    private userService:UserService,
    private route:ActivatedRoute,
    private router:Router
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

  upsert(){
    this.userId ? this.updateUser() : this.createUser();
  }

  createUser() {
    this.userService.createUser(this.user)
    .subscribe(
      res => {
        this.router.navigate(['users'])
      },
      err => {
        console.log(err.json())
      })
  }
  
  updateUser() {
    this.userService.updateUser(this.userId, this.user)
    .subscribe(
      res => {
        this.router.navigate(['users'])
      },
      err => {
        console.log(err.json())
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

    this.route.params.subscribe(params => {
      this.userId = params.userId;
      if(this.userId)
      {
        this.title = 'Edición de usuario'
        this.getUser(this.userId)
      }
      else
      {
        this.title = 'Nuevo usuario';
      }
    });
  }

}
