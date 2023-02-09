import moment from "moment";
import { ObjectId } from "mongoose";

export const comparIdUsers = (user_id: ObjectId, user_id_header: ObjectId) => {
  if (user_id !== user_id_header) {
    throw new Error(
      "[POST/CREAR => Evento] Ser detecto una inconsistencia con el id del usuario"
    );
  }
};
