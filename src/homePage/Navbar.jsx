import { Badge, MenuItem, Typography } from "@mui/material";
import React from "react";
import { Link } from "react-router-dom";
import { useCart } from "../context/CartContextProvider";
import { getProductsCountInCart } from "../helpers/functions";
import { ShoppingBag, ShoppingCart } from "@mui/icons-material";
import { useAuth } from "../context/AuthContextProvider";
const pages = [{ id: 2, title: "Меню", link: "/products" }];

const Navbar = () => {
  const [anchorElNav, setAnchorElNav] = React.useState(null);
  const [anchorElUser, setAnchorElUser] = React.useState(null);
  const { user, handleLogOut } = useAuth();
  const [badgeCount, setBadgeCount] = React.useState(0);
  const { addProductToCart } = useCart();
  React.useEffect(() => {
    setBadgeCount(getProductsCountInCart());
  }, [addProductToCart]);

  const handleOpenNavMenu = (event) => {
    setAnchorElNav(event.currentTarget);
  };
  const handleOpenUserMenu = (event) => {
    setAnchorElUser(event.currentTarget);
  };

  const handleCloseNavMenu = () => {
    setAnchorElNav(null);
  };

  const handleCloseUserMenu = () => {
    setAnchorElUser(null);
  };

  return (
    <div
      style={{
        backgroundColor: "wheat",
        display: "flex",
        justifyContent: "space-evenly",
        height: "50px",
        alignItems: "center",
      }}
    >
      {pages.map((elem) => (
        <Link key={elem.id} to={elem.link} style={{ textDecoration: "none" }}>
          <MenuItem>
            <Typography sx={{ color: "black", textTransform: "uppercase" }}>
              {elem.title}
            </Typography>
          </MenuItem>
        </Link>
      ))}
      <Link to={"/cart"}>
        <Badge badgeContent={badgeCount} color="success">
          <ShoppingBag sx={{ color: "black" }} />
        </Badge>
      </Link>
      {user ? (
        <MenuItem onClick={() => handleLogOut()}>
          <Typography sx={{ color: "darkBlue" }}>Выйти из аккаунта</Typography>
        </MenuItem>
      ) : (
        <Link to={"/auth"}>
          <MenuItem>
            <Typography
              sx={{ color: "blue", textDecoration: "none" }}
              textAlign={"center"}
            >
              Зарегистрироваться
            </Typography>
          </MenuItem>
        </Link>
      )}
    </div>
  );
};

export default Navbar;
