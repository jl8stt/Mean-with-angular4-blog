import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ReactiveFormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { FlashMessagesModule } from 'angular2-flash-messages';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HomeComponent } from './home/home.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { RegisterComponent } from './register/register.component';
import { AuthService } from './services/auth.service';
import { BlogService } from './services/blog.service';

import { LoginComponent } from './login/login.component';
import { ProfileComponent } from './profile/profile.component';
import { AuthguardService } from './authguard/authguard.service';
import { NotauthguardService } from './authguard/notauthguard.service';
import { BlogComponent } from './blog/blog.component';
import { EditBlogComponent } from './blog/edit-blog/edit-blog.component';
import { DeleteBlogComponent } from './blog/delete-blog/delete-blog.component';
import { PublicProfileComponent } from './public-profile/public-profile.component';

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    DashboardComponent,
    RegisterComponent,
    LoginComponent,
    ProfileComponent,
    BlogComponent,
    EditBlogComponent,
    DeleteBlogComponent,
    PublicProfileComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    HttpModule,
    FlashMessagesModule,
  ],
  providers: [AuthService, BlogService, AuthguardService, NotauthguardService ],
  bootstrap: [AppComponent]
})
export class AppModule { }
