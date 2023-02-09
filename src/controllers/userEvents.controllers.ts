//todas deben ser protegidas
import { Request, Response } from "express";
import Event, { IEvent } from "../models/eventModel";
import { ObjectId, Types } from "mongoose";
import moment from "moment";

interface IEventController {
  title: String;
  description: string;
  start: Date;
  end: Date;
  user_id: ObjectId;
  email: string;
}
const compere = (a: string, b: string) => {
  if (a == b) {
    return 0;
  }
  if (a < b) {
    return -1;
  }
  return 1;
};

export const getEvents = async (req: Request, res: Response) => {
  ///   api/users/userId/events?sort=end,asc
  //    events?search=hel&sort=end,asc
  let id_user = req.params.user;
  const events = await Event.find({ user: id_user });
  console.log(req.query);
  let search = req.query.search || "";
  let sort: any = req.query.sort || "rating";
  let lessThanToday = req.query.lessThanToday;
  //todas la fechas no vigentes
  let greaterThanToday: any =
    req.query.greaterThanToday || moment().subtract({ year: 100 });
  //todas la fechas vigentes
  let sanatizeDateLess = moment(lessThanToday as string);
  let dateLessThanToday: any = sanatizeDateLess || moment().add({ year: 10 });
  let ifEmptyLessThanToday = !Boolean(lessThanToday);
  const date = encodeURIComponent("2015-02-04T05:10:58+05:30");
  sort ? (sort = sort.split(",")) : (sort = [sort]);

  let sortBy: any = {};
  if (sort[1]) {
    sortBy[sort[0]] = sort[1];
  } else {
    sortBy[sort[0]] = "asc";
  }

  console.log("sort by: ", sort[1]);
  let auxEvents: (IEvent & {
    _id: Types.ObjectId;
  })[] = await Event.find({
    title: { $regex: search, $options: "i" },
    user: req.params.user,
  }).sort(sortBy);

  if (sort[0] !== "start" && sort[0] !== "end") {
    auxEvents.sort((e1, e2) => {
      let a = e1.title.toLocaleLowerCase();
      let b = e2.title.toLocaleLowerCase();
      return sort[1] === "asc" ? compere(a, b) : compere(b, a);
    });
  }

  res.json({
    ok: true,
    msg: "User events",
    events: auxEvents,
  });
};
export const getEvent = async (req: Request, res: Response) => {
  try {
    const event = await Event.findOne({
      user: req.params.user,
      _id: req.params.id,
    }).populate("user", "name email");
    if (event) {
      return res.json({
        ok: true,
        msg: "event get",
        event,
      });
    } else {
      return res.status(404).json({
        ok: false,
        msg: "No se encontro coincidencias",
        event,
      });
    }
  } catch (error) {
    console.log(error);
    res.status(500).json({
      ok: false,
      msg: "Puede ser que Id no sea valido, Hable con el administrador",
    });
  }
};
export const postEvent = async (req: Request, res: Response) => {
  //crearEvento
  const body = req.body as IEventController;
  const event_sanitize = {
    title: body.title,
    description: body.description,
    start: body.start,
    end: body.end,
    user: body.user_id,
  };

  try {
    const startMoment = moment(event_sanitize.start);
    const endMoment = moment(event_sanitize.end);
    console.log(startMoment, endMoment);
    console.log(!startMoment.isSameOrAfter(endMoment));
    const newEvent = new Event(event_sanitize);
    const event = await newEvent.save();
    return res.json({
      ok: true,
      msg: "event created",
      event,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      ok: false,
      msg: "hubo un error en la creación del evento, comuniquese con el administrador",
    });
  }
};
export const putEvent = async (req: Request, res: Response) => {
  //update
  const body = req.body as IEventController;
  const event_sanitize = {
    title: body.title,
    start: body.start,
    end: body.end,
    description: body.description,
  };

  try {
    const eventFind = await Event.findOne({
      user: req.params.user,
      _id: req.params.id,
    });
    if (eventFind) {
      const nuevoEvento = {
        ...event_sanitize,
        user: eventFind?.user,
      };
      const event = await Event.findByIdAndUpdate(eventFind?.id, nuevoEvento, {
        new: true,
      });
      return res.json({
        ok: true,
        msg: "success updated event",
        event,
      });
    } else {
      return res.status(404).json({
        ok: false,
        msg: "Hubo un error al actualizar, hable con el admi",
        event_sanitize,
      });
    }
  } catch (error) {
    console.log(error);
    res.status(500).json({
      ok: false,
      msg: "Puede ser que Id no sea valido, Hable con el administrador",
    });
  }
};
export const deleteEvent = async (req: Request, res: Response) => {
  try {
    const event = await Event.findOne({
      user: req.params.user,
      _id: req.params.id,
    });
    if (event == null) {
      return res.status(404).json({
        ok: false,
        msg: "No se encontro el evento a eliminar",
        event,
      });
    }
    if (String(event.user) !== req.params.user) {
      return res.status(401).json({
        ok: false,
        msg: "No tiene privilegio de eliminar este evento",
      });
    }
    if (event) {
      const eventDeleted = await Event.findByIdAndDelete(event.id);
      return res.json({
        ok: true,
        msg: "success deleted event",
        event: eventDeleted,
      });
    }
  } catch (error) {
    console.log(error);
    res.status(500).json({
      ok: false,
      msg: "Puede ser que Id no sea valido, Hable con el administrador",
    });
  }
};
