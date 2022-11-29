import express from "express";
import bodyParser from "body-parser";

const app = express();
const router = express.Router();
app.use(bodyParser.json());
app.use(express.static("dist"));
app.use("/", router);

router.get("/hello", function (_, res) {
  res.status(200).send("hello!");
});

app.listen(4000);
