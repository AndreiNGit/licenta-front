import React from 'react';
import ReactDOM from 'react-dom/client';
import MyRoutes from './routes/MyRoutes';
import 'bootstrap/dist/css/bootstrap.min.css';
import axios from 'axios';
import { CurrentUserProvider } from './provider/CurrentUserProvider';

axios.defaults.baseURL = 'http://localhost:8080';
//axios.defaults.headers.common['Authorization'] = AUTH_TOKEN;
//axios.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
    <CurrentUserProvider>
        <MyRoutes />
    </CurrentUserProvider>
);