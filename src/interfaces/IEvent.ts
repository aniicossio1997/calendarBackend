import { ObjectId } from "mongoose";

export interface IEvent {
  title: String;
  description: string;
  start: Date;
  end: Date;
  user_id: ObjectId;
  email: string;
}
