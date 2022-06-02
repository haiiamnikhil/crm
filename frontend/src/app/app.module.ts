import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http'

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { CreateComponent } from './main/HRMS/user/create/create.component';
import { ListComponent } from './main/HRMS/user/list/list.component';
import { ProfileComponent } from './main/HRMS/user/profile/profile.component';
import { LoginComponent } from './main/AUTH/user/login/login.component';
import { RegisterComponent } from './main/AUTH/user/register/register.component';
import { LeftnavComponent } from './main/common/leftnav/leftnav.component';
import { BottomnavComponent } from './main/common/bottomnav/bottomnav.component';
import { TopnavComponent } from './main/common/topnav/topnav.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { UserService } from './service/HRMS/user.service';


@NgModule({
  declarations: [
    AppComponent,
    CreateComponent,
    ListComponent,
    ProfileComponent,
    LoginComponent,
    RegisterComponent,
    LeftnavComponent,
    BottomnavComponent,
    TopnavComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ReactiveFormsModule,
    FormsModule,
    HttpClientModule,
  ],
  providers: [UserService],
  bootstrap: [AppComponent]
})
export class AppModule { }
