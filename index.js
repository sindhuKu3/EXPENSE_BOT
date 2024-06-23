const dotenv = require("dotenv");
dotenv.config();
const express = require("express");
const cors = require("cors");
const { db } = require("./db/db");
const app = express();
const transactionRoute = require("./routes/transaction");
const path = require("path");
const PORT = process.env.PORT;

//middlewares
app.use(express.static(path.resolve(__dirname, "build")));
app.use(express.urlencoded({ extended: false }));
app.use(express.json());

app.use(
  cors({
    methods: ["POST", "GET"],
    credentials: true,
  })
);

app.set("trust proxy", 1);
app.get("/", (req, res) => {
  res.json({ status: "success" });
});
app.use("/transaction", transactionRoute);
// app.use("/transaction",transaction) ;
const server = () => {
  db();
  app.listen(PORT, () => {
    console.log(`server started at PORT ${PORT}`);
  });
};
server();
