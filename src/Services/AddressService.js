import * as host from './host.js';
const axios = require('axios');

const AddressService = {
    getAllDepartments: function() {
        return axios.get(host.host + "/departments/")
        .then(function (res) {
            return res.data;
        })
    },
    getDistrictsByDepartment: function(departmentId){
        return axios.post(host.host + "/districts/getByDepartment", {
            departmentId: departmentId
        })
        .then(function (res) {
            return res.data;
        })
    },
    getAllVias: function() {
        return axios.get(host.host + "/vias/")
        .then(function (res) {
            return res.data;
        })
    }
}

export default AddressService;
