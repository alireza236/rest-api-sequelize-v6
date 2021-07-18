const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
const JWTstrategy = require('passport-jwt').Strategy;
const ExtractJWT = require('passport-jwt').ExtractJwt;
const bcrypt = require('bcrypt');

const { logger } = require("../utils/pino-logger");

const db = require("../models");

const BCRYPT_SALT_ROUNDS = 12;


passport.use('register', new LocalStrategy({
    usernameField: 'email',
    passwordField: 'password',
    passReqToCallback: true,
    session: false,
}, 
async (req, username, password, done) => {
    
    const { firstname, lastname, email } = req.body
    
    let user;

    try {
        user =  await db.User.findOne({
           where:{
               email: username
           }
          });
        } catch (error) {
          return done(error, false); 
        }
        
       if (user) {
          logger.error("email already taken");
          return done(null, false, {
            message: "email already taken"
          });
        }
        
        try {
          const hashedPassword = await bcrypt.hash(password, BCRYPT_SALT_ROUNDS);
          const userdata = await db.User.create({ 
             firstname,
             lastname,
             password: hashedPassword,
             email,
          });
            logger.info("user created");
            return done(null, userdata)
        } catch (error) {
           return done(error, false);
        }
   }
));

passport.use('login', new LocalStrategy({
  usernameField: 'email',
  passwordField: 'password',
  session: false,
 }, 
  async (username, password, done) => {
      
      let user;
      try {
          user = await db.User.findOne({
                where :{
                 email: username
                }
             });
       } catch (error) {
         return done(error, false);
       }

       if (user === null) {
         return done(null, false, { message: "error_login" });
       }

       let match;
       try {
           match = await bcrypt.compare(password, user.password);
        } catch (error) {
           return done(error, false)
        }
                  
       if (match !== true) {
          logger.error('passwords do not match');
          return done(null, false, { message: "passwords_do_not_match" });
        }
        
        return done(null, user, { message: "success_login"});
}));

const opts = {
  jwtFromRequest: ExtractJWT.fromAuthHeaderWithScheme('Bearer'),
  secretOrKey: process.env.JWT_SECRET
};

passport.use('jwt', new JWTstrategy(opts, async (jwt_payload, done) => {
  
      try {
        const user = await db.User.findOne({
          where:{
            id: jwt_payload.id
          }
        });

        if (user) {
          logger.info('user found in database');
          return done(null, user);
        } else {
          logger.error('user not found in database');
          return done(null, false); 
        }
        
      } catch (error) {
        return done(error, false);    
      }  
  })
);