import { Provider } from "react-redux";
import "./App.css";
import store from "./store/index";
import { RouterProvider } from "react-router-dom";
import router from "./setup/routes-manager";
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { fetchAllData } from "./network/fetchAll";

function App() {
  // const dispatch = useDispatch();

  // useEffect(() => {
  //   dispatch(fetchAllData()); // Assuming you're using Redux and dispatching the fetchAllData action
  // }, [dispatch]);

  return (
    <Provider store={store}>
      <RouterProvider router={router} />
    </Provider>
  );
}

export default App;
