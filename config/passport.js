const JwtStrategy = require('passport-jwt').Strategy;
const ExtractJwt = require('passport-jwt').ExtractJwt;
const mongoose = require('mongoose');
const User = mongoose.model('users');
const keys = require('../config/keys');

const opts = {};
opts.jwtFromRequest = ExtractJwt.fromAuthHeaderAsBearerToken();
opts.secretOrKey = keys.secertOrKey;
// opts.issuer = 'accounts.examplesoft.com';
// opts.audience = 'yoursite.net';

module.exports = passport => {
  passport.use(
    new JwtStrategy(opts, (jwt_payload, done) => {
      User.findById(jwt_payload.id)
        .then(user => {
          if (user) {
            return done(null, user);
          }
          return done(null, false);
        })
        .catch(err => console.log(err));
    })
  );
};

/*   module.exports= passport => {
    passport.use(
      new JwtStrategy(opts, (jwt_payload, done) => {
        User.findOne({ id: jwt_payload.sub }, (err, user) => {
          if (err) {
            return done(err, false);
          }
          if (user) {
            return done(null, user);
          } else {
            return done(null, false);
            // or you could create a new account
          }
        });
      })
    );
  } */
