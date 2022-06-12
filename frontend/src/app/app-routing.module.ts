import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthenticationGuard } from './Guards/authentication.guard';
import { LoginComponent } from './main/AUTH/user/login/login.component';
import { RegisterComponent } from './main/AUTH/user/register/register.component';
import { CreateComponent } from './main/HRMS/user/create/create.component';
import { EditComponent } from './main/HRMS/user/edit/edit.component';
import { ListComponent } from './main/HRMS/user/list/list.component';
import { ProfileComponent } from './main/HRMS/user/profile/profile.component';

const routes: Routes = [

  // User
  {path:'user/add-user',component:CreateComponent, canActivate:[AuthenticationGuard]},
  {path:'user/list-user',component:ListComponent, canActivate:[AuthenticationGuard]},
  {path:'user/list-user',component:ListComponent, canActivate:[AuthenticationGuard]},

  {path:'user/edit-user/:uid',component:EditComponent, canActivate:[AuthenticationGuard]},
  {path:'user/profile/:uid',component:ProfileComponent, canActivate:[AuthenticationGuard]},

  // Auth
  {path:'auth/user/register',component:RegisterComponent},
  {path:'auth/user/login',component:LoginComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
