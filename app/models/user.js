var _ = require('lodash');
var mongoose = require('mongoose');
var validator = require('validator');
var jwt = require('jsonwebtoken');
var bcrypt = require('bcryptjs');
var crypto = require('crypto');

var UserSchema = mongoose.Schema({
    email: {
        type: String,
        required: true,
        trim: true,
        minlength: 1,
        unique: true,
        validate: {
            validator: validator.isEmail,
            message: '{VALUE} is not an email.'
        }
    },
    password: {
        type: String,
        required: true,
        minlength: 3
    },
    telephone: {
        type: String,
        default: ''
    },
    address: {
        type: String,
        default: ''
    },
    profile: [{
        name: {
            type: String,
            required: true,
            minlength:2
        },
        picture: {
            type: String,
            default: ''
        }
    }],
    tokens: [{
        access: {
            type: String,
            required: true
        },
        token: {
            type: String,
            required: true
        }
    }]
});

// generateHash
UserSchema.methods.generateHash = function (password) {
    return bcrypt.hashSync(password, bcrypt.genSaltSync(10), null);
}

UserSchema.methods.validPassword = function (password) {
    const user = this;
    return bcrypt.compareSync(password, user.password);
}

UserSchema.methods.toJSON = function () {
    const user = this;
    const userObject = user.toObject();
    return _.pick(userObject, ['_id', 'name', 'email', 'profile']);
};

UserSchema.methods.gravatar = function (size) {
    const user = this;
    if (!size) size = 200;
    if (!user.email) return 'https://gravatar.com/avatar/?s' + size + '&d=retro';
    const md5 = crypto.createHash('md5').update(user.email).digest('hex');
    return 'https://gravatar.com/avatar/' + md5 + '?s=' + size + '&d=retro';
};

UserSchema.methods.generateAuthToken = function () {
    const user = this;
    const access = 'auth';
    const token = jwt.sign({
        _id: user._id.toHexString(),
        access
    }, process.env.JWT_SECRET).toString();

    user.tokens.push({
        access,
        token
    });

    return user.save().then(() => {
        return token;
    });
};

UserSchema.methods.removeToken = function () {
    const user = this;

    return user.update({
        $pull: {
            tokens: { token }
        }
    });
};

UserSchema.statics.findByToken = function (token) { 
    const User = this;
    const decoded = '';
    try {
        decoded = jwt.verify(token, process.env.JWT_SECRET);
    } catch (error) {
        return Promise.reject();
    }

    return User.findOne({
        '_id': decoded._id,
        'tokens.token': token,
        'tokens.access': 'auth'
    });
};

UserSchema.statics.findByCredentials = async function (email, password) {
    const User = this;
    try {
        const user = await User.findOne({ email });
        bcrypt.compare(password, user.password, (err, res) => {
            if (res) {
                return user;
            }else{
                throw new Error();
            }
        });
    } catch (error) {
        throw new Error(`Unable to get the user.`);
    }
};

UserSchema.pre('save', function (next) {
    const user = this;
    
    if (user.isModified('password')) {
        bcrypt.genSalt(12, (err, salt) => {
            bcrypt.hash(user.password, salt, (err, hash) => {
                user.password = hash;
                next();
            });
        });
    }else{
        next();
    }
});

UserSchema.methods.comparePassword = function (password) {
    const user = this;
    return bcrypt.compareSync(password, user.password);
}

var User = mongoose.model('Users', UserSchema);

module.exports = {User};