// Initiate the server and connect to the database
const express = require("express");
const server = express();
const port = 3000;
const { request, response } = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
require("dotenv").config();
const { DB_URI } = process.env;
const Products = require("./models/products");

//Middleware
server.use(express.json());
server.use(express.urlencoded({ extended: true }));
server.use(cors()); // Enable CORS for all requests to the server (Cross-Origin Resource Sharing) - This is needed to allow the frontend to make requests to the backend server

// Connect to the database
mongoose
  .connect(DB_URI)
  .then(() => {
    server.listen(port, () => {
      console.log(`Server is running on port ${port}`);
    });
  })
  .catch((error) => {
    console.log("Error connecting to the database", error.message);
  });

// Routes
server.get("/", (request, response) => {
  response.send("Live");
});

server.get("/products", async (request, response) => {
  try {
    const products = await Products.find();
    response.send(products);
  } catch (error) {
    response.status(500).json({ message: error.message });
  }
});

server.post("/add-products", async (request, response) => {
  const { id, name, brand, price, image } = request.body;
  const newProducts = new products({
    name,
    products: { id, brand, name },
    image,
  });
  try {
    await newProducts.save();
    response.status(201).json({ message: "Products added successfully" });
  } catch (error) {
    response.status(400).json({ message: error.message });
  }
});

server.delete("/products/:id", async (request, response) => {
  const { id } = request.params;
  const objectId = new mongoose.Types.ObjectId(id); // Convert id to Mongoose ObjectId
  try {
    await Products.findByIdAndDelete(objectId);
    response.status(200).json({ message: "Products deleted successfully" });
  } catch (error) {
    response.status(404).json({ message: error.message });
  }
});

server.patch("/products/:id", async (request, response) => {
  const { id } = request.params;
  const { name, brand, price, image } = request.body;
  const objectId = new mongoose.Types.ObjectId(id); // Convert id to Mongoose ObjectId
  try {
    await products.findByIdAndUpdate(id, {
      name,
      products: { id, brand,name },
      image,
    }).then((response) => {
      console.log(response);
    });

    await response
      .status(200)
      .json({ message: "Products updated successfully" });
  } catch (error) {
    response.status(404).json({ message: error.message });
  }
});