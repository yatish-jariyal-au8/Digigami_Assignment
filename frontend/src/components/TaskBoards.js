import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { getAllTasks } from "../redux/actions/taskActions";
import { Button } from "react-bootstrap";
import AddTaskModal from "../components/AddTaskModal";
import { Droppable, DragDropContext, Draggable } from "react-beautiful-dnd";

const TaskBoards = ({ title, first = false, tasksList = [], allTasks }) => {
  const dispatch = useDispatch();
  const [showAddTaskModal, setShowAddTaskModal] = useState(false);
  const [tasks, setTasks] = useState(allTasks);

  useEffect(() => {
    dispatch(getAllTasks());
  }, []);
  console.log("task list", tasksList);
  return (
    <div className="col-3" style={{ padding: "15px 50px" }}>
      <div className="row">
        <div
          className="col"
          style={{
            padding: 10,
            borderRadius: 4,
            backgroundColor: "skyblue",
            minHeight: 300,
          }}
        >
          <AddTaskModal
            show={showAddTaskModal}
            handleClose={() => {
              setShowAddTaskModal(false);
            }}
          />
          <h4
            style={{
              textOverflow: "ellipsis",
              whiteSpace: "nowrap",
              overflow: "hidden",
            }}
          >
            {title}
            {first && (
              <span style={{ marginLeft: 10 }}>
                <Button onClick={() => setShowAddTaskModal(true)}>
                  + Add Task
                </Button>
              </span>
            )}
          </h4>
          <Droppable droppableId={title}>
            {(provided) => (
              <ul
                {...provided.droppableProps}
                ref={provided.innerRef}
                className={title}
                style={{
                  ...provided.droppableProps,
                  listStyle: "none",
                  padding: 0,
                }}
              >
                {tasksList && tasksList.length > 0 ? (
                  tasksList.map((item, index) => (
                    <Draggable
                      key={item._id}
                      draggableId={item._id}
                      index={index}
                    >
                      {(provided) => (
                        <li
                          ref={provided.innerRef}
                          {...provided.draggableProps}
                          {...provided.dragHandleProps}
                          style={{
                            ...provided.draggableProps.style,
                            marginTop: 10,
                            padding: 5,
                            borderRadius: 4,
                            backgroundColor: "white",
                          }}
                        >
                          <label style={{ overflowWrap: "anywhere" }}>
                            {item.task}
                          </label>
                        </li>
                      )}
                    </Draggable>
                  ))
                ) : (
                  <li>
                    <label style={{color: "white", fontStyle: "italic"}}>No tasks</label>
                  </li>
                )}
                {provided.placeholder}
              </ul>
            )}
          </Droppable>
        </div>
      </div>
    </div>
  );
};

export default TaskBoards;
