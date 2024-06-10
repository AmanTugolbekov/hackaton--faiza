import React, { useState } from "react";
import { useProducts } from "../context/ProductContextProvider";
import { Box, Button, TextField, Typography } from "@mui/material";
import { Form } from "react-router-dom";

const AddProduct = () => {
  const { addProduct } = useProducts();
  const [product, setProduct] = useState({
    title: "",
    image: "",
    price: 0,
    gramm: 0,
    description: "",
  });
  const handleInput = (e) => {
    if (e.target.name == "price") {
      const obj = {
        ...product,
        [e.target.name]: Number(e.target.value),
      };
      setProduct(obj);
    } else if (e.target.name == "gramm") {
      const obj = {
        ...product,
        [e.target.name]: Number(e.target.value),
      };
      setProduct(obj);
    } else {
      const obj = {
        ...product,
        [e.target.name]: e.target.value,
      };
      setProduct(obj);
    }
  };
  const handleClick = () => {
    addProduct(product);
  };
  return (
    <div className="form-wrapper">
      <div className="form-container">
        <h2>Add Product Form</h2>
        <form>
          <input
            onChange={handleInput}
            type="text"
            placeholder="Title"
            name="title"
            required
          />
          <input
            onChange={handleInput}
            type="text"
            placeholder="Image URL"
            name="image"
            required
          />
          <input
            onChange={handleInput}
            type="text"
            placeholder="Description"
            name="description"
            required
          />
          <input
            onChange={handleInput}
            type="number"
            placeholder="Gramm"
            name="gramm"
            required
          />
          <input
            onChange={handleInput}
            type="number"
            placeholder="Price"
            name="price"
            required
          />
          <button onClick={handleClick} type="submit">
            Add Product
          </button>
        </form>
      </div>
    </div>
  );
};

export default AddProduct;
