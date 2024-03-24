// import React from "react";
import { useEffect, useState } from "react";
import "../assets/styles/progressBar.css";
import { useSelector } from "react-redux";

const ProgressBar = () => {
  const task = useSelector((state) => state.getTaskReucer);
  const [progress, setProgress] = useState();

  const updateProgressBar = async () => {
    const result = task.task.filter((a) => a.completed === true);
    const progress = (await (result.length / task?.task?.length)) * 100;
    setProgress(Math.floor(progress));
  };

  useEffect(() => {
    updateProgressBar();
  }, [task]);

  return (
    <div className="progressbar_banner">
      <h3>Progress</h3>
      <div className="progressbar">
        <div
          className="progress"
          style={{ width: `${progress ? progress : "0"}%` }}
        ></div>
      </div>
      <span className="text-completed">
        {progress ? progress : "0"} completed
      </span>
    </div>
  );
};

export default ProgressBar;
