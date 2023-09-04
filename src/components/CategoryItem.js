import React from 'react';
import '../style/categoryItem.css';

function CategoryItem(props) {
    let stock = props.data;
    return (
        <a href={"/stock/" + stock.symbol} className='categoryItem'>
                <h2 className='itemName'>{stock.name}</h2>
                <p className='itemSymbol'>{stock.symbol}</p>
                <p className='itemPrice'>Last day price: ${stock.closes[29]}</p>
        </a>
    );
}
export default CategoryItem;