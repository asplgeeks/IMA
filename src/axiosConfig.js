import axios from 'axios'

const instance = axios.create({
// .. where we make our configurations
    baseURL: 'http://65.1.145.79'
})

// Where you would set stuff like your 'Authorization' header, etc ...

// code \\
// instance.defaults.headers.common['Authorization'] = 'AUTH TOKEN FROM INSTANCE'
// code \\

// Also add/ configure interceptors && all the other cool stuff

// instance.interceptors.request...

export default instance