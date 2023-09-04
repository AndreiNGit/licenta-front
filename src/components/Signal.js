import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Card from 'react-bootstrap/Card';
import Button from 'react-bootstrap/Button';
import Alert from 'react-bootstrap/Alert';

const Signal = (props) => {
    const user = JSON.parse(localStorage.getItem('user'));
    const stock = props.stock;

    const [bearishSignals, setBearishSignals] = useState([]);
    const [bullishSignals, setBullishSignals] = useState([]);
    const [hasSignaledToday, setHasSignaledToday] = useState(false);

    useEffect(() => {
        const getSignals = async () => {
            try {
                const [bearish, bullish, userSignalData] = await Promise.all([
                    axios.get(`http://localhost:8080/api/signal/stock/${stock.id}/bearish`),
                    axios.get(`http://localhost:8080/api/signal/stock/${stock.id}/bullish`),
                    axios.get(`http://localhost:8080/api/signal/user/${user.id}/stock/${stock.id}`)
                ]);
    
                setBearishSignals(bearish.data);
                setBullishSignals(bullish.data);    
                setHasSignaledToday(userSignalData.data.length > 0);
                console.log(bearish.data);
                console.log(bullish.data);
            } catch (error) {
                console.log(error);
            }
        };
        
        getSignals();
    }, [hasSignaledToday]);
    

    const totalSignals = bearishSignals.length + bullishSignals.length;
    const bearishPercentage = totalSignals ? (bearishSignals.length / totalSignals * 100).toFixed(2) : 0;
    const bullishPercentage = totalSignals ? (bullishSignals.length / totalSignals * 100).toFixed(2) : 0;

    const handleSignal = async (type) => {
        try {
            await axios.post(`http://localhost:8080/api/signal`, {
                type: type,
                userId: user.id,
                stockId: stock.id
            });
            setHasSignaledToday(true);
        } catch (error) {
            console.log(error);
        }
    }

    return (
        <Card style={{ width: '18rem' }}>
            <Card.Body>
                <Card.Title>Signal</Card.Title>
                <Card.Text style={{ color: 'green' }}>Bullish: {bullishPercentage}%</Card.Text>
                <Card.Text style={{ color: 'red' }}>Bearish: {bearishPercentage}%</Card.Text>
                <Button variant="success" disabled={hasSignaledToday} onClick={() => handleSignal('Bullish')}>Bullish</Button>{' '}
                <Button variant="danger" disabled={hasSignaledToday} onClick={() => handleSignal('Bearish')}>Bearish</Button>
                {hasSignaledToday && 
                    <Alert variant="warning">You have already sent a signal today!</Alert>
                }
            </Card.Body>
        </Card>
    );
}

export default Signal;
