import app from "./app";
import { appDataSource } from "./data-source";

appDataSource
  .initialize()
  .then(() => {
    console.log("database connected");
    app.listen(3000, () => {
      console.log("server is running");
    });
  })
  .catch((error) => {
    console.log(error);
  });
