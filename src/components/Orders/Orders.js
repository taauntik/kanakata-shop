import React from "react";
import { Container, Table } from "react-bootstrap";

function Orders() {
  return (
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
            <td>Salt</td>
            <td>2</td>
            <td>100</td>
          </tr>
          <tr>
            <td>Sugar</td>
            <td>3</td>
            <td>300</td>
          </tr>
          <tr>
            <td colSpan="2">Total</td>
            <td>$500</td>
          </tr>
        </tbody>
      </Table>
    </Container>
  );
}

export default Orders;
