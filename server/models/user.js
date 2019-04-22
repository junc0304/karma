const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const bcrypt = require('bcryptjs');
const config = require('../configuration');

const ALL_USER = config.USER_ROLES.ADMIN.concat(config.USER_ROLES.USER);

const userSchema = new Schema({
    account_type: {
        type: String,
        enum: config.ACCOUNT_TYPE,
        required: true
    },
    account_info: {
        name: {type: String},
        email:{type: String, lowercase: true},
        password: {type: String, select: false},
        depot_name: {type: String},
        address: {
            address1: {type: String},
            address2: {type: String},
            city: {type: String},
            province: {type: String},
            postal_code: {type: String}
        },
        role: { 
            type: String, 
            enum: ALL_USER,
            default: config.USER_ROLES.USER[0]
        },
        notify: {type: Boolean, default: false},
        created: {type: Date, default: Date.now()},
        updated: {type: Date},
        description: {type: String},
    }  
});

userSchema.pre('save', async function (next) {
    try {
        if(this.account_type != 'local') {
            next();
        }
        
        const salt = await bcrypt.genSalt(13);
        const passwordHash = await bcrypt.hash(this.account_info.password, salt);
        this.account_info.password = passwordHash;
        next();
    }
    catch(error) {
        next(error);
    }
});

userSchema.pre('updateOne', async function (next) {
    try {
        const updates = this.getUpdate();
        console.log(updates);
        
        if(typeof updates.$set == 'undefined') {
            return next();
        }
        if(!updates.$set.account_info.password) {
            return next();
        }
        this.getUpdate().$set.account_info.password = await bcrypt.hash( updates.$set.account_info.password , await bcrypt.genSalt(13));
        this.getUpdate().$set.account_info.updated = Date.now();
        next();
    }
    catch (error) {
        next(error);
    }
});



userSchema.methods.isValidPassword = async function (newPassword) {
    try {
        return await bcrypt.compare(newPassword, this.account_info.password);
    }
    catch (error) {
        return new Error(error);
    }
}

const User = mongoose.model('user', userSchema);
module.exports = User;