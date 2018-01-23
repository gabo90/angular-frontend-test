import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LoginComponent } from './components/login/login.component'
import { HomeComponent } from './components/home/home.component'
import { UsersListComponent } from './components/users-list/users-list.component'
import { UserDetailsComponent } from './components/user-details/user-details.component'
import { UserFormComponent } from './components/user-form/user-form.component'
import { AddressesListComponent } from './components/addresses-list/addresses-list.component'

const ROUTES: Routes = [
  { path: '', component: LoginComponent },
  { path: 'home', component: HomeComponent },
  { path: 'users', component: UsersListComponent },
  { path: 'users/new', component: UserFormComponent },
  { 
    path: 'users/:userId',
    component: UserDetailsComponent,
    children: [
      { 
        path: 'addresses/:addressId',
        component: AddressesListComponent,
        children: [
          { path: 'address_details', component: AddressesListComponent }
        ]
      }
    ]
  },
  { path: 'users/:userId/edit', component: UserFormComponent },
  { path: 'addresses', component: AddressesListComponent },
  { path: '**', pathMatch: 'full', redirectTo: '' }
];

export const APP_ROUTING = RouterModule.forRoot(ROUTES);