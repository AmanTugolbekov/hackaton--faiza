import { Button, useScrollTrigger } from "@mui/material";
import React, { useState } from "react";
import AddProduct from "../products/AddProduct";
import AddCategory from "../products/AddCategory";

const AdminPage = () => {
  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  return (
    <div>
      <Button onClick={handleOpen}>Add category</Button>
      <AddProduct />
      <AddCategory open={open} handleClose={handleClose} />
    </div>
  );
};

export default AdminPage;
