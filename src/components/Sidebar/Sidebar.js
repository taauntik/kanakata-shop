import React, { useState } from "react";
import { Tabs, Tab, Table } from "react-bootstrap";
import { Button, Container } from "@material-ui/core";
import axios from "axios";

export default function Sidebar({ products }) {
  const [addProduct, setAddProduct] = useState({
    productName: "",
    price: null,
    img: "",
  });
  const handleSubmit = (e) => {
    const url = "https://rhubarb-cobbler-67677.herokuapp.com/addproduct";
    fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(addProduct),
    });
    e.preventDefault();
    alert("now you need to reload the website to see changes");
  };

  const handleBlur = (e) => {
    const product = { ...addProduct };
    product[e.target.name] = e.target.value;
    setAddProduct(product);
  };

  console.log(products);

  const handleImgUpload = (e) => {
    console.log(e.target.files[0]);
    const imgData = new FormData();
    imgData.set("key", "9a1d578a8582fc4ff167ca0d19b415b3");
    imgData.append("image", e.target.files[0]);

    axios
      .post("https://api.imgbb.com/1/upload", imgData)
      .then((res) => {
        const data = { ...addProduct };
        data.img = res.data.data.display_url;
        setAddProduct(data);
        console.log(addProduct);
      })
      .catch((error) => console.log(error));
  };

  const deleteProduct = (id) => {
    console.log("We are working");
    fetch(`https://rhubarb-cobbler-67677.herokuapp.com/delete/${id}`, {
      method: "DELETE",
    })
      .then((res) => res.json())
      .then((data) => {
        console.log("Deleted successfully");
      });
    alert(
      "Now You need to reload the page to see the changes that you've made"
    );
  };

  return (
    <Tabs defaultActiveKey="profile" id="uncontrolled-tab-example">
      <Tab eventKey="home" title="Manage Product">
        <Container>
          <Table className="mt-3" striped bordered hover>
            <thead>
              <tr>
                <th>Name</th>
                <th>Price</th>
                <th>Delete button</th>
              </tr>
            </thead>
            <tbody>
              {products.map((product) => (
                <tr>
                  <th>{product.productName}</th>
                  <th>{product.price}</th>
                  <th>
                    <Button
                      onClick={() => deleteProduct(product._id)}
                      variant="contained"
                      color="secondary"
                    >
                      DELETE
                    </Button>
                  </th>
                </tr>
              ))}
            </tbody>
          </Table>
        </Container>
      </Tab>
      <Tab eventKey="profile" title="Add Product">
        <Container>
          <form onSubmit={handleSubmit}>
            <input
              className="form-control my-2"
              placeholder="Enter the product name"
              name="productName"
              onBlur={handleBlur}
              type="text"
              required
            />
            <input
              className="form-control my-2"
              placeholder="Enter the price of that product"
              name="price"
              onBlur={handleBlur}
              type="number"
              required
            />
            <input
              className="form-control my-2"
              name="img"
              placeholder="Product Image"
              type="file"
              onChange={handleImgUpload}
              required
            />
            <Button type="submit" variant="contained" color="primary">
              Submit
            </Button>
          </form>
        </Container>
      </Tab>
    </Tabs>
  );
}
