import React, { useState, useEffect } from "react";
import AddStateModal from "../components/AddStateModal";
import TaskBoards from "../components/TaskBoards";
import { Button, Row } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { getStates, editTask } from "../redux/actions/taskActions";
import { DragDropContext } from "react-beautiful-dnd";

const HomePage = () => {
  const [showAddStateModal, setShowAddStateModal] = useState(false);
  const dispatch = useDispatch();
  const states = useSelector((storeState) => storeState.states);
  const tasks = useSelector((storeState) => storeState.tasks);

  useEffect(() => {
    dispatch(getStates());
  }, []);

  const checkIsValid = (src, dest) => {
    if(!dest) return false
    const srcIndex = states.indexOf(src.droppableId)
    const destIndex = states.indexOf(dest.droppableId)
    return destIndex - srcIndex === 1
  }

  const handleOnDragEnd = (result) => {
    console.log("result", result)
    const {source, destination} = result
    if(checkIsValid(source, destination)) {
      console.log("valid", tasks, source)
      dispatch(editTask(tasks[source.droppableId][source.index]._id, destination.droppableId))
    }
    else console.log("invalid")
  }

  return (
    <div>
      <header style={{ padding: 10 }}>
        <h1 style={{ margin: 0 }}>Digigami Task Board</h1>
      </header>
      <AddStateModal
        show={showAddStateModal}
        handleClose={() => setShowAddStateModal(false)}
      />
      <Button onClick={() => setShowAddStateModal(true)}>+ Add State</Button>
      <DragDropContext onDragEnd={handleOnDragEnd}>
        <Row style={{flexWrap: "nowrap"}}>
          {states &&
            states.map((state, index) => (
              <TaskBoards
                title={state}
                first={index === 0}
                tasksList={tasks && tasks[state] ? tasks[state] : []}
              />
            ))}
        </Row>
      </DragDropContext>
    </div>
  );
};

export default HomePage;
