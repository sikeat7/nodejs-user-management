const mongoose = require('mongoose');

try {
    mongoose.Promise = global.Promise;
    mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost:27017/UserManagementDB', (err) => {
        if (err) {
            return console.log('Unable to connect to the database.');
        }
        console.log('Database Connected');
    });
} catch (error) {
    throw new Error('Unable to connect to the database.');
}
module.exports = {mongoose};