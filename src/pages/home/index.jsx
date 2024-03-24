import "../../assets/styles/home.css";
import ProgressBar from "../../components/ProgressBarComponent";
import TaskList from "../../components/TaskListComponent";

const Home = () => {
  return (
    <div className="card">
      <div className="list">
        <ProgressBar />
        <div className="mt-20">
          <div>
            <TaskList />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;
