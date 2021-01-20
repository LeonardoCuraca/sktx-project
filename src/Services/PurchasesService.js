import * as host from './host.js';
const axios = require('axios');

const PurchasesService = {
    getAll: function() {
        return axios.get(host.host + "/productPurchases", {
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
      getAllMaterialPurchases: function() {
        return axios.get(host.host + "/materialPurchases", {
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
  getById: function(productPurchaseId) {
    return axios.post(host.host + "/productPurchases/getById", {
        productPurchaseId: productPurchaseId
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
  getAllPaginated: function(data) {
    return axios.post(host.host + "/productPurchases/getPagination", data, {
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
  getAllMaterialPurchasesPaginated: function(data) {
    return axios.post(host.host + "/materialPurchases/getPagination", data, {
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
  insertPurchase: function(purchase) {
    return axios.post(host.host + "/productPurchases/insert", purchase, {
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
  insertMaterialPurchase: function(purchase) {
    return axios.post(host.host + "/materialPurchases/insert", purchase, {
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

export default PurchasesService;
