import { AttendanceReport } from "./attendance";
import { Class } from "./class";

export interface Session {
  _id: String;
  name: String;
  date: Date | null;
  attendanceReport: AttendanceReport[];
}
