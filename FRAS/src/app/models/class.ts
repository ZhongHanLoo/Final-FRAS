import { Session } from "./session";
import { Subject } from "./subject";
import { User } from "./user";

export interface Class {
  _id: String;
  name: String;
  subject: Subject | null;
  sessionList: Session[];
  studentList: User[];
  lecturer: User | null;
}
