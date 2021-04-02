import React from "react";
import { Nav } from "react-bootstrap";
import Sidebar from "../Sidebar/Sidebar";

function Admin({ products }) {
  console.log(products);
  return (
    <div>
      <Sidebar products={products} />
    </div>
  );
}

export default Admin;
