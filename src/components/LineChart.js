import React from 'react';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js';
import { Line } from 'react-chartjs-2'

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);

const LineChart = ({ prices, predictedPrices, stockName }) => {
    // adaugă valorile nule pentru a umple graficul unde este necesar
    const adjustedPrices = [...prices, ...Array(predictedPrices.length).fill(null)];
    const adjustedPredictedPrices = [...Array(prices.length).fill(null), ...predictedPrices];

    const data = {
        title: {
          display: true,
          text: 'Price evolution for ' + stockName,
          fontSize: 25
        },
        labels: [...Array(Math.max(adjustedPrices.length, adjustedPredictedPrices.length)).keys()], 
        datasets: [
            {
                label: 'Actual Price',
                data: adjustedPrices,
                fill: false,
                borderColor: 'rgba(75,192,192,1)'
            },
            {
                label: 'Predicted Price',
                data: adjustedPredictedPrices,
                fill: false,
                borderColor: 'rgba(255,99,132,1)'
            }
        ]
    };

    return (
            <Line data={data} />
    );
};

export default LineChart;
