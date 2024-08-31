import axios from 'axios';
axios.defaults.baseURL = 'https://pixabay.com';
export const fetchImages = (searchedQuery, page)=> {
    const axiosConfig = {
        params: {
            key:'45636659-15209a2e9fad59db9d3b17888',
            q: searchedQuery,
        page: page,
        per_page: 15,
        image_type: 'photo',
        orientation: 'horizontal',
        safesearch:  true,
        }
    }
     return axios.get('/api/', axiosConfig);
};