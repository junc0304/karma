import { USER_TYPE } from '../config';

export const isUserAdmin = (role) => {
    let roleInUpperCase = role.toUpperCase();
    if(roleInUpperCase === USER_TYPE.ADMIN 
        || roleInUpperCase === USER_TYPE.OWNER  ) {
          return true;
    }
    return false;
  }
