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

export const appRouters: Routes = [
  { path: 'home', component: HomeComponent },
  { path: 'login', component: LoginComponent },
  { path: '', component: LoginComponent },
  { path: 'usuarioList', component: UsuarioComponent },
];

export const routes: ModuleWithProviders<any> =
  RouterModule.forRoot(appRouters);

@NgModule({
  declarations: [AppComponent, LoginComponent, HomeComponent, UsuarioComponent],
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
