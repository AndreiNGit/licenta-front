// NewsList.js
import NewsItem from './NewsItem';
import React, { useEffect, useState } from 'react';
import { Container, Card, Row, Col } from 'react-bootstrap';
import axios from 'axios';

function NewsList(props) {
    let symbol = props.symbol;
    let startDate = props.startDate;
    let endDate = props.endDate;
    const [newsData, setNewsData] = useState(null);

    useEffect(() => {
        const fetchNews = () => {
            try {
                console.log("Fetching news");
                if(startDate && endDate) {
                    startDate.setHours(0, 0, 0, 0);
                    endDate.setHours(23, 59, 59, 999);
                    console.log(`https://www.alphavantage.co/query?function=NEWS_SENTIMENT&tickers=${symbol}&time_from=${startDate.toISOString().replace(/-|:|\.\d\d\d/g,"").substring(0, 13)}&time_to=${endDate.toISOString().replace(/-|:|\.\d\d\d/g,"").substring(0, 13)}&limit=500&apikey=MW06FYDMFXP889H7`)
                    axios.get(`https://www.alphavantage.co/query?function=NEWS_SENTIMENT&tickers=${symbol}&time_from=${startDate.toISOString().replace(/-|:|\.\d\d\d/g,"").substring(0, 13)}&time_to=${endDate.toISOString().replace(/-|:|\.\d\d\d/g,"").substring(0, 13)}&limit=500&apikey=MW06FYDMFXP889H7`)
                    .then(response => {
                        const filtered_response = response.data.feed;
                        setNewsData(filtered_response);
                    })
                    .catch(error => {
                        console.error(error);
                    });
                }
                else {
                    axios.get(`https://www.alphavantage.co/query?function=NEWS_SENTIMENT&tickers=${symbol}&limit=50&apikey=MW06FYDMFXP889H7`)
                    .then(response => {
                        const filtered_response = response.data.feed;
                        setNewsData(filtered_response);
                        console.log(response)
                    })
                    .catch(error => {
                        console.error(error);
                    });
                }
            } catch (error) {
                console.error("Error fetching news", error);
            }
        };
        fetchNews();
    }, [props.symbol, props.startDate, props.endDate]);

    return (
        <Container fluid className='categoryList mx-auto'>
            <Row>
                <Col>
                    <Card className='mb-3'>
                        <Card.Body>
                            <Card.Title className='categoryName'>{newsData && symbol} News</Card.Title>
                            <Row className="flex-row flex-nowrap" style={{ overflowX: 'auto' }}>
                                {newsData && newsData.map((item, index) => (
                                    <Col md={4} key={index} className="mb-4">
                                        <NewsItem news={item} />
                                    </Col>
                                ))}
                            </Row>
                        </Card.Body>
                    </Card>
                </Col>
            </Row>
        </Container>
    );
}

export default NewsList;
