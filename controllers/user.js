const express = require('express')
const User = require('../model/user')
const connection = require('../database/connection')
var addon = require('bindings')('factorial.node')


module.exports = { 
  calculation: function(request, response) {
  	console.log("hellooooooooooo")
  	response.json({
        encryptFact: addon.encryptFact(request.body.number),
       
        
    })
  	return false
  },
}