const mongoose = require('mongoose')
const bcrypt = require('bcrypt')

const userSchema = new mongoose.Schema({
    username: {
        type: String,
        require: [true, 'Username required']
    },
    password: {
        type: String,
        require: [true, 'Password required']
    }
})

userSchema.statics.findAndValidate = async (username, password) => {
    const foundUser = await this.findOne({ username });
    const isValid = await bcrypt.compare(password, foundUser);
    return isValid ? foundUser : false;
}

userSchema.pre('save', function(){
    this.password = "Not password"
})

const User = mongoose.model('User', userSchema)

module.exports = User