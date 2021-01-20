import * as host from './host.js';
const axios = require('axios');

const UsersService = {
  getAllPaginated: function(data) {
    return axios.post(host.host + "/user/getPagination", data, {
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
  },
  createUser: function(user) {
    return axios.post(host.host + "/user/insert", user, {
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
  },
  getById: function() {
    return axios.post(host.host + "/user/getById", {
      key: "value"
    },{
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

export default UsersService;
