import * as host from './host.js';
const axios = require('axios');

const WarehouseService = {
  getAll: function() {
    return axios.get(host.host + "/warehouses", {
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
  getWarehouseById: function(warehouseId) {
    return axios.post(host.host + "/warehouses/getById", {
      warehouseId: warehouseId
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
  createWarehouse: function(warehouse) {
    return axios.post(host.host + "/warehouses/insert", warehouse, {
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
  updateWarehouse: function(warehouse) {
    return axios.put(host.host + "/warehouses/update", warehouse, {
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
  deleteWarehouse: function(warehouseId) {
    return axios.post(host.host + "/warehouses/delete", {
      warehouseId: warehouseId
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
  getProductStocks: function(warehouseId) {
    return axios.post(host.host + "/productStocks/getByWarehouse", {
      warehouseId: warehouseId
    }, {
      headers: {
        Authorization: 'Bearer ' + localStorage.getItem('token')
      }
    })
    .then(function (res) {
      return res.data;
    })
  },
  updateProductStock: function(productStock) {
    return axios.put(host.host + "/productStocks/update", productStock, {
      headers: {
        Authorization: 'Bearer ' + localStorage.getItem('token')
      }
    })
    .then(function (res) {
      return res.data;
    })
  },
  getMaterialStocks: function(warehouseId) {
    return axios.post(host.host + "/materialStocks/getByWarehouse", {
      warehouseId: warehouseId
    }, {
      headers: {
        Authorization: 'Bearer ' + localStorage.getItem('token')
      }
    })
    .then(function (res) {
      return res.data;
    })
  },
  getAllTypes: function() {
    return axios.get(host.host + "/warehouseTypes", {
      headers: {
        Authorization: 'Bearer ' + localStorage.getItem('token')
      }
    })
    .then(function (res) {
      return res.data;
    })
    .catch(function (error) {
      console.log(error)
    })
  }
}

export default WarehouseService;
