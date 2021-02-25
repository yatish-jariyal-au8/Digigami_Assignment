import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { addState } from "../redux/actions/taskActions";
import { Modal, Button } from "react-bootstrap";

const AddStateModal = ({ show, handleClose }) => {
  const [state, setState] = useState("");
  const [position, setPosition] = useState(0);
  const dispatch = useDispatch();
  const states = useSelector((storeState) => storeState.states);

  console.log("states", states);
  const handleAddState = () => {
    dispatch(addState(state, position));
    handleClose();
    setState("");
    setPosition(0);
  };

  return (
    <Modal
      show={show}
      onHide={() => {
        handleClose();
        setState("");
        setPosition(0);
      }}
    >
      <Modal.Header>
        <Modal.Title>Add New State</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <input
        style={{borderRadius: 4, height: 40, padding: 5, border: "1px solid gray"}}
          type="text"
          placeholder="Enter state"
          value={state}
          onChange={(e) => setState(e.target.value)}
        />
        {states && states.length > 0 && (
          <select
            style={{ marginLeft: 10, borderRadius: 4, height: 40, padding: 5, border: "1px solid gray" }}
            onChange={(e) => setPosition(e.target.value)}
          >
            <option value="">Select position</option>
            {states &&
              states.length > 0 &&
              states.map((s, index) => (
                <option value={index} style={{textOverflow: "ellipsis", overflow: "hidden", whiteSpace: "nowrap"}}>Before {s}</option>
              ))}
            {states && states.length > 0 && (
              <option value={states.length}>Last</option>
            )}
          </select>
        )}
      </Modal.Body>
      <Modal.Footer>
        <Button
          variant="secondary"
          onClick={() => {
            handleClose();
            setState("");
            setPosition(0);
          }}
        >
          Close
        </Button>
        <Button variant="primary" onClick={handleAddState}>
          Add
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default AddStateModal;
