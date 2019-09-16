import { User } from "./User";

export interface Session {
  _iduser: User["_id"],
  _dt: string | Date;
  token: string;
}