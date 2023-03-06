const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const users = require('@models').users;

exports.signup = async data => {
  if (data.hasOwnProperty('auth')) {
    throw new Error('Please remove auth property, it will add automatically!');
  }
  if (data.hasOwnProperty('username')) {
    throw new Error('Please remove username property, it will add automatically!');
  }
  return await users.create({ ...data, username: data.email.split('@')[0].toLowerCase() });
};

