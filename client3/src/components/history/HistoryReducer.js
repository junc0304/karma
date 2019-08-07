const initialState = {
  data: {},
  show: false,
  edit: false
}

const historyReducer = (state = initialState, action) => {
  switch (action.type) {
    case "new":
      return { data: {}, show: true, edit: true };
    case "open":
      return { data: action.data, show: true, edit: false };
    case "close":
      return { data: {}, show: false, edit: false };
    case "edit":
      return { ...state, edit: !state.edit };
    default:
      return state;
  }
}

export default historyReducer;