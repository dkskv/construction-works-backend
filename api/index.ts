import express from "express";
import bodyParser from "body-parser";

const app = express();
const router = express.Router();
app.use(bodyParser.json());
app.use("/", router);

router.get("/hello", function (_, res) {
  res.status(200).send("hello!");
});

router.get("/api", function (_, res) {
  res.status(200).send("api!");
});

router.get("/api/hello", function (_, res) {
  res.status(200).send("api hello!");
});

app.listen(4000);
