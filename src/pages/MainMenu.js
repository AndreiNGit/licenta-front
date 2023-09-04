import React, { useEffect, useState } from 'react';
import axios from 'axios';
import CategoryList from '../components/CategoryList';
import AppNavbar from '../components/AppNavbar';
import Footer from '../components/Footer';
import '../style/mainMenu.css';
import '../style/utils.css';

function MainMenu() {
    const [categories, setCategories] = useState([]);

    useEffect(() => {
        axios.get('/api/category')
            .then(response => {
                setCategories(response.data)
                console.log(response.data)
                })
            .catch(error => console.error('Error:', error));
    }, []);

    return (
        <div className='mainMenuDiv'>
            <AppNavbar />
            {categories.map((category) => category.stocks.length > 0 && (
                <CategoryList key={category.id} categoryData={category} />
            ))}
            <Footer />
        </div>
    );
}

export default MainMenu;
