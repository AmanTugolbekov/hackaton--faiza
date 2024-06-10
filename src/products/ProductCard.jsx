import zIndex from "@mui/material/styles/zIndex";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useProducts } from "../context/ProductContextProvider";
import { useCart } from "../context/CartContextProvider";
import { ADMIN } from "../helpers/const";
import { useAuth } from "../context/AuthContextProvider";

const ProductCard = ({ elem }) => {
  const navigate = useNavigate();
  const { deleteProduct } = useProducts();
  const { addProductToCart, checkProductInCart } = useCart();
  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  const { user } = useAuth();
  return (
    <div>
      <div
        className="popular-dishes_card"
        style={{
          display: "flex",
          margin: "0 0 103px -27px",
          justifyContent: "space-between",
        }}
      >
        <div
          className="dish-card"
          style={{
            height: "600px",
            width: "400px",
            margin: "0 0 60px 27px",
            padding: "24px 25px 40px 0",
            border: "1px solid #db5b35",
            boxSizing: "border-box",
            display: "flex",
            flexDirection: "column",
            justifyContent: "space-between",
            position: "relative",
          }}
        >
          <div
            className="open-card-detail"
            style={{
              position: "absolute",
              top: 0,
              bottom: "50%",
              right: 0,
              left: 0,
              cursor: "pointer",
            }}
          ></div>
          <div className="dish-card_heading">
            <h3
              className="dish-card_h3"
              datatype="height"
              style={{
                display: "flex",
                alignItems: "center",
                justifyContent: "space-between",
                fontWeight: 600,
                fontSize: "25px",
                lineHeight: "140%",
                color: "#333333",
                margin: "0 0 15px 25px",
              }}
            >
              {elem.title}
            </h3>
          </div>
          <div
            className="dish-card_description"
            style={{
              height: "100%",
              display: "flex",
              flexDirection: "column",
              justifyContent: "space-between",
            }}
          >
            <div className="dish-card_img">
              <img
                style={{
                  width: "371px",
                  height: "247px",
                  objectFit: "cover",
                }}
                src={elem.image}
                alt=""
              />
            </div>
            <div
              className="dish-card_description--text"
              style={{ padding: "15px 0 0 25px" }}
            >
              <p>{elem.description}</p>
              <div
                className="cost-dish-all"
                style={{
                  position: "relative",
                  zIndex: 10,
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "space-between",
                  margin: "0 0 15px 0",
                }}
              >
                <div
                  className="cost-dish active"
                  style={{
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    padding: "13px 20px",
                    marginTop: "10px",
                    cursor: "pointer",
                    transition: "0.2s",
                    boxSizing: "border-box",
                    border: "1px solid rgb(219, 91, 53)",
                  }}
                >
                  <span
                    className="cost-dish_span"
                    style={{
                      display: "flex",
                      alignItems: "center",
                      fontStyle: "italic",
                      fontWeight: "300",
                      fontSize: "16px",
                      lineHeight: "94%",
                      textAlign: "center",
                      color: "#333333",
                    }}
                  >
                    {elem.gramm}гр /
                  </span>
                  <span
                    style={{
                      fontStyle: "normal",
                      fontWeight: 600,
                      lineHeight: "100%",
                      margin: "0 0 0 5px",
                    }}
                  >
                    {elem.price}с
                  </span>
                </div>
              </div>
              <div
                className="add-cart"
                style={{
                  backgroundColor: checkProductInCart(elem.id)
                    ? "red"
                    : "#f8f2e7",
                  color: checkProductInCart(elem.id) ? "white" : "#333333",
                  position: "relative",
                  zIndex: 10,
                  fontWeight: 600,
                  fontSize: "18px",
                  lineHeight: "100%",
                  textTransform: "uppercase",
                  textAlign: "center",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "space-between",
                  padding: "17px 10px",
                  transition: "0.2s",
                  cursor: "pointer",
                }}
                onClick={() => addProductToCart(elem)}
              >
                Добавить в заказ
              </div>
              {user.email === ADMIN ? (
                <div
                  style={{
                    display: "flex",
                    justifyContent: "space-between",
                    paddingTop: "20px",
                  }}
                >
                  <button
                    onClick={() => deleteProduct(elem.id)}
                    style={{
                      width: "170px",
                      height: "40px",
                      background: "#f8f2e7",
                      border: "1px solid rgb(219, 91, 53)",
                      fontWeight: 600,
                      cursor: "pointer",
                    }}
                    className="btnDelete"
                  >
                    УДАЛИТЬ
                  </button>
                  <button
                    className="btnEdit"
                    onClick={() => navigate(`/edit/${elem.id}`)}
                    style={{
                      width: "170px",
                      height: "40px",
                      background: "#f8f2e7",
                      fontWeight: 600,
                      border: "1px solid rgb(219, 91, 53)",
                      cursor: "pointer",
                    }}
                  >
                    РЕДАКТИРОВАТЬ
                  </button>
                </div>
              ) : (
                ""
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductCard;
