import * as host from './host.js';
const axios = require('axios');

const MaterialService = {
  getAll: function() {
    return axios.get(host.host + "/materials", {
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
  insert: function(material) {
    return axios.post(host.host + "/materials/insert", material,{
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
  getById: function(materialId) {
    return axios.post(host.host + "/materials/getById", {
        materialId: materialId
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
  update: function(material) {
    return axios.put(host.host + "/materials/update", material,{
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
  delete: function(materialId) {
    return axios.post(host.host + "/materials/delete", {
        materialId: materialId
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
  createMaterialStock: function(materialStock) {
    return axios.post(host.host + "/materialStocks/insert", materialStock,{
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
  getMaterialTransfersPaginated: function(data) {
    return axios.post(host.host + "/materialTransfers/getPagination", data, {
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
  createMaterialTransfer: function(materialTransfer) {
    return axios.post(host.host + "/materialTransfers/insert", materialTransfer, {
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
  getMaterialStockByWarehouse: function(warehouseId) {
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
    .catch(function (error) {
      return {code: 0};
    })
  },
  getAllStockRecord: function() {
    return axios.get(host.host + "/materialStockRecords", {
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
  getMaterialStockRecordsPaginated: function(data) {
    return axios.post(host.host + "/materialStockRecords/getPagination", data, {
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
  getAdjustmentsPaginated: function(data) {
    return axios.post(host.host + "/materialInventoryAdjustments/getPagination", data, {
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
  insertAdjustment: function(adjustment) {
    return axios.post(host.host + "/materialInventoryAdjustments/insert", adjustment, {
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

export default MaterialService;