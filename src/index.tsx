// import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
// import App from "./layouts/App";
import reportWebVitals from "./reportWebVitals";

import { BrowserRouter, Switch, Route, Redirect } from "react-router-dom";
import { Provider } from "react-redux";
// import thunk from "redux-thunk";
// import { createStore, applyMiddleware, compose } from "redux";
import "normalize.css";
import "antd/dist/antd.css";
import "./styles/main.scss";
import configureStore from "redux/store";
import { PrivateRoute } from "components";
import { Login, PageNotFound } from "layouts";

const store = configureStore();

ReactDOM.render(
  <Provider store={store}>
    <BrowserRouter>
      <Switch>
        <Route
          exact
          path={[
            "",
            "/editor",
            "/phong_hoc",
            "/khoa_hoc",
            "/mon_hoc",
            "/user",
            "/chart",
            "/nguoi_dung/hoc_vien",
            "/nguoi_dung/quan_tri",
             "/khoa_hoc-giao_vien/:id",
             "/hoc_vien-khoa_hoc/:id",
             "/lich_hoc",
             "/yeu_cau",
             "/lich_hoc-hoc_vien/:id",
             "/dang_ky-khoa_hoc"
          ]}
          component={PrivateRoute}
        />
        <Route path="/login" component={Login} />
        <Route component={PageNotFound} />
      </Switch>
    </BrowserRouter>
  </Provider>,
  document.getElementById("root")
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
