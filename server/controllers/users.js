const JWT = require('jsonwebtoken');
const User = require('../models/user');
const config = require('../configuration');

const ALL_ROLES = config.USER_ROLES.ADMIN.concat(config.USER_ROLES.USER);
const ADMIN = config.USER_ROLES.ADMIN;
const USER = config.USER_ROLES.USER;
const ObjectId = require('mongoose').Types.ObjectId;

signToken = user => {
  return JWT.sign({
    iss: 'JunC',
    sub: user.id,
    iat: new Date().getTime(),
    exp: new Date().setDate(new Date().getDate() + 1)
  }, config.JWT_SECRET);
}

module.exports = {
  signup: async (req, res, next) => {

    var { email, password, name, address1, address2, city, province, postal_code, notify, description, depot_name } = req.value.body;
    const foundUser = await User.findOne({ "account_info.email": email });
    if (foundUser) {
      return res.status(403).json({error: 'invalid email'}); 
    }

    if(!name) name = '';
    if(!address1) address1='';
    if(!address2) address2='';
    if(!city) city = '';
    if(!province) province='';
    if(!postal_code) postal_code = '';
    if(!notify) notify = false;
    if(!description) description='';
    
    const newUser = new User({
      account_type: 'local',
      account_info: {
        email,
        password,
        name,
        depot_name,
        address: {
          address1,
          address2,
          city,
          province,
          postal_code
        },
        notify,
        description
      }
    });
    await newUser.save();
    const token = signToken(newUser);

    res.status(200).json({ token: token });
  },

  signin: async (req, res, next) => {
    // Generate token
    const token = signToken(req.user);

    res.status(200).json({ 
      token: token,
      role: req.user.role
     });
  },

  get_user: async (req, res, next) => {
    console.log('get_user');
    const { uid } = req.params;
    const foundUser = uid === 'all' ?
      await User.find() : 
       ObjectId.isValid(uid) ? 
        await User.findOne({_id:uid}) : null;

    console.log(uid, foundUser);
    
    if (!foundUser) {
      return res.status(403).json({error: 'invalid user'});
    }

    res.status(200).json({ user: foundUser });
  },

  update_user: async (req, res, next) => {
    const { uid } = req.params;
    const { email, password, name, role, description } = req.body;
    if(!ObjectId.isValid(uid)) {
      return  res.status(403).json({error :'invalid user'});
    }
    const foundUser = await User.findById(uid);
    console.log(foundUser.account_info);

    if (role) {
      const userRole = req.user.account_info.role;
      if(!ALL_ROLES.includes(role)) {
        return  res.status(403).json({error:'invalid role' });
      }
      //if chaning other's profile
      if(!req.user._id === uid) {
        if(!ADMIN.includes(userRole)) {
          return  res.status(403).json({error:'permission denied'});
        }
        if(userRole === 'admin' && role === 'owner') {
          return  res.status(403).json({error:'permission denied'});
        }
      }
      //changing own profile
      if(ADMIN.includes(userRole)) {
        if(userRole === 'admin' && role === 'owner') {
          return  res.status(403).json({error:'permission denied'});
        }
        foundUser.account_info.role = role;
      }
    }

    if(email) foundUser.account_info.email = email;
    if(password) foundUser.account_info.password = password;
    if(name) foundUser.account_info.name = name;
    if(description) foundUser.account_info.description = description;

    await User.updateOne({_id: uid}, {
      $set: foundUser
    });

    return  res.status(200).json({user: foundUser});
  },

  delete_user: async (req, res, next) => {
    const { uid } = req.params;
    const isAdminOrOnwer = config.USER_ROLES.ADMIN.includes(req.user.account_info.role);

    if (!isAdminOrOnwer) {
      return res.status(403).json({error:'permission denied'});
    }

    const foundUser = await User.findById( uid );
    if (!foundUser) {
      return res.status(403).json({error:'invalid user'});
    }

    await User.deleteOne({ _id: uid });
    res.status(200).json({ user: foundUser });
  }
}