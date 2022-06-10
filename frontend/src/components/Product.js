import React from "react";
import { Link } from "react-router-dom";
import { Card } from "react-bootstrap";
import Rating from "./Rating";
import { PropTypes } from "prop-types";
const Product = ({ product }) => {
  return (
    <Card className="my-3 p-3 rounded">
      <Link to={`/product/${product._id}`}>
        <Card.Img className="images" src={product.image} variant="top" />
      </Link>
      <Card.Body>
        <Link to={`/product/${product._id}`} replace={true}>
          <Card.Title as="div">
            <strong>{product.name}</strong>
          </Card.Title>
        </Link>
      </Card.Body>
      <Card.Text as="div">
        <div className="my-3">
          <Rating
            value={product.rating}
            text={`${product.numReviews} reviews`}
          ></Rating>
        </div>
      </Card.Text>
      <Card.Text as="h4">${product.price}</Card.Text>
    </Card>
  );
};
Product.propTypes = {
  product: PropTypes.object.isRequired,
};
export default Product;
