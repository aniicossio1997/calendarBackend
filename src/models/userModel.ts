import { Schema, model, Document } from "mongoose";
import bcrypt from "bcryptjs";
import mongoose from "mongoose";

export interface IUser extends Document {
  email: string;
  password: string;
  name: string;
  comparePassword: (password: string) => Promise<boolean>;
}
const userSchema = new Schema({
  email: {
    type: String,
    unique: true,
    required: true,
    trim: true,
    lowercase: true,
  },
  password: {
    type: String,
    required: true,
  },
  name: {
    type: String,
    required: true,
  },
  // events: [
  //   {
  //     type: Schema.Types.ObjectId,
  //     ref: "Event",
  //     required: false,
  //   },
  // ],
});
userSchema.pre<IUser>("save", async function (next) {
  const user = this;
  if (!user.isModified("password")) return next();

  const salt = await bcrypt.genSaltSync();
  const hash = await bcrypt.hashSync(user.password, salt);
  user.password = hash;

  next();
});
userSchema.set("toJSON", {
  transform: (document, returnedObject) => {
    returnedObject.id = returnedObject._id;
    delete returnedObject._id;
    delete returnedObject.__v;
    delete returnedObject.password;
  },
});
userSchema.methods.comparePassword = async function (
  password: string
): Promise<Boolean> {
  return await bcrypt.compareSync(password, this.password);
};

export default model<IUser>("User", userSchema);
//export default User;
// export const User_all = () => {
//   let users: any;
//   User.find({}).then((result) => {
//     users = result.map((u) => {
//       name: u.name;
//       email: u.email;
//       _id: u._id;
//       password: u.password;
//     });
//     mongoose.connection.close();
//   });
// };
