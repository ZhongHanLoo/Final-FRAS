import { Class } from "./class";

export interface User {
  _id: String;
  userId: String;
  name: String;
  email: String;
  password: String;
  userType: String;
  class: Class[];
}
