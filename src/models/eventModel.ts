import moment from "moment";
import { Schema, Document, model } from "mongoose";

export type objectID = Schema.Types.ObjectId;
export interface IEvent extends Document {
  title: string;
  description: string;
  start: Date;
  end: Date;
  user: Schema.Types.ObjectId;
}
const eventSchema = new Schema({
  title: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: false,
  },
  start: {
    type: Date,
    required: true,
  },
  end: {
    type: Date,
    required: true,
  },
  user: {
    type: Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
});
eventSchema.set("toJSON", {
  transform: (document, returnedObject) => {
    returnedObject.id = returnedObject._id;
    returnedObject.start = moment(returnedObject.start).toDate();
    delete returnedObject._id;
    delete returnedObject.__v;
  },
});
export default model<IEvent>("Event", eventSchema);
