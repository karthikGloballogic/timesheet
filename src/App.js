import { Provider } from "react-redux";
import "./App.css";
import store from "./store/index";
import { RouterProvider } from "react-router-dom";
import router from "./setup/routes-manager";
import { useEffect } from "react";

function App() {
  return (
    <Provider store={store}>
      <RouterProvider router={router} />
    </Provider>
  );
}

export default App;
