import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AuthguardService } from './authguard/authguard.service';
import { NotauthguardService } from './authguard/notauthguard.service';

import { HomeComponent } from './home/home.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { RegisterComponent } from './register/register.component';
import { LoginComponent } from './login/login.component';
import { ProfileComponent } from './profile/profile.component';
import { BlogComponent } from './blog/blog.component';
import { EditBlogComponent } from './blog/edit-blog/edit-blog.component';
import { DeleteBlogComponent } from './blog/delete-blog/delete-blog.component';
import { PublicProfileComponent } from './public-profile/public-profile.component';

const routes: Routes = [
  {path:'', component:HomeComponent},
  {path:'dashboard', component:DashboardComponent, canActivate: [AuthguardService]},
  {path:'register', component:RegisterComponent, canActivate: [NotauthguardService]},
  {path:'login', component:LoginComponent, canActivate: [NotauthguardService]},
  {path:'profile', component:ProfileComponent, canActivate: [AuthguardService]},
  {path:'blog', component:BlogComponent, canActivate: [AuthguardService]},
  {path:'blog/editblog/:id', component:EditBlogComponent, canActivate: [AuthguardService]},
  {path:'blog/deleteblog/:id', component:DeleteBlogComponent, canActivate: [AuthguardService]},
  {path:'blog/publicProfile/:username', component:PublicProfileComponent, canActivate: [AuthguardService]},
  {path:'*', component:HomeComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
