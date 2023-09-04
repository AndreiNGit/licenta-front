import React, { useEffect, useState } from "react";
import axios from "axios";
import "../style/orders.css";


function Orders({ traderId }) {
    const [orders, setOrders] = useState([]);
    useEffect(() => {
        axios.get(`/api/order/trader/${traderId}`)
            .then(response => {
                console.log(response.data);
                setOrders(response.data);
            })
            .catch(error => console.error('Error:', error));
    }, []);

    return (
        <div>
            <p className="ordersTitle">Next Orders:</p>
            {orders.map(order => (
                <p className="order">Type: <span className={order.type === "BUY" ? "buyOrder" : "sellOrder"}>{order.type}</span> - Quantity: {order.quantity} - Price: {order.price} - Date: {order.date}</p>
            ))}

        </div>
    );
}

export default Orders;