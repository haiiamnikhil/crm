import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthenticationGuard } from './Guards/authentication.guard';
import { LoginComponent } from './main/AUTH/user/login/login.component';
import { RegisterComponent } from './main/AUTH/user/register/register.component';
import { CreateComponent } from './main/HRMS/user/create/create.component';
import { EditComponent } from './main/HRMS/user/edit/edit.component';
import { GlobalentitlementsComponent } from './main/HRMS/user/globalentitlements/globalentitlements.component';
import { ListComponent } from './main/HRMS/user/list/list.component';
import { ListdeletedusersComponent } from './main/HRMS/user/listdeletedusers/listdeletedusers.component';
import { AccountstatusComponent } from './main/HRMS/user/profile/accountstatus/accountstatus.component';
import { ProfileComponent } from './main/HRMS/user/profile/profile.component';

const routes: Routes = [

  // User
  {path:'user/add-user',component:CreateComponent, canActivate:[AuthenticationGuard]},
  {path:'user/list-user',component:ListComponent, canActivate:[AuthenticationGuard]},
  {path:'user/deleted-user',component:ListdeletedusersComponent, canActivate:[AuthenticationGuard]},
  {path:'user/entitlement',component:GlobalentitlementsComponent, canActivate:[AuthenticationGuard]},

  {path:'user/edit-user/:uid',component:EditComponent, canActivate:[AuthenticationGuard]},
  {path:'user/profile/:uid',component:ProfileComponent, canActivate:[AuthenticationGuard]},

  {path:'user/profile/:uid/deactivate',component:AccountstatusComponent, canActivate:[AuthenticationGuard]},
  {path:'user/profile/:uid/activate',component:AccountstatusComponent, canActivate:[AuthenticationGuard]},

  // Auth
  {path:'auth/user/register',component:RegisterComponent},
  {path:'auth/user/login',component:LoginComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes, {onSameUrlNavigation:'reload'})],
  exports: [RouterModule]
})
export class AppRoutingModule { }