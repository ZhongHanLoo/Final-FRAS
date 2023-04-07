import { SelectionModel } from '@angular/cdk/collections';
import { Component, OnInit, ViewChild } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatTable, MatTableDataSource } from '@angular/material/table';
import { AttendanceReport } from 'src/app/models/attendance';
import { Class } from 'src/app/models/class';
import { Session } from 'src/app/models/session';
import { User } from 'src/app/models/user';
import { AttendanceService } from 'src/app/services/attendance.service';
import { ClassService } from 'src/app/services/class.service';
import { LoginService } from 'src/app/services/login.service';
import { SessionService } from 'src/app/services/session.service';
import { SubjectService } from 'src/app/services/subject.service';
import { UserService } from 'src/app/services/user.service';
import { ConfirmationDialogComponent } from '../confirmation-dialog/confirmation-dialog.component';

@Component({
  selector: 'app-lecturer-class',
  templateUrl: './lecturer-class.component.html',
  styleUrls: ['./lecturer-class.component.css'],
})
export class LecturerClassComponent implements OnInit {
  constructor(
    private subjectService: SubjectService,
    private userService: UserService,
    private snackBar: MatSnackBar,
    public dialog: MatDialog,
    private classService: ClassService,
    private sessionService: SessionService,
    private loginService: LoginService,
    private attendanceService: AttendanceService
  ) {}

  isDisabled = false;
  isExpandedClass = true;

  classList: any;
  sessionList: any;
  attendanceList: any;
  attendanceList2: AttendanceReport[] = [];

  selectedClass: Class = {
    _id: '',
    name: '',
    subject: null,
    sessionList: [],
    studentList: [],
    lecturer: null,
  };
  selectedSession: Session = {
    _id: '',
    name: '',
    date: null,
    attendanceReport: [],
  };

  newAttendanceReport: AttendanceReport[] = [];
  newSessionName = '';
  newSessionCreated: any;
  addNewSession = false;
  nameFormControl = new FormControl('', [Validators.required]);

  classDisplayedColumns: string[] = ['name', 'subject', 'session', 'action'];
  classDataSource = new MatTableDataSource<Class>([]);
  @ViewChild('ClassMatPaginator') classPaginator!: MatPaginator;

  sessionDisplayedColumns: string[] = ['name', 'date', 'action'];
  sessionDataSource = new MatTableDataSource<Session>([]);
  @ViewChild('SessionMatPaginator') sessionPaginator!: MatPaginator;

  attendanceReportDisplayedColumns: string[] = [
    'userId',
    'name',
    'attendanceCheck',
  ];
  attendanceReportDataSource = new MatTableDataSource<AttendanceReport>([]);
  @ViewChild('AttendanceReportMatPaginator')
  attendanceReportPaginator!: MatPaginator;

  ngOnInit(): void {
    this.classService
      .getClassByLecturer(this.loginService.getLoginUser())
      .subscribe((result: any) => {
        this.classList = result.classes;
        this.classDataSource = new MatTableDataSource<any>(this.classList);
        this.classDataSource.paginator = this.classPaginator;
      });
  }

  applyClassFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.classDataSource.filter = filterValue.trim().toLowerCase();
    if (this.classDataSource.paginator) {
      this.classDataSource.paginator.firstPage();
    }
  }

  applySessionFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.sessionDataSource.filter = filterValue.trim().toLowerCase();
    if (this.sessionDataSource.paginator) {
      this.sessionDataSource.paginator.firstPage();
    }
  }

  applyAttendanceReportFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.attendanceReportDataSource.filter = filterValue.trim().toLowerCase();
    if (this.attendanceReportDataSource.paginator) {
      this.attendanceReportDataSource.paginator.firstPage();
    }
  }

  getSelectedClass(theClass: any) {
    this.selectedClass = { ...theClass };
    this.sessionList = this.selectedClass.sessionList;
    this.sessionDataSource = new MatTableDataSource<Session>(this.sessionList);
    this.sessionDataSource.paginator = this.sessionPaginator;
  }

  getSelectedSession(session: any) {
    this.selectedSession = { ...session };
    console.log(this.selectedSession);
    this.sessionService.getSession(this.selectedSession).subscribe((result) => {
      this.attendanceList = result.session.attendanceReport;
      // for (let i = 0; i < this.attendanceList.length; i++) {
      //   let user = this.attendanceList[i]._id;
      //   this.attendanceService.getAttendance(user).subscribe((result2) => {
      //     this.attendanceList2.push(...result2);
      //     this.attendanceReportDataSource =
      //       new MatTableDataSource<AttendanceReport>(this.attendanceList2);
      //     this.attendanceReportDataSource.paginator =
      //       this.attendanceReportPaginator;
      //   });

      // }
       console.log(this.attendanceList);
      //this.attendanceList = this.selectedSession.attendanceReport;
      this.attendanceReportDataSource =
        new MatTableDataSource<AttendanceReport>(this.attendanceList);
      this.attendanceReportDataSource.paginator =
        this.attendanceReportPaginator;
    });
  }

  newSession() {
    this.addNewSession = true;
    this.newAttendanceReport = this.selectedClass.studentList.map((student) => {
      const attendance: AttendanceReport = {
        _id: '',
        user: student as User,
        attendanceCheck: false,
      };
      return attendance;
    });
    this.attendanceReportDataSource = new MatTableDataSource<AttendanceReport>(
      this.newAttendanceReport
    );
    this.attendanceReportDataSource.paginator = this.attendanceReportPaginator;
  }

  confirmSaveNewSession(event: Event) {
    event.preventDefault();
    const dialogRef = this.dialog.open(ConfirmationDialogComponent, {
      data: {
        title: 'Confirmation',
        message: 'Are you sure you want to save new session?',
      },
    });

    dialogRef.afterClosed().subscribe((result) => {
      if (result) {
        this.saveNewSession();
      }
    });
  }

  saveNewSession() {
    this.makeNewSessionAndSaveAttendance().then((newSessionCreated) => {
      this.sessionService
        .createSession(newSessionCreated)
        .subscribe((result) => {
          this.selectedClass.sessionList.push(result.sessionId);
          this.classService
            .updateClass(this.selectedClass)
            .subscribe((theClass) => {
              console.log(theClass);

              this.refresh();
              this.snackBar.open('New Session Saved Successfully', 'X', {
                duration: 3000,
              });
            });
        });
    });
  }

  async makeNewSessionAndSaveAttendance() {
    this.newSessionCreated = {
      _id: '',
      name: this.newSessionName,
      date: new Date(),
      attendanceReport: [],
    };

    for (const attendance of this.attendanceReportDataSource.data) {
      const updatedAttendance: AttendanceReport = {
        _id: attendance._id,
        user: attendance.user,
        attendanceCheck: attendance.attendanceCheck,
      };

      const result = await this.attendanceService
        .createAttendance(updatedAttendance)
        .toPromise();
      console.log(result);

      const attendanceResult = await this.attendanceService
        .getAttendance(result.attendanceId)
        .toPromise();
      console.log(attendanceResult);

      this.newSessionCreated.attendanceReport.push(attendanceResult.attendance);
    }

    console.log(this.newSessionCreated);

    return this.newSessionCreated;
  }

  confirmUpdateAttendance(event: Event) {
    event.preventDefault();
    const dialogRef = this.dialog.open(ConfirmationDialogComponent, {
      data: {
        title: 'Confirmation',
        message: 'Are you sure you want to update attendance?',
      },
    });

    dialogRef.afterClosed().subscribe((result) => {
      if (result) {
        this.updateAttendance();
      }
    });
  }

  updateAttendance() {
    this.getAttendanceReportDate().then((newSessionCreated) => {
      this.selectedSession.attendanceReport =
        newSessionCreated.attendanceReport;
      this.sessionService.updateSession(this.selectedSession).subscribe({
        next: (result) => {
          console.log(result);
          this.refresh();
          this.snackBar.open('Attendance Report Updated Successfully', 'X', {
            duration: 3000,
          });
        },
      });
    });
  }

  async getAttendanceReportDate() {
    this.newSessionCreated = {
      _id: '',
      name: this.newSessionName,
      date: new Date(),
      attendanceReport: [],
    };

    for (const attendance of this.attendanceReportDataSource.data) {
      const updatedAttendance: AttendanceReport = {
        _id: attendance._id,
        user: attendance.user,
        attendanceCheck: attendance.attendanceCheck,
      };

      const result = await this.attendanceService
        .createAttendance(updatedAttendance)
        .toPromise();
      console.log(result);

      const attendanceResult = await this.attendanceService
        .getAttendance(result.attendanceId)
        .toPromise();
      console.log(attendanceResult);

      this.newSessionCreated.attendanceReport.push(attendanceResult.attendance);
    }

    console.log(this.newSessionCreated);

    return this.newSessionCreated;
  }

  checkAttendance(userId: string) {
    const index = this.newAttendanceReport.findIndex(
      (element) => element.user._id === userId
    );
    if (index >= 0) {
      this.newAttendanceReport[index].attendanceCheck = true;
    }

    this.attendanceReportDataSource = new MatTableDataSource<AttendanceReport>(
      this.newAttendanceReport
    );
    this.attendanceReportDataSource.paginator = this.attendanceReportPaginator;
  }

  refresh() {
    this.selectedClass = {
      _id: '',
      name: '',
      subject: null,
      sessionList: [],
      studentList: [],
      lecturer: null,
    };
    this.selectedSession = {
      _id: '',
      name: '',
      date: null,
      attendanceReport: [],
    };
    this.newAttendanceReport = [];
    this.newSessionName = '';
    this.addNewSession = false;
    this.ngOnInit;
    this.newSessionCreated = {
      _id: '',
      name: this.newSessionName,
      date: new Date(),
      attendanceReport: [],
    };
  }
}
