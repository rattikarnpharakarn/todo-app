// import React from 'react'
import { useDispatch, useSelector } from "react-redux";
import "../assets/styles/taskList.css";
import { useEffect, useState } from "react";
import {
  deleteTask,
  getTask,
  doneTask,
  editTask,
  addTask,
} from "../store/reducers/actions/task/getTask";
import { setLoading } from "../store/reducers/actions/loading/loading";

const TaskList = () => {
  const [isexpand, setIsExpand] = useState(null);
  const [isEdit, setIsEdit] = useState(null);
  const [isCreate, setCreate] = useState(false);
  const [taskName, setTaskName] = useState("");

  const dispatch = useDispatch();
  const task = useSelector((state) => state.getTaskReucer);

  const filterList = [
    {
      lable: "All",
      value: "all",
    },
    {
      lable: "Done",
      value: "done",
    },
    {
      lable: "Undone",
      value: "undone",
    },
  ];
  const checkList = async (item) => {
    item.completed = !item.completed;
    dispatch(setLoading(true));
    await dispatch(doneTask(item));
    await dispatch(getTask());
    dispatch(setLoading(false));
  };

  const onFilter = (filter) => {
    dispatch(setLoading(true));
    dispatch(getTask(filter));
    dispatch(setLoading(false));
  };

  const onCreateTask = () => {
    setCreate(true);
    setIsEdit(null);
  };

  const onEdit = (index) => {
    setCreate(false);
    setIsExpand(null);
    setIsEdit(index);
  };

  const onExpand = (item, index) => {
    setIsExpand(index);
  };

  const onSubmit = async (item) => {
    const data = {
      title: taskName,
      completed: false,
    };
    if (item) {
      dispatch(setLoading(true));
      await dispatch(editTask(item, taskName));
      await dispatch(getTask());
      setIsEdit(null);
      dispatch(setLoading(false));
    } else {
      dispatch(setLoading(true));
      await dispatch(addTask(data));
      await dispatch(getTask());
      setCreate(false);
      setTaskName("");
      dispatch(setLoading(false));
    }
  };

  const delTask = async (id) => {
    dispatch(setLoading(true));
    setIsEdit(null);
    setIsExpand(null);
    await dispatch(deleteTask(id));
    await dispatch(getTask());
    dispatch(setLoading(false));
  };

  const cancleCreate = () => {
    setCreate(null);
    setTaskName("");
  };

  useEffect(() => {
    const fetchData = async () => {
      dispatch(setLoading(true));
      await dispatch(getTask());
      dispatch(setLoading(false));
    };
    fetchData();
  }, []);
  return (
    <>
      <div className="flex">
        <div className="flex">
          <h4>Task </h4>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            fill="currentColor"
            className="plus-icon cursor-pointer"
            onClick={() => onCreateTask()}
          >
            <path
              fillRule="evenodd"
              d="M12 2.25c-5.385 0-9.75 4.365-9.75 9.75s4.365 9.75 9.75 9.75 9.75-4.365 9.75-9.75S17.385 2.25 12 2.25ZM12.75 9a.75.75 0 0 0-1.5 0v2.25H9a.75.75 0 0 0 0 1.5h2.25V15a.75.75 0 0 0 1.5 0v-2.25H15a.75.75 0 0 0 0-1.5h-2.25V9Z"
              clipRule="evenodd"
            />
          </svg>
        </div>
        <div>
          <select
            className="filter_card"
            onChange={(e) => onFilter(e.target.value)}
          >
            {filterList.map((item) => (
              <option key={item?.value} value={item.value}>
                {item?.lable}
              </option>
            ))}
          </select>
        </div>
      </div>

      {isCreate && (
        <div className="card_list">
          <div className="flex">
            <div className="flex  w-57">
              <input
                type="text"
                value={taskName ? taskName : ""}
                className="mr-20"
                onChange={(e) => setTaskName(e.target.value)}
              />
            </div>
            <div className="flex">
              <button
                className="save cursor-pointer"
                onClick={() => onSubmit()}
              >
                save
              </button>
              <button
                className="cancle cursor-pointer"
                onClick={() => cancleCreate()}
              >
                cancle
              </button>
            </div>
          </div>
        </div>
      )}

     
      {task?.task.length !== 0 ? (
        task.task.map((item, index) => {
          return (
            <div
              className="card_list"
              key={index}
            >
              <div className="flex">
                <div className="flex w-57">
                  {isEdit === index ? (
                    <input
                      type="text"
                      value={taskName ? taskName : item.title}
                      className="mr-20"
                      onChange={(e) => setTaskName(e.target.value)}
                    />
                  ) : (
                    <>
                      <input
                        type="checkbox"
                        className="custom-checkbox mr-20"
                        checked={item?.completed}
                        onChange={() => checkList(item)}
                      />
                      <p
                        className={
                          item.completed === true
                            ? "cross text-wrap"
                            : "text-wrap"
                        }
                      >
                        {item?.title}
                      </p>
                    </>
                  )}
                </div>
                {isEdit === index ? (
                  <>
                    <button
                      className="save cursor-pointer"
                      onClick={() => onSubmit(item)}
                    >
                      save
                    </button>
                    <button
                      className="cancle cursor-pointer"
                      onClick={() => setIsEdit(false)}
                    >
                      cancle
                    </button>
                  </>
                ) : (
                  <a className="dropdown" onClick={() => onExpand(item, index)}>
                    <div className="flex">
                      <div className="dot"></div>
                      <div className="dot"></div>
                      <div className="dot"></div>
                    </div>
                    {isexpand === index && (
                      <div className="expand_card">
                        <div className="dropdown-content">
                          <a onClick={() => onEdit(index)}>Edit</a>
                          <a onClick={() => delTask(item.id)}>Delete</a>
                        </div>
                      </div>
                    )}
                  </a>
                )}
              </div>
            </div>
          );
        })
      ) : (
        <div className="card_list">
          <p className="text-placeholder">Add your todo</p>
        </div>
      )}
    </>
  );
};

export default TaskList;
