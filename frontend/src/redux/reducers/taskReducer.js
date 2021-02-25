import { SET_STATES, SET_ALL_TASKS } from "../constants/taskConstants";

const initialState = {
  tasks: null,
  states: [],
};

const taskReducer = (state = initialState, action) => {
  const { type, payload } = action;

  switch (type) {
    case SET_STATES:
      return {
        ...state,
        states: [...payload],
      };
    case SET_ALL_TASKS:
      return {
        ...state,
        tasks: payload,
      };
    default:
      return state;
  }
};

export default taskReducer;
