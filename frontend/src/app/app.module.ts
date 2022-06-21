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
import { AuthService } from './service/AUTH/auth.service';
import { EditComponent } from './main/HRMS/user/edit/edit.component';
import { AccountstatusComponent } from './main/HRMS/user/profile/accountstatus/accountstatus.component';
import { EntitlementsService } from './service/AUTHO/entitlements.service';
import { SettingsComponent } from './main/HRMS/user/profile/settings/settings.component';
import { BasicdetailsComponent } from './main/HRMS/user/profile/basicdetails/basicdetails.component';
import { EntitlementsComponent } from './main/HRMS/user/profile/settings/entitlements/entitlements.component';
import { BasicsettingsComponent } from './main/HRMS/user/profile/settings/basicsettings/basicsettings.component';
import { UserrolesComponent } from './main/HRMS/user/profile/settings/userroles/userroles.component';
import { SecurityComponent } from './main/HRMS/user/profile/settings/security/security.component';
import { GlobalentitlementsComponent } from './main/HRMS/user/globalentitlements/globalentitlements.component';
import { ListdeletedusersComponent } from './main/HRMS/user/listdeletedusers/listdeletedusers.component';


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
    TopnavComponent,
    EditComponent,
    AccountstatusComponent,
    SettingsComponent,
    BasicdetailsComponent,
    EntitlementsComponent,
    BasicsettingsComponent,
    UserrolesComponent,
    SecurityComponent,
    GlobalentitlementsComponent,
    ListdeletedusersComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ReactiveFormsModule,
    FormsModule,
    HttpClientModule,
  ],
  providers: [UserService, AuthService, EntitlementsService],
  bootstrap: [AppComponent]
})
export class AppModule { }