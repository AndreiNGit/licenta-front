import React, { useState } from 'react';
import axios from 'axios';
import { Button, Form, Container, Row, Col } from 'react-bootstrap';
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import AppNavbar from '../components/AppNavbar';
import { Line } from 'react-chartjs-2';
import NewsList from '../components/NewsList';

function isSameOrAfter(a, b) {
    return a.getFullYear() > b.getFullYear() ||
           a.getFullYear() === b.getFullYear() && a.getMonth() > b.getMonth() ||
           a.getFullYear() === b.getFullYear() && a.getMonth() === b.getMonth() && a.getDate() >= b.getDate();
}

function isSameOrBefore(a, b) {
    return a.getFullYear() < b.getFullYear() ||
           a.getFullYear() === b.getFullYear() && a.getMonth() < b.getMonth() ||
           a.getFullYear() === b.getFullYear() && a.getMonth() === b.getMonth() && a.getDate() <= b.getDate();
}

const Compare = () => {
  const [startDate, setStartDate] = useState(new Date());
  const [endDate, setEndDate] = useState(new Date());
  const [stockSymbol1, setStockSymbol1] = useState("");
  const [stockSymbol2, setStockSymbol2] = useState("");
  const [chartData, setChartData] = useState({});
  const [getNews, setGetNews] = useState(false);

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      const response1 = await axios.get(`https://www.alphavantage.co/query?function=TIME_SERIES_DAILY&symbol=${stockSymbol1}&apikey=MW06FYDMFXP889H7`);
      const response2 = await axios.get(`https://www.alphavantage.co/query?function=TIME_SERIES_DAILY&symbol=${stockSymbol2}&apikey=MW06FYDMFXP889H7`);
      const data1 = response1.data["Time Series (Daily)"];
      const data2 = response2.data["Time Series (Daily)"];
      let filtered1;
      let filtered2;
      if(data1 != undefined) {
        filtered1 = Object.entries(data1).filter(([date]) => {
          const currentDate = new Date(date);
          return isSameOrAfter(currentDate, startDate) && isSameOrBefore(currentDate, endDate);
        });
      } else {
        alert("Stock Symbol 1 is invalid");
      }

      if(data2 != undefined) {
        filtered2 = Object.entries(data2).filter(([date]) => {
          const currentDate = new Date(date);
          return isSameOrAfter(currentDate, startDate) && isSameOrBefore(currentDate, endDate);
        });
      } else {
        alert("Stock Symbol 2 is invalid");
      }

      if(filtered1 != undefined && filtered2 != undefined) {
        const dates = filtered1.map(([date]) => date).reverse();
        const closeValues1 = filtered1.map(([, values]) => parseFloat(values['4. close'])).reverse();
        const closeValues2 = filtered2.map(([, values]) => parseFloat(values['4. close'])).reverse();

        setChartData({
          labels: dates,
          datasets: [
            {
              label: stockSymbol1,
              data: closeValues1,
              borderColor: ['rgba(105, 0, 132, .6)',],
              borderWidth: 2
            },
            {
              label: stockSymbol2,
              data: closeValues2,
              borderColor: ['rgba(0, 0, 132, .6)',],
              borderWidth: 2
            }
          ]
        });
        if(filtered1.length == 0 && filtered2.length == 0)
        {
          alert("No data found for the given dates");
        } else {
          setGetNews(true);
        }
      }
    } catch (error) {
      console.error(error);
    }
  }

  return (
    <>
        <AppNavbar />
        <Container className="py-5">
        <h2 className="mb-5 text-center">Compare Stocks</h2>
        <Form onSubmit={handleSubmit}>
            <Row className="mb-4">
            <Col>
                <Form.Label>Stock Symbol 1:</Form.Label>
                <Form.Control className="py-2" type="text" onChange={e => setStockSymbol1(e.target.value)} value={stockSymbol1} />
            </Col>
            <Col>
                <Form.Label>Stock Symbol 2:</Form.Label>
                <Form.Control className="py-2" type="text" onChange={e => setStockSymbol2(e.target.value)} value={stockSymbol2} />
            </Col>
            </Row>
            <Row className="mb-4">
            <Col>
                <Form.Label>Start Date:</Form.Label>
                <div className="py-2">
                  <DatePicker className="form-control" selected={startDate} onChange={date => setStartDate(date)} maxDate={new Date()} />
                </div>
            </Col>
            <Col>
                <Form.Label>End Date:</Form.Label>
                <div className="py-2">
                  <DatePicker className="form-control" selected={endDate} onChange={date => setEndDate(date)} maxDate={new Date()} />
                </div>
            </Col>
            </Row>
            <div className="d-flex justify-content-center">
              <Button variant="primary" type="submit">Search</Button>
            </div>
        </Form>
        </Container>
        <Container>
        <Row className="justify-content-center">
          <Col xs={12} md={8} lg={10}>
            <div className="my-4">
            {chartData && chartData.labels && chartData.labels.length > 0 && <Line data={chartData} options={{ responsive: true }} />}
            </div>
          </Col>
          </Row>
        </Container>
        <div className="d-flex justify-content-center">
          {getNews && <NewsList symbol={stockSymbol1} startDate={startDate} endDate={endDate}/>}
        </div>
        <div className="d-flex justify-content-center">
          {getNews && <NewsList symbol={stockSymbol2} startDate={startDate} endDate={endDate}/>}
        </div>
    </>
  );
}

export default Compare;
