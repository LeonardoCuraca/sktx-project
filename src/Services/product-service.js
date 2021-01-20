import * as host from './host.js';
const axios = require('axios');

const ProductService = {
  getAll: function() {
    return axios.get(host.host + "/products", {
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
  getProductById: function(productId) {
    return axios.post(host.host + "/products/getById", {
      productId: productId
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
  createProduct: function(product) {
    return axios.post(host.host + "/products/insert", product, {
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
  updateProduct: function(product) {
    return axios.put(host.host + "/products/update", product, {
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
  deleteProduct: function(productId) {
    return axios.post(host.host + "/products/delete", {
      productId: productId
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
  getAllCategories: function() {
    return axios.get(host.host + "/productCategories", {
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
  getAllSizes: function() {
    return axios.get(host.host + "/sizes", {
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
  getAllColor: function() {
    return axios.get(host.host + "/colors", {
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
  getAllVariants: function(productId) {
    return axios.get(host.host + "/productVariants", {
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
  getVariantByProduct: function(productId) {
    return axios.post(host.host + "/productVariants/getByVariant", {
      productId: productId
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
  createVariant: function(variant) {
    return axios.post(host.host + "/productVariants/insert", variant, {
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
    return axios.get(host.host + "/productStockRecords", {
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
  getStockRecordPaginated: function(data) {
    return axios.post(host.host + "/productStockRecords/getPagination/", data, {
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
  getStockRecordByWarehousePaginated: function(data) {
    return axios.post(host.host + "/productStockRecords/getByWarehousePagination/", data, {
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
  getProductStockByWarehouse: function(warehouseId) {
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
    .catch(function (error) {
      return {code: 0};
    })
  },
  createProductStock: function(stock) {
    return axios.post(host.host + "/productStocks/insert", stock, {
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
  getProductTransfersPaginated: function(data) {
    return axios.post(host.host + "/productTransfers/getPagination", data, {
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
  getProductTransfersById: function(productTransferId) {
    return axios.post(host.host + "/productTransfers/getById", {
      productTransferId: productTransferId
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
  createProductTransfer: function(productTransfer) {
    return axios.post(host.host + "/productTransfers/insert", productTransfer, {
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
  getKardex: function(data) {
    return axios.post(host.host + "/kardex/getProductKardex", data, {
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
    return axios.post(host.host + "/productInventoryAdjustments/getPagination", data, {
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
    return axios.post(host.host + "/productInventoryAdjustments/insert", adjustment, {
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
  getAdjustmentReason: function() {
    return axios.get(host.host + "/adjustmentReasons", {
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

export default ProductService;
