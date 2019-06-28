const express = require('express')
const uuidGen = require('uuid/v4')
const jwt = require('jsonwebtoken')
const bcrypt = require('bcryptjs')
const User = require('../model/user')
const connection = require('../database/connection')

module.exports = { 
    register: function(request, response) {
      var email = request.body.email
      var fullname = request.body.fullname
      var password = request.body.password
      var errors = []
      if (!fullname) {
        errors.push('fullname is required')
      }
      if (!email) {
        errors.push('Email is required')
      }
      if (!password) {
        errors.push('Password is required')
      }
      if (errors.length > 0) {
        response.statusCode = 400
        response.json({
            status: 'fail',
            errors: errors
        })
        return false
      }

      var userEmail = {"email":email}
        User.find(userEmail, function(err,result){  
          if (err) {
            response.statusCode = 500
              response.json({
                  status: 'fail',
                  errors: [
                      "Cannot connect to the database"
                  ]
              })

              return false
          }
         if (result.length > 0) {
              response.statusCode = 400
              response.json({
                  status: 'fail',
                  errors: [
                      'User Already Registered'
                  ]
              })



              return false
          }
	    var password = bcrypt.hashSync(request.body.password, 10);
	    var myobj = { email: email , password: password, uuid: uuidGen(), fullname: fullname };
	    const user = new User(myobj) ; 
	    user.save(function(err,res){
	    if (err) {
	            response.statusCode = 500
	            response.json({
	                status: 'fail',
	                errors: [
	                    'Couldn\'t rigster the user',
	                    err.message
	                ]
	            })

	            return false
	        }
	        response.statusCode = 200
	        response.json({
	            status: 'success',
	            token: jwt.sign(res.uuid, "encrypt"),
	            message: 'User has been registered successfully'
	        })

	        return true
	         })
	      });
    },
  
    login: function(request, response) {
        var email = request.body.email
        var password = request.body.password
        var errors = []
        if (!email) {
            errors.push('Email is required')
        }
        if (!password) {
            errors.push('Password is required')
        }

        if (errors.length > 0) {
            response.statusCode = 400
            response.json({
                status: 'fail',
                errors: errors
            })

            return false
        }

        
        var query = { email: email };
            User.find(query, function(err,user ){
            if (err) {
                response.statusCode = 400
                response.json({
                    status: 'fail',
                    errors: [
                        'Couldn\'t complete the request',
                        err.message
                    ]
                })

                return false
            }

            if (user.length > 0) {
                bcrypt.compare(password, user[0].password, function(err, result) {
                    if (result == true) {
                        // user found proceed with the login
                        response.statusCode = 200
                        response.json({
                            status: 'success',
                            message: 'User has been logged in',
                            token: jwt.sign(user[0].uuid, "encrypt")
                        })

                        return true
                    } else {
                        // incorrect password
                        response.statusCode = 400
                        response.json({
                            status: 'fail',
                            errors: [
                                'Wrong Email or password'
                            ]
                        })

                        return false
                    }
                })
            } else {
                // user not found
                response.statusCode = 400
                response.json({
                    status: 'fail',
                    errors: [
                        'User not found'
                    ]
                })

                return false
            }
        })
    },
    logout: function(request, response){
	    response.statusCode = 200
	     response.json({
	       status: 'success',
	       message: 'Successfully logged out ',
	       token: null
	      })
			return true 
    }

}