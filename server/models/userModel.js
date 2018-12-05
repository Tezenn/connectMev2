const db = require('../db');

exports.createUser = async user => {
  const res = await db.User.create({
    username: user.username,
    password: user.password,
    email: user.email,
    auth: '',
    location: {
      type: 'Point',
      coordinates: user.coords
    }
  });
  res.password = ':)';
  return res;
};

exports.updateUser = async data => {
  const res = await db.User.findByIdAndUpdate(
    data.id,
    { topics: data.topics },
    (err, user) => {
      if (err) console.log('error: ', err);
      return user;
    }
  );
  res.password = ':)';
  return res;
};
