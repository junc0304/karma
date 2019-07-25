import { USER_TYPE ,EMAIL_REGEX } from '../config';

export const isUserAdmin = (role) => {
    let roleInUpperCase = role.toUpperCase();
    if(roleInUpperCase === USER_TYPE.ADMIN 
        || roleInUpperCase === USER_TYPE.OWNER  ) {
          return true;
    }
    return false;
  }


export const email = (value) => {
  return !value.match(EMAIL_REGEX) ? "Invalid Email" : null;
}

export const password = (value) => {
  return !value || value.length < 8 || value.length > 16 ? "Password length has to be 8 to 16" : null;
}

export const enhancedPassword = (value) => {
  
}