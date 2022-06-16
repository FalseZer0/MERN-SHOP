import React, { useState } from "react";
import { Form, Button } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
const SearchBar = () => {
  const navigate = useNavigate();
  const [keyword, setKeyword] = useState("");
  const submitHandler = (e) => {
    e.preventDefault();
    if (keyword.trim()) {
      navigate(`/search/${keyword}`);
      e.target.reset();
      setKeyword("");
    } else {
      navigate("/");
    }
  };
  return (
    <Form onSubmit={submitHandler} className="d-flex">
      <Form.Control
        type="search"
        placeholder="Search"
        onChange={(e) => setKeyword(e.target.value)}
        className="me-2"
        aria-label="Search"
      />
      <Button type="submit" variant="primary" className="ml-2" size="sm">
        Search
      </Button>
    </Form>
  );
};

export default SearchBar;
