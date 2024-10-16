const express = require("express");
const router = express.Router();
const {
  productFormat,
  cartFormat,
  locationsFormat,
  ordersFormat,
} = require("../SchemaModel/schema");
const mongoose = require("mongoose");
const {
  PathParamsContext,
} = require("next/dist/shared/lib/hooks-client-context.shared-runtime");
const mergeSortAscending = require("../sortingAlgorithm");

// Routes

// get data
router.get("/", async (req, res) => {
  const bod = req.query;

  const query = {};
  if (bod.query) {
    const searchTerm = bod.query.trim();

    query.$or = [
      { name: { $regex: searchTerm, $options: "i" } },
      { category: { $regex: searchTerm, $options: "i" } },
      // { description: { $regex: searchTerm, $options: "i" } },
    ];
  }

  if (bod.priceRange) {
    const priceRange = bod.priceRange.split(",").map(Number);
    query.price = { $gte: priceRange[0], $lte: priceRange[1] };
  }

  if (bod.category) {
    query.category = bod.category;
  }

  if (bod.discount) {
    query.discount = { $gte: parseInt(bod.discount) };
  }

  try {
    // Find products based on the constructed query
    const products = await productFormat.find(query);

    const final = bod.sortBy
      ? mergeSortAscending(products, bod.sortBy)
      : products;

    // Return the filtered products
    res.status(200).json(final);
  } catch (error) {
    console.error("Error fetching products:", error);
    res.status(500).json({ message: "Internal Server Error" });
  }
});

// post data
router.post("/newProduct", async (req, res) => {
  const {
    name,
    price,
    category,
    quantity,
    description,
    img,
    productFormat: format,
  } = req.body;

  try {
    const product = await productFormat.create({
      name,
      price,
      category,
      quantity,
      description,
      format,
      img, // Assuming 'productFormat' refers to the format of the product
    });
    res.status(200).json(product);
  } catch (err) {
    res.status(400).json({ err: err.message });
  }
});

// To update a product
router.patch("/updateProduct/:id", async (req, res) => {
  const { id } = req.params;
  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(404).json({ error: "No such product" });
  }
  const product = await productFormat.findOneAndUpdate(
    { _id: id },
    {
      ...req.body,
    }
  );
  if (!product) {
    return res.status(404).json({ error: "no such product" });
  }
  res.status(200).json(product);
});

// get cart data
router.get("/cartData", async (req, res) => {
  try {
    const cartData = await cartFormat.find({});
    res.json(cartData);
  } catch (err) {
    console.log(err);
    res.status(500).send("Server Error");
  }
});

// post cart data
router.post("/cartData", async (req, res) => {
  const {
    qty,
    price,
    name,
    img,
    category,
    quantity,
    firstTerm,
    cartFormat: format,
  } = req.body;

  try {
    const cart = await cartFormat.create({
      qty,
      price,
      name,
      img,
      category,
      quantity,
      firstTerm,
      format, // Assuming 'productFormat' refers to the format of the product
    });
    res.status(200).json(cart);
  } catch (err) {
    res.status(400).json({ err: err.message });
  }
});

// update cart
router.patch("/cartData/:id", async (req, res) => {
  const { id } = req.params;
  const { price, qty } = req.body;

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(404).json({ error: "No such product" });
  }

  try {
    // Find and update the document
    const product = await cartFormat.findOneAndUpdate(
      { _id: id },
      { price: price, qty: qty }, // Use `quantity` from the request body
      { new: true }
    );

    // If no matching document found
    if (!product) {
      return res.status(404).json({ error: "Product not found" });
    }

    // Return the updated document
    res.status(200).json(product);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal server error" });
  }
});

// Delete cart item
router.delete("/cartData/:id", async (req, res) => {
  const { id } = req.params;
  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(404).json({ error: "No such product" });
  }
  const product = await cartFormat.findByIdAndDelete(id);
  if (!product) {
    return res.status(404).json({ error: "no such product" });
  }
  res.status(200).json(product);
  console.log("item already deleted");
});

router.get("/locations", async (req, res) => {
  try {
    const locations = await locationsFormat.find({});
    res.status(200).json(locations);
  } catch (err) {
    console.log(err);
    res.status(500).send("Server Error");
  }
});

router.post("/locations", async (req, res) => {
  const {
    name,
    surname,
    fullAddress,
    additionalInfo,
    phoneNo,
    additionalPhone,
    locationsFormat: format,
  } = req.body;

  try {
    const locations = await locationsFormat.create({
      name,
      surname,
      fullAddress,
      additionalInfo,
      phoneNo,
      additionalPhone,
      format,
    });

    res.status(200).json(locations);
  } catch (err) {
    res.status(400).json({ err: err.message });
  }
});

router.delete("/locations/:id", async (req, res) => {
  const { id } = req.params;

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(404).json({ error: "No such location" });
  }

  const location = await locationsFormat.findByIdAndDelete(id);
  if (!order) {
    return res.status(404).json({ error: "No such location" });
  }
  res.status(200).json(location);
  console.log("location already deleted");
});

router.get("/orders", async (req, res) => {
  try {
    const orders = await ordersFormat.find({});
    res.status(200).json(orders);
  } catch (err) {
    res.status(500).json({ err: err.message });
  }
});

router.post("/orders", async (req, res) => {
  const {
    customerFullName,
    orderNumber,
    totalPrice,
    customerPhone,
    customerAddress,
    products,
    payMethod,
  } = req.body;
  try {
    const order = await ordersFormat.create({
      customerFullName,
      customerPhone,
      customerAddress,
      products,
      orderNumber,
      totalPrice,
      payMethod,
    });

    res.status(200).json(order);
  } catch (err) {
    res.status(500).json({ err: err.message });
  }
});

module.exports = router;
