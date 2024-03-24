import {
  BrowserRouter,
  Routes, 
  Route,
} from "react-router-dom";

import Home from "./pages/home";
import "./App.css";

import { Provider } from "react-redux";
import { createStore, applyMiddleware } from "redux";
import { thunk } from "redux-thunk";
import rootReducer from "./store/reducers/index";
import LoadingComponent from "./components/LoadingComponent";
import Layout from "./pages/layout/index";


const store = createStore(rootReducer, applyMiddleware(thunk));

function App() {
  return (
    <Provider store={store}>
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<Home />} />
        </Route>
      </Routes>
      <LoadingComponent />
    </BrowserRouter>
  </Provider>
  );
}

export default App;
