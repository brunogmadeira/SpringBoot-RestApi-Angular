import { BrowserModule } from '@angular/platform-browser';
import { AppComponent } from './app.component';
import { FormsModule } from '@angular/forms';
import { ModuleWithProviders, NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { Routes, RouterModule, Router, ROUTES } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { LoginComponent } from './login/login.component';
import { HttpInterceptorMoodule } from './service/header-intercepctor.service';
import { UsuarioComponent } from './components/usuario/usuario.component';
import { UsuarioAddComponent } from './components/usuario/usuario-add/usuario-add.component';
import { GuardiaoGuard } from './service/guardiao.guard';
import { Telefone } from './model/telefone';

export const appRouters: Routes = [
  { path: 'home', component: HomeComponent, canActivate: [GuardiaoGuard] },
  { path: 'login', component: LoginComponent },
  { path: '', component: LoginComponent },
  {
    path: 'usuarioList',
    component: UsuarioComponent,
    canActivate: [GuardiaoGuard],
  },
  {
    path: 'usuarioAdd',
    component: UsuarioAddComponent,
    canActivate: [GuardiaoGuard],
  },
  {
    path: 'usuarioAdd/:id',
    component: UsuarioAddComponent,
    canActivate: [GuardiaoGuard],
  },
];

export const routes: ModuleWithProviders<any> =
  RouterModule.forRoot(appRouters);

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    HomeComponent,
    UsuarioComponent,
    UsuarioAddComponent,
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpClientModule,
    routes,
    HttpInterceptorMoodule,
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
