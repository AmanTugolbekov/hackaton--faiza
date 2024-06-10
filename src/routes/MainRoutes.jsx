import React from "react";
import { Navigate, Route, Routes } from "react-router-dom";
import ProductPage from "../pages/ProductPage";
import AdminPage from "../pages/AdminPage";
import AuthPage from "../pages/AuthPage";
import NotFoundPage from "../pages/NotFoundPage";
import { ADMIN } from "../helpers/const";
import EditProduct from "../products/EditProduct";
import { useAuth } from "../context/AuthContextProvider";
import Cart from "../cart/Cart";

const MainRoutes = () => {
  const { user } = useAuth();
  const PUBLIC_ROUTES = [
    { id: 1, link: "/products", element: <ProductPage /> },
    { id: 2, link: "/cart", element: <Cart /> },
    { id: 3, link: "/auth", element: <AuthPage /> },
    { id: 4, link: "*", element: <NotFoundPage /> },
  ];
  const PRIVATE_ROUTES = [
    { id: 5, link: "/edit/:id", element: <EditProduct /> },
    { id: 6, link: "/admin", element: <AdminPage /> },
  ];
  return (
    <div>
      <Routes>
        {PUBLIC_ROUTES.map((elem) => (
          <Route key={elem.id} path={elem.link} element={elem.element} />
        ))}
        {user
          ? PRIVATE_ROUTES.map((elem) => (
              <Route
                key={elem.id}
                path={elem.link}
                element={
                  user.email === ADMIN ? elem.element : <Navigate to="*" />
                }
              />
            ))
          : null}
      </Routes>
    </div>
  );
};
export default MainRoutes;
