import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useProducts } from "../context/ProductContextProvider";
import { Box, Button, TextField, Typography } from "@mui/material";

const EditProduct = () => {
  const { id } = useParams();
  const { getOneProduct, editProduct, oneProduct } = useProducts();
  const navigate = useNavigate();

  useEffect(() => {
    getOneProduct(id);
  }, []);
  const [product, setProduct] = useState({
    title: "",
    description: "",
    price: 0,
    gramm: 0,
    image: "",
  });
  useEffect(() => {
    setProduct(oneProduct);
  }, [oneProduct]);
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
    editProduct(id, product);
    navigate("/products");
  };
  return (
    <div className="form-wrapper">
      <div className="form-container">
        <h2>Edit Product Form</h2>
        <form>
          <input
            onChange={handleInput}
            type="text"
            placeholder="Title"
            name="title"
            value={product.title}
            required
          />
          <input
            onChange={handleInput}
            type="text"
            placeholder="Image URL"
            name="image"
            value={product.image}
            required
          />
          <input
            onChange={handleInput}
            type="text"
            placeholder="Description"
            name="description"
            value={product.description}
            required
          />
          <input
            onChange={handleInput}
            type="number"
            placeholder="Gramm"
            name="gramm"
            value={product.gramm}
            required
          />
          <input
            onChange={handleInput}
            type="number"
            placeholder="Price"
            name="price"
            value={product.price}
            required
          />
          <button onClick={handleClick} type="submit">
            Save Product
          </button>
        </form>
      </div>
    </div>
  );
};

export default EditProduct;
