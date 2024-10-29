require("dotenv").config();
const mongoose = require("mongoose");
const express = require("express");
const cors = require("cors");
const workRoutes = require("./Router/routes");
const userRoutes = require("./Router/user");
// const pageGutter = require("./pageGutter");
// const { productFormat, cartFormat } = require("./SchemaModel/schema");

const app = express();

// middleware
app.use(express.json());
app.use(
  cors({
    origin: "http://localhost:3000",
    credentials: true,
  })
);
app.use((req, res, next) => {
  console.log(`${req.path} :: ${req.method}`);
  next();
});

// routes
app.use("/products", workRoutes);
app.use("/user", userRoutes);

// connecting to the database
mongoose
  .connect(process.env.DATABASE_URI)
  .then(() => {
    app.listen(process.env.PORT, () => {
      console.log(
        `connected to db and app is listening on PORT ${process.env.PORT}...`
      );
    });
  })
  .catch((err) => {
    console.log(err);
  });

// // routes
// let pageNumber = null;

// // Define the GET route handler for "/"
// app.get("/", async (req, res) => {
//   if (!pageNumber) {
//     // If pageNumber is not set, return all products
//     const products = await productFormat.find({});
//     return res.status(200).json(products);
//   }

//   // If pageNumber is set, apply page gutter logic
//   const products = await productFormat.find({});
//   const result = pageGutter(products, pageNumber);
//   res.status(200).json(result);
// });

// // Define the POST route handler for "/page"
// app.post("/page", (req, res) => {
//   const { page } = req.body;
//   pageNumber = page;
//   res.send("Page number updated successfully");
// });
