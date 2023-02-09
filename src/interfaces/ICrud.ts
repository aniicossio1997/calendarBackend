import { Query, Types } from "mongoose";
import { IEvent } from "../models/eventModel";
import Event from "../models/eventModel";

export interface ICRUD {
  list: (id_user?: string) => Event[] | any;
  create: () => void;
  updateById: () => void;
  readById: () => void;
  deleteById: () => void;
}
