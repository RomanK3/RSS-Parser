import "dotenv/config";
import express from "express";
import bodyParser from "body-parser";
import cors from "cors";

import { initDB } from "./source/models/db.js";
import { settings } from "./source/config/settings.js";
import { fetchAndStorePosts } from "./source/services.js";
import router from "./source/routes.js";

const app = express();
app.use(cors());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

const FEED_URL = "https://lifehacker.com/rss";

fetchAndStorePosts(FEED_URL)
  .then(() => {
    console.log("RSS feed fetched and stored successfully");
  })
  .catch((error) => {
    console.error("Error fetching and storing RSS feed:", error);
  });

app.use("", router);

app.listen(settings.port, () => {
  console.log(`TODO app listening on port ${settings.port}!`);
  initDB(settings.mongoHost);
});
