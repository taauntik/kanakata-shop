import React from "react";
import { Card, Button, Container } from "react-bootstrap";

function Home({ product }) {
  const { productName, price, img } = product;
  return (
    <Card style={{ width: "18rem", margin: "30px" }}>
      <Card.Img variant="top" src={img} />
      <Card.Body>
        <Card.Title>{productName}</Card.Title>
        <Card.Text>${price}</Card.Text>
        <Button variant="primary">Buy Now</Button>
      </Card.Body>
    </Card>
  );
}

export default Home;
