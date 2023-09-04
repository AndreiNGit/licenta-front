// NewsItem.js
import React from 'react';
import { Card } from 'react-bootstrap';

function NewsItem(props) {
    let data = props.news;
    let date = new Date(
        parseInt(data.time_published.substr(0, 4)),    // An
        parseInt(data.time_published.substr(4, 2)) - 1, // Luna (0 = ianuarie, deci scădem 1)
        parseInt(data.time_published.substr(6, 2)),    // Zi
        parseInt(data.time_published.substr(9, 2)),    // Ora
        parseInt(data.time_published.substr(11, 2))    // Minute
    );

    return (
        <Card>
            <Card.Body>
                <Card.Title>{data.title}</Card.Title>
                <Card.Text>Source: {data.source}</Card.Text>
                <Card.Text>Date: {date.getFullYear()}-{date.getMonth() + 1}-{date.getDate()}</Card.Text>
                <Card.Text>Market Sentiment: {data.overall_sentiment_label}</Card.Text>
                <Card.Text>Topics: {data.topics.map((topicObject, index) => <span key={index}>{topicObject.topic}{index < data.topics.length - 1 ? ', ' : ''}</span>)}</Card.Text>
                <Card.Link href={data.url}>Read more</Card.Link>
            </Card.Body>
        </Card>
    );
}

export default NewsItem;
