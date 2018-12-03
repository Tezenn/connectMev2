const jwt = require('jsonwebtoken');

exports.auth = (req, res, next) => {
  if (!req.headers.authorization) {
    res.status(403).send({ error: 'Authentication Error' });
  } else {
    const token = req.headers.authorization.split(' ')[1];
    jwt.verify(token, process.env.SECRET, (err, decoded) => {
      if (err) res.send(err);
      console.log(decoded);
      res.send({ ...decoded, authenticated: true });
    });
  }
};
