import * as host from './host.js';
const axios = require('axios');

const AuthService = {
  signIn: function(user) {
    return axios.post(host.host + "/auth/signIn", user)
    .then(function (res) {
      return res.data;
    })
    .catch(function (error) {
      return {code: 0};
    })
  },
  signUp: function(user) {
    return axios.post(host.host + "/auth/signUp", user,{
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
  isLogged: function(token) {
    return axios.post(host.host + "/auth/isLogged", {
      key: "value"
    },{
      headers: {
        Authorization: 'Bearer ' + token
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

export default AuthService;
