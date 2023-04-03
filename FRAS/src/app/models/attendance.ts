import { Session } from "./session";
import { User } from "./user";

export interface AttendanceReport {
  _id: String;
  user: User;
  attendanceCheck: boolean;
}
