import * as host from './host.js';
const axios = require('axios');

const ProviderService = {
  getAll: function() {
    return axios.get(host.host + "/providers", {
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
    return axios.post(host.host + "/providers/getPagination", data, {
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
  getById: function(providerId) {
    return axios.post(host.host + "/providers/getById", {
        providerId: providerId
    }, {
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
  createProvider: function(provider) {
    return axios.post(host.host + "/providers/insert", provider, {
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
  update: function(provider) {
    return axios.put(host.host + "/providers/update", provider,{
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
  delete: function(providerId) {
    return axios.post(host.host + "/providers/delete", {
        providerId: providerId
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

export default ProviderService;