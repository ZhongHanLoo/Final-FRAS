import { ChangeDetectorRef, Component, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { LoginService } from 'src/app/services/login.service';
import { NavbarComponent } from '../navbar/navbar.component';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent {
  constructor(
    private cdr: ChangeDetectorRef,
    private loginService: LoginService,
    private router: Router,
  ) {}
  @ViewChild(NavbarComponent) navbarComponent!: NavbarComponent;
  error = false;

  login(userId: string, password: string) {
    this.loginService.login(userId, password).subscribe((result) => {
      if (result === false) {
        this.error = true
      }else{
        this.error = false
        console.log(result.user.userType)
        // setTimeout(() => {
        //   this.navbarComponent.setUserType('lecturer');
        // }, 10);
        this.router.navigate(['/home']);
      }
    });
  }
}
