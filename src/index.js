import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import registerServiceWorker from './registerServiceWorker';
// Axios is an AJAX package
import axios from 'axios';

// axios, application-wide configuration below
axios.defaults.baseURL = 'https://jsonplaceholder.typicode.com';
axios.defaults.headers.common['Authorization'] = 'AUTH TOKEN';
axios.defaults.headers.post['Content-Type'] = 'application/json';

// Interceptor to handle requests (successful and unsuccessful)
// Used to add headers to requests (like authorization headers)
axios.interceptors.request.use(requestConfig => {
    console.log(requestConfig);
    // Edit @requestConfig before returning
    return requestConfig;
}, error => {
    console.log(error);
    return Promise.reject(error);
});

// Interceptor to handle responses (successful and unsuccessful)
axios.interceptors.response.use(responseConfig => {
    console.log(responseConfig);
    // Edit @responseConfig before returning
    return responseConfig;
}, error => {
    console.log(error);
    return Promise.reject(error);
});

ReactDOM.render( <App />, document.getElementById( 'root' ) );
registerServiceWorker();
