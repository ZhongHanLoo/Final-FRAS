import {
  AfterViewInit,
  Component,
  EventEmitter,
  Input,
  Output,
  ViewChild,
} from '@angular/core';
import { MatSidenav } from '@angular/material/sidenav';
import { NavbarComponent } from '../navbar/navbar.component';
import { AppComponent } from '../../app.component';
import { LoginService } from 'src/app/services/login.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css'],
})
export class HeaderComponent {
  constructor(
    private appComponent: AppComponent,
    private loginService: LoginService
  ) {}

  toggleSidenav() {
    if (this.appComponent.sidenav) {
      this.appComponent.sidenav.toggle();
    }
  }

  logout() {
    this.loginService.logout();
  }
}
