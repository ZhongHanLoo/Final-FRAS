import { Component, OnInit, ViewChild } from '@angular/core';
import { MatSidenav } from '@angular/material/sidenav';
import { HeaderComponent } from './components/header/header.component';
import { NavbarComponent } from './components/navbar/navbar.component';
import { Subscription } from 'rxjs';
import { LoginService } from './services/login.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent implements OnInit {
  constructor(private loginService: LoginService) {}
  title = 'FRAS';

  @ViewChild('sidenav') sidenav!: MatSidenav;
  @ViewChild(HeaderComponent) header!: HeaderComponent;
  @ViewChild(NavbarComponent) navbar!: NavbarComponent;

  subscription!: Subscription;
  loggedIn = false;

  ngOnInit(): void {
    this.subscription = this.loginService.getLoggedIn().subscribe((result) => {
      this.loggedIn = result;
    });
  }
}
