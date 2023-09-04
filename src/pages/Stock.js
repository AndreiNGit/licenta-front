import React from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import '../style/stock.css';
import AppNavbar from '../components/AppNavbar';
import Footer from '../components/Footer';
import FundamentalSection from '../components/FundamentalSection';
import LineChart from '../components/LineChart';
import { useEffect } from 'react';
import { useState } from 'react';
import Signal from '../components/Signal';
import Trader from '../components/Trader';
import NewsList from '../components/NewsList';

function Stock(props) {
    const { symbol } = useParams();
    const [stockData, setStockData] = useState(null);

    useEffect(() => {
        axios.get(`http://localhost:8080/api/stock/${symbol}`)
            .then(response => {
                setStockData(response.data);
                console.log(response.data)
            })
            .catch(error => {
                console.log(error);
            });
    }, [symbol]);

    return (
        <div>
            <AppNavbar />
            <FundamentalSection stockSymbol={symbol} idStock={stockData && stockData.id}/>
            <h2 className='predictionTitle'>{stockData && "Price evolution and prediction for " + stockData.name}</h2>
            <div className='predictionDiv'>
                <div className='chart'>
                    {stockData && <LineChart prices={stockData.closes} predictedPrices={stockData.predictedPrices} stockName={stockData.name} />}
                </div>
                <div className='signal'>
                    {stockData && <Signal stock={stockData} />}
                </div>
            </div>
            <Trader stockSymbol={symbol} />
            <NewsList symbol={symbol} />
            <Footer />
        </div>
    );
}

export default Stock;
