const userModel = require('../models/userModel');
const db = require('../db');
const bcrypt = require('bcrypt');
const atob = require('atob');
const jwt = require('jsonwebtoken');
const secret = process.env.SECRET;

exports.createUser = async (req, res) => {
  const userData = req.body;
  const alreadyRegistered = await db.User.findOne({ email: userData.email });
  if (!alreadyRegistered) {
    const hash = await bcrypt.hash(userData.password, 10);
    userData.password = hash;
    let user = await userModel.createUser(userData);
    console.log('creating user: ', user);
    res.status(200).send(user);
  } else {
    res.status(404).send({ error: 'email already registered' });
  }
};

exports.addTopics = async (req, res) => {
  console.log('req.body from add topics: ', req.body);
  const updatedUser = await userModel.updateUser(req.body);
  const token = jwt.sign(
    {
      username: updatedUser.username,
      id: updatedUser.id,
      topics: updatedUser.topics,
      location: updatedUser.location.coordinates
    },
    secret,
    {
      expiresIn: '24h'
    }
  );
  updatedUser.auth = token;
  console.log(updatedUser);
  res.status(201).send(updatedUser);
};

exports.login = async (req, res) => {
  if (
    !req.headers.authorization ||
    req.headers.authorization.split(' ')[0] !== 'Basic'
  ) {
    res.status(403).send({ error: 'Missing basic authorization' });
    return;
  }
  const basic = req.headers.authorization.split(' ');
  const username = atob(basic[1]).split(':')[0];
  const password = atob(basic[1]).split(':')[1];
  const user = await db.User.findOne({ username: username });
  if (!user) {
    res.status(403).send({ error: 'Username not found' });
    return;
  }
  bcrypt.compare(password, user.password).then(auth => {
    if (auth) {
      const token = jwt.sign(
        {
          username: user.username,
          id: user.id,
          topics: user.topics,
          location: user.location.coordinates
        },
        secret,
        {
          expiresIn: '24h'
        }
      );
      user.password = ':)';
      res.status(200).send({ auth: token, ...user });
    } else {
      res.status(403).send({ error: 'wrong password' });
    }
  });
};
