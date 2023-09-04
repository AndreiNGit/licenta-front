import React, { useState } from 'react';
import axios from 'axios';
import { Navbar, Nav ,Form, Button, Container, Row, Col, Card } from 'react-bootstrap';
import { useCurrentUser } from '../provider/CurrentUserProvider';
import { useNavigate } from 'react-router-dom';

function Admin() {
  const [stockSymbol, setStockSymbol] = useState("");
  const navigate = useNavigate();
  const {logout} = useCurrentUser();

  const handleLogout = () => {
    // localStorage.removeItem("user");
    // console.log("logout user", JSON.parse(localStorage.getItem('user')))
    logout();
    navigate("/login");
  };

  const handleStockSymbolChange = (event) => {
    setStockSymbol(event.target.value);
  };

  const handleSubmit = (event) => {
    event.preventDefault();

    axios.post("http://localhost:5000/train", {
      symbol: stockSymbol
    })
    .then(response => {
      console.log(response);
    })
    .catch(error => {
      console.log(error);
    });
  };

  return (
    <div>
   <Navbar bg="light" expand="lg">
      <Container>
        <Navbar.Brand href="/">Invest App</Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="me-auto">
            <Nav.Link onClick={handleLogout}>Log out</Nav.Link>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>

      <Container className="mt-5">
        <Row className="justify-content-md-center">
          <Col xs={12} md={8} lg={6}>
            <Card>
              <Card.Body>
                <Card.Title className="text-center mb-4">Train new stock model</Card.Title>
                <Form onSubmit={handleSubmit}>
                  <Form.Group>
                    <Form.Label>Stock symbol:</Form.Label>
                    <Form.Control type="text" onChange={handleStockSymbolChange} value={stockSymbol} />
                  </Form.Group>

                  <Button variant="primary" type="submit" block className='mt-4'>Submit</Button>
                </Form>
              </Card.Body>
            </Card>
          </Col>
        </Row>
      </Container>
    </div>
  );
}

export default Admin;
