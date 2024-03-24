import {
  BrowserRouter,
  Routes, // instead of "Switch"
  Route,
} from "react-router-dom";

import Home from "./pages/home";
import "./App.css";
//redux
import { Provider } from "react-redux";
// import { legacy_createStore as createStore } from "redux";
// import rootReducer from "./redux/reducers/index";
// const store = createStore (rootReducer);
import { createStore, applyMiddleware } from "redux";
import { thunk } from "redux-thunk";
import rootReducer from "./store/reducers/index";
import LoadingComponent from "./components/LoadingComponent";
import Layout from "./pages/layout/index";

//redux persists

const store = createStore(rootReducer, applyMiddleware(thunk));

function App() {
  return (
    <Provider store={store}>
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<Home />} />
          {/* Add other routes here */}
        </Route>
      </Routes>
      <LoadingComponent />
    </BrowserRouter>
  </Provider>
  );
}

export default App;
