import * as host from './host.js';
const axios = require('axios');

const RolesService = {
  getAll: function() {
    return axios.get(host.host + "/roles", {
        headers: {
          Authorization: 'Bearer ' + localStorage.getItem('token')
        }
      })
    .then(function (res) {
      return res.data;
    })
    .catch(function (error) {
      return {code: 0};
    })
  }
}

export default RolesService;
