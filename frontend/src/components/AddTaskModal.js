import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { addTask } from "../redux/actions/taskActions";
import { Modal, Button } from "react-bootstrap";

const AddTaskModal = ({ show, handleClose }) => {
  const [task, setTask] = useState("");
  const states = useSelector((storeState) => storeState.states);
  const dispatch = useDispatch();

  const handleAddTask = () => {
    dispatch(addTask(task, states[0]));
    handleClose();
    setTask("");
  };

  return (
    <Modal
      show={show}
      onHide={() => {
        handleClose();
        setTask("");
      }}
    >
      <Modal.Header>
        <Modal.Title>Add New Task</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <input
          style={{
            borderRadius: 4,
            height: 40,
            padding: 5,
            border: "1px solid gray",
          }}
          type="text"
          placeholder="Enter task"
          value={task}
          onChange={(e) => setTask(e.target.value)}
        />
      </Modal.Body>
      <Modal.Footer>
        <Button
          variant="secondary"
          onClick={() => {
            handleClose();
            setTask("");
          }}
        >
          Close
        </Button>
        <Button variant="primary" onClick={handleAddTask}>
          Add
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default AddTaskModal;
