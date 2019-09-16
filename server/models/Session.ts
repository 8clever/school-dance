import { User } from "./User";

export interface Session {
  _iduser: User["_id"],
  expire: string;
  token: string;
}