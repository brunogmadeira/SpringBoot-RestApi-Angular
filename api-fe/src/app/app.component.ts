import { Component, OnInit, TestabilityRegistry } from '@angular/core';
import { LoginServiceService } from './service/login.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent implements OnInit {
  title = 'api-fe';
  constructor(private router: Router) {}
  ngOnInit(): void {
    if (localStorage.getItem('token') == null) {
      this.router.navigate(['login']);
    }
  }
  public sair() {
    localStorage.clear;
    this.router.navigate(['login']);
  }
  public esconderBarra() {
    if (
      localStorage.getItem('token') !== null &&
      localStorage.getItem('token')?.toString().trim() !== null
    ) {
      return false;
    } else {
      return true;
    }
  }
}
