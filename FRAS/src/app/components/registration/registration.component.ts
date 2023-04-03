import { Component, OnInit, ViewChild } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatTableDataSource } from '@angular/material/table';
import { User } from 'src/app/models/user';
import { UserService } from 'src/app/services/user.service';
import { ConfirmationDialogComponent } from '../confirmation-dialog/confirmation-dialog.component';

@Component({
  selector: 'app-registration',
  templateUrl: './registration.component.html',
  styleUrls: ['./registration.component.css'],
})
export class RegistrationComponent implements OnInit {
  constructor(
    private snackBar: MatSnackBar,
    public dialog: MatDialog,
    private userService: UserService
  ) {}

  userTypes: string[] = ['Student', 'Lecturer'];
  newUser: User = {
    _id: '',
    userId: '',
    name: '',
    email: '',
    password: '123qwe',
    userType: this.userTypes[0],
    class: [],
  };

  emailFormControl = new FormControl('', [
    Validators.required,
    Validators.email,
  ]);
  nameFormControl = new FormControl('', [Validators.required]);
  userIdFormControl = new FormControl('', [Validators.required]);

  userList: any;
  displayedColumns: string[] = ['userId', 'name', 'email'];
  dataSource = new MatTableDataSource<User>([]);
  @ViewChild(MatPaginator) paginator!: MatPaginator;

  ngOnInit(): void {
    this.userService.getAllUser().subscribe((result: any) => {
      this.userList = result.users;
      this.dataSource = new MatTableDataSource<User>(this.userList);
      this.dataSource.paginator = this.paginator;
    });
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }

  register() {
    this.userService.createUser(this.newUser).subscribe({
      next: (result) => {
        console.log(result);
        this.refresh();
        this.snackBar.open('User Registered Successfully', 'X', {
          duration: 3000,
        });
      },
    });
  }

  confirmRegister(event: Event) {
    event.preventDefault();
    const dialogRef = this.dialog.open(ConfirmationDialogComponent, {
      data: {
        title: 'Confirmation',
        message: 'Are you sure you want to register user?',
      },
    });

    dialogRef.afterClosed().subscribe((result) => {
      if (result) {
        this.register();
      }
    });
  }

  refresh() {
    this.ngOnInit();
    this.newUser = {
      _id: '',
      userId: '',
      name: '',
      email: '',
      password: '123qwe',
      userType: this.userTypes[0],
      class: [],
    };
    this.userIdFormControl.reset()
    this.emailFormControl.reset();
    this.nameFormControl.reset();
  }
}
