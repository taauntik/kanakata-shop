import React from "react";
import { Card, Button, Container, Spinner } from "react-bootstrap";
import { Link } from "react-router-dom";

function Home({ product }) {
  const { _id, productName, price, img } = product;
  return (
    <>
      <Card style={{ width: "18rem", margin: "30px" }}>
        <Card.Img variant="top" src={img} alt="..." />
        <Card.Body>
          <Card.Title>{productName}</Card.Title>
          <Card.Text>${price}</Card.Text>
          <Button as={Link} to={`/checkout/${_id}`} variant="primary">
            Buy Now
          </Button>
        </Card.Body>
      </Card>
    </>
  );
}

export default Home;
