import React, { useState } from "react";
import { Container, Table } from "react-bootstrap";
import { useContext } from "react";
import { UserContext } from "../../App";

function Orders() {
  const [user, setUser] = useContext(UserContext);
  const [orders, setOrders] = useState([]);
  fetch(
    `https://rhubarb-cobbler-67677.herokuapp.com/orders?email=${user.email}`
  )
    .then((res) => res.json())
    .then((data) => setOrders(data));
  return (
    <Container>
      {orders.length && (
        <Table striped bordered hover>
          <thead>
            <tr>
              <th>Name</th>
              <th>Quantity</th>
              <th>Price</th>
              <th>Date</th>
            </tr>
          </thead>
          <tbody>
            {orders.map((order) => (
              <tr>
                <th>{order.productName}</th>
                <th>{1}</th>
                <th>{order.price}</th>
                <th>{order.orderTime}</th>
              </tr>
            ))}
          </tbody>
        </Table>
      )}
    </Container>
  );
}

export default Orders;
