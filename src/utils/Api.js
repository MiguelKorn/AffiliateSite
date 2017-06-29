import axios from 'axios';

export default class API {
    getItems() {
        return axios.get('http://miguelkorn.nl/School/iProject/api.php');
    }
    getItemsPaginate(itemsPerPage, page) {
        return axios.get('http://miguelkorn.nl/School/iProject/api.php?itemsPerPage=' + itemsPerPage + '&page=' + page);
    }
}
