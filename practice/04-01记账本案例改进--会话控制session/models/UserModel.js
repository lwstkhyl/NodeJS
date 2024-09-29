const mongoose = require('mongoose');
let UserSchema = new mongoose.Schema({
    username: {
        type: String,
        require: true
    },
    password: {
        type: String,
        require: true
    }
});
let UserModel = mongoose.model('users', UserSchema);
module.exports = UserModel;