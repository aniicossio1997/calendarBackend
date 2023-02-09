//todas deben ser protegidas
import { Request, Response } from "express";
import { Schema } from "express-validator";
import Event, { IEvent } from "../models/eventModel";
import { ObjectId } from "mongoose";
import moment from "moment";
import { comparIdUsers } from "../utils/comparIdUsers";
import userModel from "../models/userModel";

interface IEventController {
  title: String;
  description: string;
  start: Date;
  end: Date;
  user_id: ObjectId;
  email: string;
}
export const getAll = async (req: Request, res: Response) => {
  // const events = await Event.find({}, function (err, events) {
  //   userModel.populate(events, { path: "user" }, function (err, events) {
  //     return events;
  //   });
  // });
  const events = await Event.find({}).populate("user", {
    email: 1,
    name: 1,
    id: 1,
  });
  res.json({
    ok: true,
    data: events,
    msg: "All events",
  });
};
export const getEvents = async (req: Request, res: Response) => {
  const events = await Event.find();

  res.json({
    ok: true,
    msg: "User Events",
    events,
  });
};
export const getEvent = (req: Request, res: Response) => {
  res.json({
    ok: true,
    msg: "event get",
  });
};
