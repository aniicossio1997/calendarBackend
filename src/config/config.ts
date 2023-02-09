import { config } from "dotenv";
config();
const secret = "somesecrettokeny_mind_still_123";
export default {
  DB: {
    MONGO_URI: process.env.MONGO_URI || "mongodb://localhost:27017/calendar",
    MONGO_USER: "",
    MONGO_PASSWORD: "",
    MONGO_DATABASE: "calendar",
  },
  jwtSecret: process.env.SECRET_JWT || secret,
};
// export default {
//   DB: {
//     MONGO_URI: process.env.MONGO_URI || "mongodb://localhost:27017/calendar",
//     MONGO_DATABASE: process.env.MONGO_DATABASE || "calendar",
//     MONGO_USER: process.env.MONGO_USER || "",
//     MONGO_PASSWORD: process.env.MONGO_PASSWORD || "",
//     MONGO_HOST: process.env.MONGO_HOST || "localhost:27017",
//   },
//   jwtSecret: process.env.SECRET_JWT || secret,
// };
