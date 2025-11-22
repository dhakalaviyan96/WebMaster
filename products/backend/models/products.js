// Initialize mongoose
const mongoose = require("mongoose");
// Define the schema for the products model
const Schema = mongoose.Schema;

const productsSchema = new Schema({
  name: {
    type: String,
    required: true,
  },
  products: {
    price: {
      type: String,
      required: true,
    },
    id: {
      type: String,
      required: true,
    },
   brand: {
      type: String,
      required: true,
    },
  },
  image: {
    type: String,
    required: true,
  },
});
// Create the model for the products schema
const Products = mongoose.model("Products", productsSchema);
module.exports = Products;