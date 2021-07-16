import { combineReducers } from "redux";
import { IAppState } from "redux/store/types";
import auth from "./auth";
import course from "./course";
import classes from "./classes"
import { LOGOUT_USER } from "constant";
import subject from "./subject";
import teacher from "./teacher";
import student from "./student";
import user from "./user";
import schedule from "./schedule";
import notification from "./notification";
import rcStudent from "./rcStudent"
const appReducer = combineReducers<IAppState>({
  auth,course,classes,subject,teacher,student,user,schedule,notification,rcStudent
});

const rootReducer = (state, action) => {
  if (action.type === LOGOUT_USER) state = undefined;

  return appReducer(state, action);
};

export default rootReducer;
