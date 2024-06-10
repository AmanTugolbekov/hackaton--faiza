import {
  Button,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
} from "@mui/material";
import React, { useState } from "react";
import { useCart } from "../context/CartContextProvider";

const Cart = () => {
  const { cart, changeProductCount, deleteProductFromCart } = useCart();
  console.log(cart);

  const [input, setInput] = useState();
  return (
    <div
      style={{
        display: "flex",
        justifyContent: "center",
        marginTop: "20px",
      }}
    >
      <TableContainer
        component={Paper}
        sx={{ width: "550px", backgroundColor: "#f8f2e7" }}
      >
        <Table
          aria-label="simple table"
          sx={{ minWidth: "550px", maxWidth: "550px", display: "flex" }}
        >
          <TableBody>
            {cart.products.map((elem) => (
              <TableRow key={elem.id} sx={{}}>
                <TableCell align="right" component="th" scope="row">
                  <img src={elem.item.image} alt="" width={70} />
                </TableCell>
                <TableCell
                  sx={{
                    paddingRight: "30px",
                  }}
                  align="right"
                >
                  {elem.item.title}
                </TableCell>
                {/*  display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    padding: "13px 20px",
                    marginTop: "10px",
                    cursor: "pointer",
                    transition: "0.2s",
                    boxSizing: "border-box",
                    border: "1px solid rgb(219, 91, 53)", */}
                <TableCell
                  sx={{
                    width: "120px",
                    height: "40px",
                    marginTop: "0px",
                    marginBottom: "0px",
                    border: "1px solid rgb(219, 91, 53)",
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                  }}
                >
                  {elem.item.gramm}гр / {elem.item.price}с
                </TableCell>
                <TableCell
                  align="right"
                  sx={{
                    display: "flex",
                    background: "wheat",
                    padding: "2px 14px",
                    alignItems: "center",
                    justifyContent: "space-between",
                    border: "1px solid #fafaf4",
                  }}
                >
                  <div
                    style={{ cursor: "pointer" }}
                    onClick={() => {
                      changeProductCount(elem.item.id, Number(elem.count) - 1);
                    }}
                  >
                    -
                  </div>
                  <input
                    onChange={(e) =>
                      changeProductCount(elem.item.id, e.target.value)
                    }
                    type="change"
                    min={1}
                    max={20}
                    style={{
                      width: "14px",
                      border: "none",
                      background: "wheat",
                    }}
                    defaultValue={elem.count}
                    value={elem.count}
                  />
                  <div
                    style={{ cursor: "pointer" }}
                    onClick={() => {
                      changeProductCount(elem.item.id, Number(elem.count) + 1);
                    }}
                  >
                    +
                  </div>
                </TableCell>
                <TableCell align="right">
                  Сумма за <br /> {elem.item.title} : {elem.subPrice}с
                </TableCell>
                <TableCell align="right">
                  <Button onClick={() => deleteProductFromCart(elem.item.id)}>
                    <img
                      style={{ width: "40px" }}
                      src="data:image/png;base64,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"
                      alt=""
                    />
                  </Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>

        <TableCell
          sx={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          ㅤㅤ Сумма заказа: {cart.totalPrice}с ㅤㅤㅤㅤㅤㅤㅤ
          <Button
            className="cart-link"
            sx={{
              width: "230px",
              height: "40px",
              fontSize: "10px",
              color: "#f8f2e7",
              padding: "12px 13px 10px",
              background: "#da521f",
              cursor: "pointer",
            }}
          >
            ОФОРМИТЬ ДОСТАВКУ
          </Button>
        </TableCell>
      </TableContainer>
    </div>
  );
};

export default Cart;
