import axios from "axios";
import { SET_ALL_TASKS, SET_STATES } from "../constants/taskConstants";

const baseUrl = "http://localhost:5000";

export const addState = (title, position) => (dispatch) => {
  axios
    .post(`${baseUrl}/state/create`, { title, position })
    .then((resp) => {
      console.log(resp);
      dispatch(setStates(resp.data));
    })
    .catch((err) => console.error(err));
};

export const getStates = () => (dispatch) => {
  axios
    .get(`${baseUrl}/state/get`)
    .then((resp) => {
      console.log(resp);
      dispatch(setStates(resp.data));
    })
    .catch((err) => console.error(err));
};

export const setStates = (states) => ({
  type: SET_STATES,
  payload: states,
});

export const getAllTasks = () => (dispatch, getState) => {
  axios
    .get(`${baseUrl}/get`)
    .then((resp) => {
      console.log(resp);
      const updatedTasks = {};
      resp.data.forEach((task, index) => {
        if (updatedTasks[task.state]) {
          updatedTasks[task.state] = [...updatedTasks[task.state], task];
        } else {
          updatedTasks[task.state] = [task];
        }
      });
      dispatch(setAllTasks(updatedTasks));
    })
    .catch((err) => console.error(err));
};

export const setAllTasks = (tasks) => ({
  type: SET_ALL_TASKS,
  payload: tasks,
});

export const addTask = (task, state) => (dispatch) => {
  axios
    .post(`${baseUrl}/create`, { task, state })
    .then((resp) => {
      console.log("resp", resp);
      dispatch(getAllTasks());
    })
    .catch((err) => console.error(err));
};

export const editTask = (id, state) => (dispatch) => {
  axios
    .put(`${baseUrl}/${id}`, { state })
    .then((resp) => {
      console.log(resp);
      dispatch(getAllTasks());
    })
    .catch((err) => console.error(err));
};

export const deleteTask = (id) => (dispatch) => {
  axios
    .delete(`${baseUrl}/${id}`)
    .then((resp) => {
      console.log(resp);
      dispatch(getAllTasks());
    })
    .catch((err) => console.error(err));
};
