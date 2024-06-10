import { type } from "@testing-library/user-event/dist/type";
import axios from "axios";
import React, { createContext, useContext, useReducer } from "react";
import { API, API_CATEGORIES } from "../helpers/const";
import { useNavigate } from "react-router-dom";
import { create } from "@mui/material/styles/createTransitions";
const productContext = createContext();
export const useProducts = () => useContext(productContext);

const ProductContextProvider = ({ children }) => {
  const navigate = useNavigate();
  //! -------------- INIT_STATE --------------------
  const INIT_STATE = {
    products: [],
    oneProduct: {},
    categories: [],
  };
  //! --------------- reducer ----------------------
  const reducer = (state = INIT_STATE, action) => {
    switch (action.type) {
      case "GET_PRODUCTS":
        return { ...state, products: action.payload };
      case "GET_ONE_PRODUCT":
        return { ...state, oneProduct: action.payload };
      case "GET_CATEGORIES":
        return { ...state, categories: action.payload };
    }
  };
  //! ---------------- CREATE ----------------------
  const [state, dispatch] = useReducer(reducer, INIT_STATE);
  const addProduct = async (newProduct) => {
    axios.post(API, newProduct);
    navigate("/products");
  };
  //! ---------------- GETPRODUCTS ------------------
  const getProducts = async () => {
    const { data } = await axios(API);
    dispatch({
      type: "GET_PRODUCTS",
      payload: data,
    });
  };
  //! ---------------- GETONEPRODUCT -----------------
  const getOneProduct = async (id) => {
    const { data } = await axios(`${API}/${id}`);
    dispatch({
      type: "GET_ONE_PRODUCT",
      payload: data,
    });
  };
  //! ---------------- DELETE -----------------------
  // сюда в пропсы (id) передайте айдишку елемента которого хотим удалить
  const deleteProduct = async (id) => {
    await axios.delete(`${API}/${id}`);
    getProducts();
  };
  //! ---------------- EDIT -------------------------
  // сюда в параметры надо передать айди (id) элемента которого изменяем, и новый измененный обьект (editedProduct)
  const editProduct = async (id, editedProduct) => {
    await axios.patch(`${API}/${id}`, editedProduct);
  };
  //! ---------------- GETCATEGORIES ----------------
  const getCategories = async () => {
    const { data } = await axios(API_CATEGORIES);
    dispatch({
      type: "GET_CATEGORIES",
      payload: data,
    });
  };
  //! ---------------- CREATECATEGORIES -------------
  const createCategory = async (newCategory) => {
    await axios.post(API_CATEGORIES, newCategory);
    getCategories();
  };
  //! ---------------- FILTER -----------------------
  const fetchByParams = (query, value) => {
    const search = new URLSearchParams(window.location.search);
    if (value == "All") {
      search.delete(query);
    } else {
      search.set(query, value);
    }
    const url = `${window.location.pathname}?${search}`;
    navigate(url);
  };
  //! ----------------- VALUES ----------------------
  const values = {
    addProduct,
    getProducts,
    products: state.products,
    deleteProduct,
    editProduct,
    getOneProduct,
    oneProduct: state.oneProduct,
    getCategories,
    createCategory,
    categories: state.categories,
    fetchByParams,
  };
  return (
    <productContext.Provider value={values}>{children}</productContext.Provider>
  );
};

export default ProductContextProvider;
