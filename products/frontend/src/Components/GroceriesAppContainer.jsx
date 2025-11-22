import axios from "axios";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import NavBar from "./NavBar";
import ProductsContainer from "./ProductsContainer";
import CartContainer from "./CartContainer";
import ProductsForm from "./ProductsForm";

export default function GroceriesAppContainer() {
  // All products that come from the backend API
  const [products, setProducts] = useState([]);
   // Items currently inside the cart
  const [cartList, setCartList] = useState([]);
   // Quantity selected for each product
  const [productQuantity, setProductQuantity] = useState([]);
 // Initial shape of the form (used for add / edit product)
  const initialFormData = {
    id: "",
    productName: "",   // 
    brand: "",
    price: "",
    image: "",
  };

  const [formData, setFormData] = useState(initialFormData);
  const [isEditing, setIsEditing] = useState(false);
  // Message to show the result of add  actions
  const [postResponse, setPostResponse] = useState("");
  // React Hook Form
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  // Fetch products function
  // This function loads all products from the backend API.

  const fetchProducts = async () => {
    try {
      const response = await axios.get("http://localhost:3000/products");
      setProducts(response.data);

      // Reset quantity for each item
      setProductQuantity(
        response.data.map((item) => ({
          id: item.id,
          quantity: 0,
        }))
      );
    } catch (error) {
      console.log("Fetch Error:", err.message);
    }
  };

  // Load products from DB on start
  useEffect(() => {
    fetchProducts();
  }, []);
  // Form handlers
  const handleOnChange = (error) => {
    setFormData({ ...formData, [error.target.name]: error.target.value });
  };
// This runs when the form is submitted Add Product / Update Product.
  const handleOnSubmit = async () => {
    try {
      // 
      const productdata = {
        id: formData.id,
        productName: formData.productName,  
        brand: formData.brand,
        price: formData.price,
        image: formData.image,
      };

      if (isEditing) {
        // Update existing product in the database
        await axios.patch(
          `http://localhost:3000/products/${formData.id}`,
          productdata
        );
        setPostResponse("Product updated successfully");
        setIsEditing(false);
      } else {
        // Add a new product to the database
        await axios.post("http://localhost:3000/add-products", productdata);
        setPostResponse("Product added successfully");
      }

      // Clear form and refresh the productslist
      setFormData(initialFormData);
      fetchProducts();
    } catch (error) {
      console.log("Submit Error:", error.message);
      setPostResponse(
        error.response?.data?.message || "Failed to add/update product."
      );
    }
  };

  const handleEdit = (item) => {
    setIsEditing(true);
    setFormData({
      id: item.id,
      productName: item.productName   , 
      brand: item.brand ,
      price: item.price ,
      image: item.image ,
      _id: item._id,
    });
  };
// Delete a product from the database by id.
  const handleDelete = async (id) => {
    try {
      await axios.delete(`http://localhost:3000/products/${id}`);
      setPostResponse("Product deleted");
      fetchProducts();
    } catch (errors) {
      console.log("Delete Error:", errors.message);
    }
  };


  // Quantity handlers
  const handleAddQuantity = (productId, mode) => {
    if (mode === "cart") {
      const newCartList = cartList.map((product) =>
        product.id === productId
          ? { ...product, quantity: product.quantity + 1 }
          : product
      );
      setCartList(newCartList);
    } else {
       // Changes quantity for the product before it is added to the cart
      const updated = productQuantity.map((product) =>
        product.id === productId
          ? { ...product, quantity: product.quantity + 1 }
          : product
      );
      setProductQuantity(updated);
    }
  };
// Remove quantity for a product
  const handleRemoveQuantity = (productId, mode) => {
    if (mode === "cart") {
      const updated = cartList.map((product) =>
        product.id === productId && product.quantity > 1
          ? { ...product, quantity: product.quantity - 1 }
          : product
      );
      setCartList(updated);
    } else {
      const updated = productQuantity.map((product) =>
        product.id === productId && product.quantity > 0
          ? { ...product, quantity: product.quantity - 1 }
          : product
      );
      setProductQuantity(updated);
    }
  };

  // Add to cart
  const handleAddToCart = (productId) => {
    const product = products.find((product) => product.id === productId);
    const quantity = productQuantity.find((product) => product.id === productId);

    if (!quantity || quantity.quantity === 0) {
      alert(`Please select quantity for ${product.productName || product.name}`);
      return;
    }

    // Copies current cart list
    const updatedCart = [...cartList];
    // Checks if this product is already inside the cart
    const existing = updatedCart.find((product) => product.id === productId);
    if (existing) {
      existing.quantity += quantity.quantity;
    } else {
      // push a new item into the cart
      updatedCart.push({ ...product, quantity: quantity.quantity });
    }

    setCartList(updatedCart);
  };

  // Cart remove / clear
   // Remove a single product from the cart
  const handleRemoveFromCart = (productId) => {
    setCartList(cartList.filter((product) => product.id !== productId));
  };
  // Remove all items from the cart
  const handleClearCart = () => {
    setCartList([]);
  };

  return (
  <div className="GroceriesApp">
    <NavBar quantity={cartList.length} />

    <div className="GroceriesApp-Container">
      
      <section className="GroceriesApp-FormColumn">
        <h3>Product Form</h3>

        <ProductsForm
          isEditing={isEditing}
          formData={formData}
          handleOnChange={handleOnChange}
          handleOnSubmit={handleOnSubmit}
          register={register}
          handleSubmit={handleSubmit}
          errors={errors}
        />

        
      </section>

      
      <section className="GroceriesApp-ProductsColumn">
        <h2>Groceries</h2>

        <ProductsContainer
          products={products}
          productQuantity={productQuantity}
          handleAddQuantity={handleAddQuantity}
          handleRemoveQuantity={handleRemoveQuantity}
          handleAddToCart={handleAddToCart}
          handleEdit={handleEdit}
          handleDelete={handleDelete}
        />
      </section>

      
      <section className="GroceriesApp-CartColumn">
        <CartContainer
          cartList={cartList}
          handleRemoveFromCart={handleRemoveFromCart}
          handleAddQuantity={handleAddQuantity}
          handleRemoveQuantity={handleRemoveQuantity}
          handleClearCart={handleClearCart}
        />
      </section>
    </div>
  </div>
);
}
