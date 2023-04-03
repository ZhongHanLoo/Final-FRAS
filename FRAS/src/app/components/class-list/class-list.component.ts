import { Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatTableDataSource } from '@angular/material/table';
import { Class } from 'src/app/models/class';
import { ClassService } from 'src/app/services/class.service';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-class-list',
  templateUrl: './class-list.component.html',
  styleUrls: ['./class-list.component.css']
})
export class ClassListComponent implements OnInit {
  constructor(
    private snackBar: MatSnackBar,
    public dialog: MatDialog,
    private userService: UserService,
    private classService: ClassService,

  ) {}

  classList: any;
  displayedColumns: string[] = ['name', 'subject', 'lecturer'];
  dataSource = new MatTableDataSource<Class>([]);
  @ViewChild(MatPaginator) paginator!: MatPaginator;

  ngOnInit(): void {
    this.classService.getAllClass().subscribe((result: Class[]) => {
      this.classList = result;
      this.dataSource = new MatTableDataSource<Class>(this.classList);
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

}
