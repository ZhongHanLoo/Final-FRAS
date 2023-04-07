import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { MatSidenav } from '@angular/material/sidenav';
import { Subscription } from 'rxjs';
import { LoginService } from 'src/app/services/login.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit{

  constructor(private loginService: LoginService) {}

  @ViewChild(MatSidenav) sidenav!: MatSidenav;

  userType:any;
  subscription!: Subscription;

  ngOnInit() {
    this.subscription = this.loginService.getLoginUserNav().subscribe(data => {
      this.userType = data.userType;
      //this.userType = "Lecturer";
      console.log(this.userType);
    });
  }

  toggle() {
    this.sidenav.toggle();
  }

  setUserType(data: any){
    this.userType = data;

  }


}
