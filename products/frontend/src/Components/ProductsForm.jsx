import React from "react";
 
export default function ProductForm({
  isEditing,
  formData,
  handleOnChange,
  handleOnSubmit,
  register,
  handleSubmit,
  errors,
}) {
  return (
    <div className="product-form">
      <form onSubmit={handleSubmit(handleOnSubmit)}>
        {}
        <div>
          <input
            type="text"
            name="id"
            {
             
              ...(isEditing
                ? {}
                : register("id", {
                    required: "ID is required",
                    pattern: {
                      value: /^[0-9]+$/,
                      message: "ID should contain only numbers",
                    },
                  }))
            }
            value={formData.id}
            onChange={handleOnChange}
            placeholder="Product ID"
          />
          {errors.id && (
            <span style={{ color: "red" }}>{errors.id.message}</span>
          )}
        </div>
 
        {/* Product Name */}
        <div>
          <input
            type="text"
            name="productName"
            {...(isEditing
              ? {}
              : register("productName", {
                  required: "Product name is required",
                  pattern: {
                    value: /^[a-zA-Z0-9\s]+$/,
                    message: "Product name should be letters/numbers only",
                  },
                }))}
            value={formData.productName}
            onChange={handleOnChange}
            placeholder="Product Name"
          />
          {errors.productName && (
            <span style={{ color: "red" }}>{errors.productName.message}</span>
          )}
        </div>
 
        {/* Brand */}
        <div>
          <input
            type="text"
            name="brand"
            {...(isEditing
              ? {}
              : register("brand", {
                  required: "Brand is required",
                }))}
            value={formData.brand}
            onChange={handleOnChange}
            placeholder="Brand"
          />
          {errors.brand && (
            <span style={{ color: "red" }}>{errors.brand.message}</span>
          )}
        </div>
 
        {/* Price */}
        <div>
          <input
            type="text"
            name="price"
            {...(isEditing
              ? {}
              : register("price", {
                  required: "Price is required",
                  pattern: {
                    // allows: 3.65, $3.65, 3, 3.6 etc.
                    value: /^\$?\d+(\.\d{1,2})?$/,
                    message: "Price should be like 3.65 or $3.65",
                  },
                }))}
            value={formData.price}
            onChange={handleOnChange}
            placeholder="Price (e.g. $3.65)"
          />
          {errors.price && (
            <span style={{ color: "red" }}>{errors.price.message}</span>
          )}
        </div>
 
        {/* Image URL */}
        <div>
          <input
            type="text"
            name="image"
            {...(isEditing
              ? {}
              : register("image", {
                  required: "Image URL is required",
                  pattern: {
                    value: /^(https?|chrome):\/\/[^\s$.?#].[^\s]*$/,
                    message: "Invalid URL",
                  },
                }))}
            value={formData.image}
            onChange={handleOnChange}
            placeholder="Image URL"
          />
          {errors.image && (
            <span style={{ color: "red" }}>{errors.image.message}</span>
          )}
        </div>
 
        <button type="submit">
          {isEditing ? "Update Product" : "Add Product"}
        </button>
      </form>
    </div>
  );
}
 

 
