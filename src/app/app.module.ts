import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { FormsModule,ReactiveFormsModule  } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';

import { AppComponent } from './app.component';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import { HomeComponent } from './home/home.component';
import { BoardAdminComponent } from './board-admin/board-admin.component';
import { BoardUserComponent } from './board-user/board-user.component';
import { BoardModeratorComponent } from './board-moderator/board-moderator.component';
import { ProfileComponent } from './profile/profile.component';

import { authInterceptorProviders } from './_helpers/auth.interceptor';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import {MatMenuModule} from '@angular/material/menu';
import { MatStepperModule} from '@angular/material/stepper';
import { AngularMaterialModule } from './material.module';
//import {MatButtonModule,MatCheckboxModule,MatInputModule,MatNativeDateModule,MatSidenavModule,MatCardModule,MatFormFieldModule, MatCard} from '@angular/material'
//import {MatRadioModule,MatDividerModule,MatDialogModule,MatGridListModule,MatSelectModule, MatDatepickerModule,MatDialogRef,MAT_DIALOG_DATA} from '@angular/material';
import { FlexLayoutModule} from '@angular/flex-layout';
import { LayoutComponent } from './layout/layout.component';
import { HeaderComponent } from './navigation/header/header.component';
import { SidenavListComponent } from './navigation/sidenav-list/sidenav-list.component';
import { MatGridListResponsiveModule } from '../lib/mat-grid-list-responsive/mat-grid-list-responsive.module';
import {SearchComponent } from './search/search.component';
@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    RegisterComponent,
    HomeComponent,
    BoardAdminComponent,
    BoardUserComponent,
    BoardModeratorComponent,SearchComponent,
    ProfileComponent,SidenavListComponent,HeaderComponent,LayoutComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule ,
    HttpClientModule,
    BrowserAnimationsModule,
    AngularMaterialModule,FlexLayoutModule, MatGridListResponsiveModule
   // MatToolbarModule,MatTooltipModule,MatIconModule,
   // MatMenuModule,
  //  MatRadioModule,MatStepperModule,MatDividerModule,MatSelectModule,MatGridListModule,MatCheckboxModule,MatDatepickerModule,MatNativeDateModule,MatButtonModule,MatInputModule,MatSidenavModule,MatCardModule,MatFormFieldModule,MatDialogModule,FormsModule,
  ],
  providers: [authInterceptorProviders],
  bootstrap: [AppComponent]
})
export class AppModule { }
