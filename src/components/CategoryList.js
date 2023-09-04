import CategoryItem from './CategoryItem'
import '../style/categoryList.css';

function CategoryList(props) {
    let categoryData = props.categoryData;
    let stocks = categoryData.stocks;

    return (
        <div className='categoryList'>
            <h2 className='categoryName'>{categoryData.name}</h2>
            <div className='itemList'>
            {stocks.map((stock) => (
                stock.predictedPrices != undefined && stock.predictedPrices.length > 0 &&
                <CategoryItem key={stock.id} data={stock} />
            ))}
            </div>
        </div>
    );
}

export default CategoryList;
