import { Component, OnInit, ViewChild } from '@angular/core';
import { AbstractControl, FormBuilder, Validators } from '@angular/forms';
import { STEPPER_GLOBAL_OPTIONS } from '@angular/cdk/stepper';
import { Subject } from 'src/app/models/subject';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { SubjectService } from 'src/app/services/subject.service';
import { UserService } from 'src/app/services/user.service';
import { User } from 'src/app/models/user';
import { Class } from 'src/app/models/class';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatDialog } from '@angular/material/dialog';
import { ConfirmationDialogComponent } from '../confirmation-dialog/confirmation-dialog.component';
import { ClassService } from 'src/app/services/class.service';

@Component({
  selector: 'app-createClass',
  templateUrl: './createClass.component.html',
  styleUrls: ['./createClass.component.css'],
  providers: [
    {
      provide: STEPPER_GLOBAL_OPTIONS,
      useValue: { showError: true },
    },
  ],
})
export class CreateClassComponent implements OnInit{
  constructor(
    private _formBuilder: FormBuilder,
    private subjectService: SubjectService,
    private userService: UserService,
    private snackBar: MatSnackBar,
    public dialog: MatDialog,
    private classService: ClassService
  ) {}

  isChecked = false;
  subjectList: any;
  lecturerList: any;
  studentList: any;
  classList: any;
  newStudentList: User[] = [];
  selectedSubject: Subject = { _id: '', subjectCode: '', name: '' };
  selectedLecturer: User = {
    _id: '',
    userId: '',
    name: '',
    email: '',
    password: '',
    userType: '',
    class: [],
  };
  selectedStudent: User = {
    _id: '',
    userId: '',
    name: '',
    email: '',
    password: '',
    userType: '',
    class: [],
  };
  newClass: Class = {
    _id: '',
    name: '',
    subject: this.selectedSubject,
    sessionList: [],
    lecturer: this.selectedLecturer,
    studentList: this.newStudentList,
  };

  nameFormGroup = this._formBuilder.group({
    nameCtrl: ['', Validators.required],
  });
  subjectFormGroup = this._formBuilder.group({
    subjectCtrl: [
      'select subject from above',
      [Validators.required, this.subjectValidator],
    ],
  });
  lecturerFormGroup = this._formBuilder.group({
    lecturerCtrl: [
      'select lecturer from above',
      [Validators.required, this.lecturerValidator],
    ],
  });

  subjectDisplayedColumns: string[] = ['code', 'name', 'action'];
  subjectDataSource = new MatTableDataSource<Subject>([]);
  @ViewChild('SubjectMatPaginator') subjectPaginator!: MatPaginator;

  lecturerDisplayedColumns: string[] = ['userId', 'name', 'email', 'action'];
  lecturerDataSource = new MatTableDataSource<User>([]);
  @ViewChild('LecturerMatPaginator') lecturerPaginator!: MatPaginator;

  studentDisplayedColumns: string[] = ['userId', 'name', 'email', 'action'];
  studentDataSource = new MatTableDataSource<User>([]);
  @ViewChild('StudentMatPaginator') studentPaginator!: MatPaginator;

  newStudentDisplayedColumns: string[] = ['userId', 'name', 'email', 'action'];
  newStudentDataSource = new MatTableDataSource<User>([]);
  @ViewChild('NewStudentMatPaginator') newStudentPaginator!: MatPaginator;

  classDisplayedColumns: string[] = ['name', 'subject', 'lecturer'];
  classDataSource = new MatTableDataSource<Class>([]);
  @ViewChild('ClassMatPaginator') classPaginator!: MatPaginator;

  ngOnInit(): void {
    this.subjectService.getAllSubject().subscribe((result: any) => {
      this.subjectList = result.subjects;
      this.subjectDataSource = new MatTableDataSource<Subject>(
        this.subjectList
      );
      this.subjectDataSource.paginator = this.subjectPaginator;
    });

    this.userService.getAllLecturer().subscribe((result: any) => {
      this.lecturerList = result.users;
      this.lecturerDataSource = new MatTableDataSource<User>(this.lecturerList);
      this.lecturerDataSource.paginator = this.lecturerPaginator;
    });

    this.userService.getAllStudent().subscribe((result: any) => {
      this.studentList = result.users;
      this.studentDataSource = new MatTableDataSource<User>(this.studentList);
      this.studentDataSource.paginator = this.studentPaginator;
    });

    this.classService.getAllClass().subscribe((result: any) => {
      this.classList = result.classes;
      console.log(this.classList)
      this.classDataSource = new MatTableDataSource<Class>(this.classList);
      this.classDataSource.paginator = this.classPaginator;
    });
  }

  subjectValidator(
    control: AbstractControl
  ): { [key: string]: boolean } | null {
    if (control.value === 'select subject from above') {
      return null;
    }
    return { not: true };
  }

  lecturerValidator(
    control: AbstractControl
  ): { [key: string]: boolean } | null {
    if (control.value === 'select lecturer from above') {
      return null;
    }
    return { not: true };
  }

  applySubjectFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.subjectDataSource.filter = filterValue.trim().toLowerCase();
    if (this.subjectDataSource.paginator) {
      this.subjectDataSource.paginator.firstPage();
    }
  }

  applyLecturerFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.lecturerDataSource.filter = filterValue.trim().toLowerCase();
    if (this.lecturerDataSource.paginator) {
      this.lecturerDataSource.paginator.firstPage();
    }
  }

  applyStudentFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.studentDataSource.filter = filterValue.trim().toLowerCase();
    if (this.studentDataSource.paginator) {
      this.studentDataSource.paginator.firstPage();
    }
  }

  applyNewStudentFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.newStudentDataSource.filter = filterValue.trim().toLowerCase();
    if (this.newStudentDataSource.paginator) {
      this.newStudentDataSource.paginator.firstPage();
    }
  }

  applyClassFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.classDataSource.filter = filterValue.trim().toLowerCase();
    if (this.classDataSource.paginator) {
      this.classDataSource.paginator.firstPage();
    }
  }

  getSelectedSubject(subject: any, section: HTMLElement) {
    // this.selectedSubject = { ...subject };
    this.selectedSubject = subject;
    this.newClass.subject = this.selectedSubject;
    section.scrollIntoView({ behavior: 'smooth' });
  }

  getSelectedLecturer(lecturer: any, section: HTMLElement) {
    // this.selectedLecturer = { ...lecturer };
    this.selectedLecturer = lecturer;
    this.newClass.lecturer = this.selectedLecturer;
    section.scrollIntoView({ behavior: 'smooth' });
  }

  getSelectedStudent(student: any) {
    this.selectedStudent = { ...student };
    const studentId = this.selectedStudent._id;
    const isAlreadyAdded = this.newStudentList.find(
      (student) => student._id === studentId
    );
    if (isAlreadyAdded) {
      this.snackBar.open('Student already added', 'X', {
        duration: 2500,
      });
    } else {
      this.newStudentList.push(this.selectedStudent);
      this.newStudentDataSource = new MatTableDataSource<User>(
        this.newStudentList
      );
    }
  }

  removeSelectedStudent(selectedStudent: any) {
    this.newStudentList = this.newStudentList.filter(
      (student) => student._id !== selectedStudent._id
    );
    this.newStudentDataSource = new MatTableDataSource<User>(
      this.newStudentList
    );
  }

  confirmCreateClass(event: Event) {
    event.preventDefault();
    const dialogRef = this.dialog.open(ConfirmationDialogComponent, {
      data: {
        title: 'Confirmation',
        message: 'Are you sure you want to create new class?',
      },
    });

    dialogRef.afterClosed().subscribe((result) => {
      if (result) {
        this.createClass();
      }
    });
  }

  createClass() {
    console.log(this.newClass);
    this.classService.createClass(this.newClass).subscribe({
      next: (result) => {
        console.log(result);
        this.selectedLecturer.class.push(result.classId);
        this.userService.updateUser(this.selectedLecturer).subscribe();
        this.newStudentList.forEach((student) => {
          student.class.push(result.classId);
          this.userService.updateUser(student).subscribe();
        });

        this.refresh();
        this.snackBar.open('Class Registered Successfully', 'X', {
          duration: 3000,
        });
      },
    });
  }

  refresh() {
    this.ngOnInit();
    this.newStudentList = [];
    this.selectedSubject = { _id: '', subjectCode: '', name: '' };
    this.selectedLecturer = {
      _id: '',
      userId: '',
      name: '',
      email: '',
      password: '',
      userType: '',
      class: [],
    };
    this.selectedStudent = {
      _id: '',
      userId: '',
      name: '',
      email: '',
      password: '',
      userType: '',
      class: [],
    };
    this.newClass = {
      _id: '',
      name: '',
      subject: this.selectedSubject,
      sessionList: [],
      lecturer: this.selectedLecturer,
      studentList: this.newStudentList,
    };
    this.nameFormGroup.reset();
    this.subjectFormGroup.reset();
    this.lecturerFormGroup.reset();
  }
}
