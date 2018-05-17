const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
const {User} = require('./../app/models/user');

/*
* Serialize and Deserialize
*/
passport.serializeUser((user, done) => {
    done(null, user._id);
});

passport.deserializeUser((id, done) => {
    User.findById(id, (err, user) => {
        done(err, user);
    })
});


/*
* Middleware
*/
passport.use('local-login', new LocalStrategy({
    usernameField: 'email',
    passwordField: 'password',
    passReqToCallback: true
}, (req, email, passport, done) => {
    User.findOne({
        email
    }, (err, user) => {
        if (err) return done(err);

        if (!user) {
            return done(null, false, req.flash('loginMessage', 'No user has been found!'));
        }

        if (!user.comparePassword(passport)) {
            return done(null, false, req.flash('loginMessage', 'Opp!! Wrong password pawn!'));
        }
        return done(null, user);
    });
}));

/*
* Register
*/
passport.use('local-signup', new LocalStrategy({
    usernameField: 'email',
    passwordField: 'password',
    passReqToCallback: true
}, (req, email, password, done) => {

    // asynchronous
    // User.findOne wont fire unless data is sent back
    process.nextTick(() => {
        User.findOne({ email }, (err, user) => {
            if (err) return done(err);

            if(user) {
                return done(null, false, req.flash('signupMessage', `That email: ${email} is already taken.`));
            }else{
                var newUser = new User();
                newUser.email = email;
                newUser.password = password;

                // save user
                newUser.save((err) => {
                    if (err) throw err;
                    return done(null, newUser);
                });
            }
        });
    })
}));

/*
* Custom Function Validate
*/
exports.isAuthenticated = (req, res, next) => {
    if(req.isAuthenticated()) {
        return next();
    }
    res.redirect('/login');
}