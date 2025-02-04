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

const corsOptions = {
  origin: function (origin, callback) {
    const allowedOrigins = [
      "http://localhost:3000",
      "https://67a213b8b61bc5389cb0ab7a--loccocommerce.netlify.app",
    ];

    if (!origin || allowedOrigins.includes(origin)) {
      callback(null, origin); // Dynamically allow the requesting origin
    } else {
      callback(new Error("Not allowed by CORS"));
    }
  },
  credentials: true, // Allows cookies, authentication headers, etc.
  methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
  allowedHeaders: ["Content-Type", "Authorization"],
  optionsSuccessStatus: 200,
};

app.use(cors(corsOptions));
app.options("*", cors(corsOptions));

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
