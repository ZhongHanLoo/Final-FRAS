import { Component, ViewChild } from '@angular/core';
import { MatSidenav } from '@angular/material/sidenav';
import { HeaderComponent } from './components/header/header.component';
import { NavbarComponent } from './components/navbar/navbar.component';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'FRAS';

  @ViewChild('sidenav') sidenav!: MatSidenav;
  @ViewChild(HeaderComponent) header!: HeaderComponent;
  @ViewChild(NavbarComponent) navbar!: NavbarComponent;
}
