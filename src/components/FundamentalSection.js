import React from 'react';
import axios from 'axios';
import { useEffect, useState } from 'react';
import '../style/fundamentalSection.css';
import FavoriteBtn from './FavoriteBtn';

function FundamentalSection(props) {

    const [stockData, setStockData] = useState(null);
    const idStock = props.idStock;

    useEffect(() => {
        const fetchData = () => {
            try {
                axios.get('https://www.alphavantage.co/query?function=OVERVIEW&symbol='+ props.stockSymbol +'&apikey=MW06FYDMFXP889H7')
                    .then(response => {
                        setStockData(response.data);
                        console.log(response);
                    })
                    .catch(error => console.error('Error:', error));
            } catch (error) {
                console.error('Failed to fetch stock data:', error);
            }
        };
        fetchData();
    }, []);

    return (
        <div>
            {stockData && (
                <div className='fundamentals'>
                    <div className='title'>
                        <h1>{stockData.Name}</h1>
                        <h2>{stockData.Symbol}</h2>
                        <FavoriteBtn idStock={idStock}/>
                        <p>{stockData.Description}</p>
                    </div>
                    <div className='data'>
                        <div className='general'>
                            <p className='divTitle'>Fundamental data</p>
                            <p>Type: {stockData.AssetType}</p>
                            <p>Exchange: {stockData.Exchange}</p>
                            <p>Country: {stockData.Country}</p>
                            <p>Sector: {stockData.Sector}</p>
                            <p>Industry: {stockData.Industry}</p>
                            <p>ExDividendDate: {stockData.ExDividendDate}</p>
                            <p>DividendDate: {stockData.DividendDate}</p>
                            <p>Market Capitalization: {stockData.MarketCapitalization}</p>
                        </div>
                        <div className='fundamental'>
                            <p className='divTitle'>Financial data</p>
                            <p>EBITDA: {stockData.EBITDA}</p>
                            <p>PERatio: {stockData.PERatio}</p>
                            <p>DividendPerShare: {stockData.DividendPerShare}</p>
                            <p>DividendYield: {stockData.DividendYield}</p>
                            <p>EPS: {stockData.EPS}</p>
                            <p>Beta: {stockData['Beta']}</p>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}

export default FundamentalSection;