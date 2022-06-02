import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './main/AUTH/user/login/login.component';
import { RegisterComponent } from './main/AUTH/user/register/register.component';
import { CreateComponent } from './main/HRMS/user/create/create.component';
import { ListComponent } from './main/HRMS/user/list/list.component';

const routes: Routes = [
  {path:'add-user',component:CreateComponent},
  {path:'list-user',component:ListComponent},
  {path:'auth/register',component:RegisterComponent},
  {path:'auth/login',component:LoginComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
