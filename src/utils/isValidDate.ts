import { Request } from "express";
import { CustomValidator } from "express-validator";
import moment from "moment";
export const isValidDate: CustomValidator = (value): Boolean => {
  console.log("con parse: ", Date.parse(value));
  console.log("sin parse: ", value);
  console.log("moment: ", moment(value).toDate());
  const date = Date.parse(value);
  const isDate = moment(value).toDate();
  if (!isDate) {
    return false;
  }
  if (moment(+date).isValid()) {
    return true;
  } else {
    return false;
  }
};
