import { USER_TYPE, EMAIL_REGEX, PASSWORD_REGEX, YEAR_REGEX, MONTH_REGEX, POSTAL_CODE_REGEX, BOARD_PROPERTY } from '../config';
import { convertToRaw, convertFromRaw, EditorState } from 'draft-js';
import { isArray } from 'util';

const capitalizeFirst = (string) => {
  return (string.charAt(0).toUpperCase() + string.slice(1));
}

export const session = {
  isAuth: () => sessionStorage.getItem("app_status") ? JSON.parse(sessionStorage.getItem("app_status")).authentication : false,
  isAdmin: () => sessionStorage.getItem("app_status") ? JSON.parse(sessionStorage.getItem("app_status")).admin : false,
  userId: () => sessionStorage.getItem("app_status") ? JSON.parse(sessionStorage.getItem("app_status")).userid : false,
  signOut: () => sessionStorage.clear()
}

// User validation
export const auth = {
  isAdmin: (role) => {
    if (!role) return false;
    return (role === USER_TYPE.ADMIN || role === USER_TYPE.OWNER);
  }
}

//Rich Text Editor
export const convertText = {
  toRaw: (editorState) => {
    let contentState = editorState.getCurrentContent();
    return JSON.stringify(convertToRaw(contentState))
  },
  toEditorState: (content) => {
    if (content) {
      return EditorState.createWithContent(convertFromRaw(JSON.parse(content)));
    }
    return EditorState.createEmpty();
  }
}

//input validation
export const validate = {
  simpleEmail: (name, value) => !value.match(EMAIL_REGEX) ? `Invalid '${capitalizeFirst(name)}'` : null,
  email: (name, value) => !value.match(EMAIL_REGEX) ? `Please enter a valid '${capitalizeFirst(name)}' to use as your User ID.` : null,
  simplePassword: (name, value) => !value || value.length < 8 || value.length > 16 ? `'${name}' length has to be 8 to 16` : null,
  password: (name, value) => !value || value.length < 8 || value.length > 16 ? `'${name}' must have 8 to 16 characters.` :
    !value.match(PASSWORD_REGEX) ? `'${capitalizeFirst(name)}' must contain at least one lowercase letter and one numeric digit.` : null,
  confirmPassword: (password, value) => password && value !== password ? `Password and 'Confirm Password' does not match.` : null,
  empty: (name, value) => !value || !value.length ? `Please enter your '${capitalizeFirst(name)}'.` : null,
  emptySelection: (name, value) => !value || !value.length ? `Please choose a '${capitalizeFirst(name)}'.` : null,
  postalCode: (name, value) => !value ? `Please enter a 'Postal Code'.` : !value.match(POSTAL_CODE_REGEX) ? `Please enter a valid 'Postal Code'.` : null,
  year: (name, value) => !value.match(YEAR_REGEX) ? `Invalid '${capitalizeFirst(name)}'` : null,
  month: (name, value) => !value.match(MONTH_REGEX) ? `Invalid '${capitalizeFirst(name)}'` : null,
}

const dayInMilliseconds = 24 * 60 * 60 * 1000;
export const isWithinDays = (targetDate, days) => {
  if (new Date().getTime() - new Date(targetDate).getTime() < days * dayInMilliseconds)
    return true;
  return false;
}

export const isEmpty = (input) => {
  if (input == null) return true;
  if (isArray(input) || typeof (input) === 'string') return input.length === 0;
  return Object.keys(input).length === 0
};

export const dateTime = {
  shortDate: (input) => {
    let dateTime = new Date(input);

    return {
      date: new Intl.DateTimeFormat('en-US', { month: 'short', day: '2-digit', year: 'numeric' }).format(dateTime),
      time: new Intl.DateTimeFormat('en-US', { hour: 'numeric', minute: 'numeric', hour12: false }).format(dateTime)
    }
  },
  arrYears: (years) => {
    let arrYear = [];
    let thisYear = new Date().getFullYear();
    for (let i = thisYear; i > thisYear - years; i--) {
      arrYear.push(i);
    }
    return arrYear;
  },
  arrMonths: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12],
  historyDate: (year, month) => `${year} - ${month}`,
  boardDate: (time) => {
    let newDate = new Date(time);
    let hour = newDate.getHours();
    let min = newDate.getMinutes();
    return `${newDate.getFullYear()}-${newDate.getMonth() + 1}-${newDate.getDate()} [${hour < 10 ? `0${hour}` : hour}: ${min < 10 ? `0${min}` : min}]`
  },
  commentDate: (date) => {
    let newDate = new Date(date);
    let min = newDate.getMinutes();
    let hour = newDate.getHours();
    let amPm = hour < 12 ? 'am' : 'pm';
    return `${newDate.getFullYear()}-${newDate.getMonth() + 1}-${newDate.getDate()} | ${hour < 10 ? `0${hour}` : hour}:${min < 10 ? `0${min}` : min} ${amPm}`
  }
};

export const boardState = {
  getInitialPageState: (data) => {
    const lastPage = Math.max(Math.ceil(data.length / BOARD_PROPERTY.PAGE_SIZE), 1);
    const lastPageSet = Math.max(Math.ceil(lastPage / BOARD_PROPERTY.PAGINATION_SIZE), 1);
    return {
      page: { start: 1, current: 1, end: Math.min(BOARD_PROPERTY.PAGINATION_SIZE, lastPage) }, pageSet: 1,
      pageSize: BOARD_PROPERTY.PAGE_SIZE, pageSetSize: BOARD_PROPERTY.PAGINATION_SIZE, lastPage: lastPage, lastPageSet: lastPageSet
    }
  }
}