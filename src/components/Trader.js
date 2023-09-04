import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Card, Button, Form, Container, Alert } from 'react-bootstrap';
import Orders from './Orders';

function Trader({ stockSymbol }) {
  const [investing, setInvesting] = useState(false);
  const [startedTrading, setStartedTrading] = useState(false);
  const [amount, setAmount] = useState(0);
  const [trader, setTrader] = useState(null);
  const userId = JSON.parse(localStorage.getItem("user")).id;

  useEffect(() => {
    // console.log("userId ", userId);
    // console.log("stockSymbol ", stockSymbol)
    // Fetch trader data
    axios.get(`/api/trader/stock/${stockSymbol}/user/${userId}`)
      .then(response => {
        setTrader(response.data);
      })
      .catch(error => console.error('Error:', error));

    // Fetch orders data if a trader exists
    // if (trader) {
    //   axios.get(`/order/${trader.id}`)
    //     .then(response => {
    //       setOrders(response.data);
    //     })
    //     .catch(error => console.error('Error:', error));
    // }
  }, [stockSymbol, userId, startedTrading]);

  const startInvesting = () => setInvesting(true);

  const handleAmountChange = (event) => {
    const value = event.target.value;
    setAmount(value > 0 ? value : 0);
  };

  const handleStartTrade = () => {
    axios.post('/api/trader', {
        userId,
        stockSymbol,
        "invested": amount
    })
    .then(response => {
        setStartedTrading(true);
        setTrader(response.data);
    })
  };

  return (
    <Container className="d-flex justify-content-center align-items-center" style={{ marginTop: '80px', marginBottom: "80px" }}>
      {trader ? (
        <Card style={{ width: '18rem' }} className="text-center">
          <Card.Header>Your Trader</Card.Header>
          <Card.Body>
            <p>Invested: {trader.invested}</p>
            <Orders traderId={trader.id}/>
          </Card.Body>
        </Card>
      ) : (
        <Card style={{ width: '18rem' }} className="text-center">
          <Card.Header>
            <Card.Title>Start Trader</Card.Title>
          </Card.Header>

          <Card.Body>
            {!investing ? (
              <Button variant="success" onClick={startInvesting}>Start Investing</Button>
            ) : (
              <>
                <Form.Group className="mt-3 mb-3">
                  <Form.Control
                    style={{ width: '80%', margin: '0 auto' }}
                    type="number"
                    placeholder="Enter amount"
                    onChange={handleAmountChange}
                    value={amount}
                  />
                </Form.Group>
                {amount > 0 && (
                  <Button variant="success" className="mt-2" onClick={handleStartTrade}>Start Trade</Button>
                )}
              </>
            )}
          </Card.Body>

          {amount <= 0 && investing && (
            <Alert variant="danger" className="mt-3">Please enter an amount greater than 0.</Alert>
          )}
        </Card>
      )}
    </Container>
  );
}

export default Trader;
