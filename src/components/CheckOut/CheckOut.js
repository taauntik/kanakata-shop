import React, { useContext, useEffect, useState } from "react";
import { useParams } from "react-router";
import { useHistory } from "react-router-dom";
import { Container, Table } from "react-bootstrap";
import { Button } from "@material-ui/core";
import { UserContext } from "../../App";

function CheckOut() {
  let [user, setUser] = useContext(UserContext);
  console.log(user);
  const { id } = useParams();
  const history = useHistory();
  const [product, setProduct] = useState({});
  const orderdProduct = {
    ...product,
    username: user.name,
    email: user.email,
    orderTime: new Date(),
  };
  const handleCheckOut = () => {
    fetch("https://rhubarb-cobbler-67677.herokuapp.com/placeorder", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(orderdProduct),
    });

    history.push("/orders");
  };

  useEffect(() => {
    fetch(`https://rhubarb-cobbler-67677.herokuapp.com/checkout/${id}`)
      .then((res) => res.json())
      .then((data) => setProduct(data));
  }, [id]);

  return (
    <div>
      <Container>
        <Table striped bordered hover>
          <thead>
            <tr>
              <th>Name</th>
              <th>Quantity</th>
              <th>Price</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>{product.productName}</td>
              <td>1</td>
              <td>{product.price}</td>
            </tr>
            <tr>
              <td colSpan="2">Total</td>
              <td>${product.price}</td>
            </tr>
          </tbody>
        </Table>
        <Button onClick={handleCheckOut} variant="contained" color="primary">
          Check Out
        </Button>
      </Container>
    </div>
  );
}

export default CheckOut;
