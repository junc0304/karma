import { USER_TYPE ,EMAIL_REGEX, PASSWORD_REGEX, POSTAL_CODE_REGEX } from '../config';

export const isUserAdmin = (role) => {
    let roleInUpperCase = role.toUpperCase();
    if(roleInUpperCase === USER_TYPE.ADMIN 
        || roleInUpperCase === USER_TYPE.OWNER  ) {
          return true;
    }
    return false;
  }

const capitalizeFirst = (string) => {
  return (string.charAt(0).toUpperCase() + string.slice(1));
}

export const validateEmailSimple = (name, value) => {
  return !value.match(EMAIL_REGEX) 
    ? `Invalid "${capitalizeFirst(name)}"` 
    : null;
}

export const validatePasswordSimple = (name, value) => {
  return !value || value.length < 8 || value.length > 16 
    ? `"${name}" length has to be 8 to 16` 
    : null;
}

export const validatePassword = (name, value) => {
  return !value || value.length < 8 || value.length > 16 
    ? `"${name}" must have 8 to 16 characters.` 
    :!value.match(PASSWORD_REGEX) 
      ? `"${capitalizeFirst(name)}" must contain at least one lowercase letter, one uppercase letter, and one numeric digit.`
      : null ;
}
export const validateEmail = (name, value) => {
  return !value.match(EMAIL_REGEX) 
    ? `Please enter a valid "${capitalizeFirst(name)}" to use as your User ID.` 
    :null;
}

export const validateConfirmPassword = (password, value) => {
  console.log(password, value)
 return password && value !== password ? `Password and "Confirm Password" does not match.`  : null;
}

export const validateEmpty = (name, value) => {
  return !value || !value.length?`Please enter your "${capitalizeFirst(name)}".`:null;
}

export const validateEmptySelection = (name, value) => {
  return !value || !value.length? `Please choose a "${capitalizeFirst(name)}".` : null 
}

export const validatePostalCode = (name, value) => {
  return !value ? `Please enter a "Postal Code".` 
  :!value.match(POSTAL_CODE_REGEX) ? `Please enter a valid "Postal Code".` : null;
}
