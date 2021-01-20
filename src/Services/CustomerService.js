import * as host from './host.js';
const axios = require('axios');

const CustomerService = {
  getAll: function() {
    return axios.get(host.host + "/clients", {
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
  getAllPaginated: function(data) {
    return axios.post(host.host + "/clients/getPagination", data, {
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
  createCustomer: function(customer) {
    return axios.post(host.host + "/clients/insert", customer, {
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
    return axios.post(host.host + "/clients/getById", {
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

export default CustomerService;
