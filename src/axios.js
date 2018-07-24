import axios from'axios';

// Creates an instance of the axios object.
// Allows you to control in detail the configuration for global app settings and
// local app settings.
// Combines with configuration in @index.js but overrides with below values.
const instance = axios.create({
    baseURL: 'https://jsonplaceholder.typicode.com'
});

instance.defaults.headers.common['Authorization'] = 'AUTH TOKEN FROM INSTANCE';

// instance.interceptors.request...
// instance.interceptors.response...

export default instance;
