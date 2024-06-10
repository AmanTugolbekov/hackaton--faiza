import React, { useEffect, useState } from "react";
import { useProducts } from "../context/ProductContextProvider";
import { useSearchParams } from "react-router-dom";
import { Box } from "@mui/material";
import ProductCard from "./ProductCard";
import PaginationControlled from "./PaginationControlled";

const ProductList = () => {
  const { getProducts, products } = useProducts();
  const [page, setPage] = useState(1);

  //! --------------- SEARCH ----------------
  const [searchParams, setSearchParams] = useSearchParams();
  useEffect(() => {
    getProducts();
    setPage(1);
  }, [searchParams]);
  //! ---------------- PAGINATION -------------
  const itemPerPage = 6;
  const count = Math.ceil(products.length / itemPerPage);
  const currentData = () => {
    const begin = (page - 1) * itemPerPage;
    const end = begin + itemPerPage;
    return products.slice(begin, end);
  };
  //! ------------------ HANDLECHANGE ------------
  const handleChange = (e, value) => {
    setPage(value);
  };
  //? ------------------ ВЕРСТКА -----------------------
  return (
    <div style={{ marginTop: "20px" }}>
      <Box sx={{ display: "flex", flexWrap: "wrap" }}>
        {currentData().map((elem) => (
          <ProductCard key={elem.id} elem={elem} handleChange={handleChange} />
        ))}
      </Box>
      <PaginationControlled
        page={page}
        count={count}
        handleChange={handleChange}
      />
    </div>
  );
};

export default ProductList;
