import { USER_TYPE ,EMAIL_REGEX, PASSWORD_REGEX, POSTAL_CODE_REGEX } from '../config';

export const isUserAdmin = (role) => {
    let roleInUpperCase = role.toUpperCase();
    if(roleInUpperCase === USER_TYPE.ADMIN 
        || roleInUpperCase === USER_TYPE.OWNER  ) {
          return true;
    }
    return false;
  }


export const signInEmail = (value) => {
  return !value.match(EMAIL_REGEX) 
    ? "Invalid Email" 
    : null;
}

export const signInPassword = (value) => {
  return !value || value.length < 8 || value.length > 16 
    ? "Password length has to be 8 to 16" 
    : null;
}

export const userPassword = (value) => {

  return !value || value.length < 8 || value.length > 16 
    ? "Password must have 8 to 16 characters." 
    :!value.match(PASSWORD_REGEX) 
      ? "Password must contain at least one lowercase letter, one uppercase letter, and one numeric digit."
      : null ;
}

export const userEmail = (value) => {
  return !value.match(EMAIL_REGEX) 
    ? "Please enter a valid email address to use as your User ID." 
    :null;
}

export const userConfirmPassword = (password, value) => {
  console.log(password, value)
 return password && value !== password ? "Password and confirm password does not match."  : null;
}

export const userName = (value) => {
  return !value? "Please enter your name." : null;
}

export const depotName = (value) => {
  return !value? "Please enter your depot name.":null;
}

export const userAddress = (value) => {
  return !value? "Please enter an address.":null;
}

export const userCity = (value) => {
  return !value || !value.length? "Please choose a city." : null 
}

export const userProvince = (value) => {
  return !value || !value.length? "Please choose a province." : null;
}

export const userPostalCode = (value) => {
  return !value ? "Please enter a postal code." 
  :!value.match(POSTAL_CODE_REGEX) ? "Please enter a valid postal code." : null;
}
