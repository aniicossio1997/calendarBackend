import mongoose from "mongoose";
import config from "./config/config";

(async () => {
  const connectionParams={
    useNewUrlParser: true,
    useCreateIndex: true,
    useUnifiedTopology: true 
}
  try {
    const db = await mongoose.connect(config.DB.MONGO_URI);
    
    db.connection
      .on("error", (err) => {
        console.log(`There was an error connecting to the database: ${err}`);
      })
      .once("open", () => {
        console.log(
          `You have successfully connected to your mongo database: ${config.DB.MONGO_DATABASE}`
        );
      });
    console.log("Databse is connected to: ", config.DB.MONGO_DATABASE);
  } catch (error) {
    console.error("[ERROR:] Cannot connect to the database.");
  }
})();
