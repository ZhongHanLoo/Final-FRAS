import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { MatSidenav } from '@angular/material/sidenav';
import { Subscription } from 'rxjs';
import { LoginService } from 'src/app/services/login.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css'],
})
export class NavbarComponent implements OnInit {
  constructor(private loginService: LoginService) {}

  @ViewChild(MatSidenav) sidenav!: MatSidenav;

  subscription!: Subscription;
  user: any;

  ngOnInit(): void {
    this.subscription = this.loginService.getUser().subscribe((result) => {
      this.user = result;
    });
  }

  toggle() {
    this.sidenav.toggle();
  }
}
