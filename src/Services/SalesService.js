import * as host from './host.js';
const axios = require('axios');

const SalesService = {
  getAll: function() {
    return axios.get(host.host + "/sales", {
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
    return axios.post(host.host + "/sales/getPagination", data, {
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
  insertSale: function(sale) {
    return axios.post(host.host + "/sales/insert", sale, {
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
    return axios.post(host.host + "/sales/getById", {
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
  },
  getSalesByWeekDay: function() {
    return axios.get(host.host + "/chart/getSalesByWeekDay", {
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
  getSalesByMonth: function() {
    return axios.get(host.host + "/chart/getSalesByMonth", {
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
  getSalesByYear: function() {
    return axios.get(host.host + "/chart/getSalesByYear", {
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

export default SalesService;
