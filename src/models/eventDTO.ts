import { ICRUD } from "../interfaces/ICrud";
import { IEvent } from "../interfaces/IEvent";
import Event from "../models/eventModel";

export class EventDTO implements ICRUD {
  private static instance: EventDTO;

  private constructor() {}
  public static getInstance(): EventDTO {
    if (!EventDTO.instance) {
      EventDTO.instance = new EventDTO();
    }
    return EventDTO.instance;
  }

  list() {}
  create() {}
  updateById() {}
  readById() {}
  deleteById() {}
}
