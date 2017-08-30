'use strict';


/**
 * Create user
 * This operartion creates a new user and return the user identifier.
 *
 * body User Created user object
 * returns User
 **/
var users = [];

exports.createUser = function(body) {
  return new Promise(function(resolve, reject) {
    users.push({
      "firstName" : body.firstName,
      "lastName" : body.lastName,
      "password" : body.password,
      "phone" : body.phone,
      "id" : users.length + 1,
      "email" : body.email,
      "username" : body.username
    });
    if (Object.keys(users).length > 0) {
      resolve(users[Object.keys(users)[users.length-1]]);
    } else {
      resolve();
    }
  });
}


/**
 * Get user by user name
 * 
 *
 * user_id String The name that needs to be fetched. Use user1 for testing. 
 * returns User
 **/
exports.getUserById = function(user_id) {
  return new Promise(function(resolve, reject) {
    const result = users.find((user)=>{
      return user.id === user_id * 1;
    });
    if (result) {
      resolve(result);
    } else {
      resolve();
    }
  });
}


/**
 * Get all users
 * This operartion query for all users.
 *
 * username String Username to filter users (optional)
 * firstName String Firstname like to filter users (optional)
 * returns User
 **/
exports.getUsers = function(username,firstName) {
  return new Promise(function(resolve, reject) {
    if (Object.keys(users).length > 0) {
      resolve(users);
    } else {
      resolve();
    }
  });
}

