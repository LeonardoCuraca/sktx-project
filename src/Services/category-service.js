import * as host from './host.js';
const axios = require('axios');

const CategoryService = {
  getAll: function() {
    return axios.get(host.host + "/products/")
    .then(function (res) {
      return res.data;
    })
  }
}

export default CategoryService;
