import { Component, OnInit, ViewChild } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatTableDataSource } from '@angular/material/table';
import { Subject } from 'src/app/models/subject';
import { SubjectService } from 'src/app/services/subject.service';
import { ConfirmationDialogComponent } from '../confirmation-dialog/confirmation-dialog.component';

@Component({
  selector: 'app-subject',
  templateUrl: './subject.component.html',
  styleUrls: ['./subject.component.css'],
})
export class SubjectComponent implements OnInit {
  constructor(
    private snackBar: MatSnackBar,
    public dialog: MatDialog,
    private subjectService: SubjectService
  ) {}

  displayedColumns: string[] = ['code', 'name', 'action'];
  dataSource = new MatTableDataSource<Subject>([]);
  @ViewChild(MatPaginator) paginator!: MatPaginator;

  subjectList: any;
  newSubject: Subject = { _id: '', name: '', subjectCode: '' };
  selectedSubject: Subject = { _id: '',name: '', subjectCode: '' };
  subjectCodeFormControl = new FormControl('', [Validators.required]);
  nameFormControl = new FormControl('', [Validators.required]);
  editSubjectCodeFormControl = new FormControl('', [Validators.required]);
  editNameFormControl = new FormControl('', [Validators.required]);

  isEditDisabled = true;
  isExpanded = false;

  ngOnInit(): void {
    this.subjectService.getAllSubject().subscribe((result: any) => {
      this.subjectList = result.subjects;
      this.dataSource = new MatTableDataSource<Subject>(this.subjectList);
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

  getSelectedSubject(subject: any, section: HTMLElement) {
    this.selectedSubject = { ...subject };
    this.isEditDisabled = false;
    this.isExpanded = true;
    section.scrollIntoView({ behavior: 'smooth' });
  }

  create() {
    this.subjectService.createSubject(this.newSubject).subscribe({
      next: (result) => {
        console.log(result);
        this.refresh();
        this.snackBar.open('Subject Created Successfully', 'X', {
          duration: 3000,
        });
      },
    });
  }

  update() {
    this.subjectService.updateSubject(this.selectedSubject).subscribe({
      next: (result) => {
        console.log(result);
        this.refresh();
        this.snackBar.open('Subject Updated Successfully', 'X', {
          duration: 3000,
        });
      },
    });
  }

  delete() {
    this.subjectService.deleteSubject(this.selectedSubject).subscribe({
      next: (result) => {
        console.log(result);
        this.refresh();
        this.snackBar.open('Subject Deleted Successfully', 'X', {
          duration: 3000,
        });
      },
    });
  }

  confirmCreate(event: Event) {
    event.preventDefault();
    const dialogRef = this.dialog.open(ConfirmationDialogComponent, {
      data: {
        title: 'Create Confirmation',
        message: 'Are you sure you want to create subject?',
      },
    });
    dialogRef.afterClosed().subscribe((result) => {
      if (result) {
        this.create();
      }
    });
  }

  confirmUpdate(event: Event) {
    event.preventDefault();
    const dialogRef = this.dialog.open(ConfirmationDialogComponent, {
      data: {
        title: 'Update Confirmation',
        message: 'Are you sure you want to update subject?',
      },
    });
    dialogRef.afterClosed().subscribe((result) => {
      if (result) {
        this.update();
      }
    });
  }

  confirmDelete(event: Event, subject: Subject) {
    event.preventDefault();
    this.selectedSubject = subject;
    const dialogRef = this.dialog.open(ConfirmationDialogComponent, {
      data: {
        title: 'Delete Confirmation',
        message:
          'Are you sure you want to delete subject: ' +
          this.selectedSubject.subjectCode +
          ' ' +
          this.selectedSubject.name,
      },
    });
    dialogRef.afterClosed().subscribe((result) => {
      if (result) {
        this.delete();
      }
    });
  }

  refresh() {
    this.ngOnInit();
    this.newSubject = { _id: '',name: '', subjectCode: ''};
    this.selectedSubject = { _id: '',name: '', subjectCode: ''};
    this.isEditDisabled = true;
    this.isExpanded = false;
    this.subjectCodeFormControl.reset();
    this.nameFormControl.reset();
  }
}
