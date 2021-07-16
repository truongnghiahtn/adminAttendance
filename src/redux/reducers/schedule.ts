import { IAction } from "interfaces";
import {
  GET_SCHEDULE, GET_SCHEDULE_SUCCESS, GET_SCHEDULE_ERROR,
  ADD_SCHEDULE, ADD_SCHEDULE_SUCCESS, ADD_SCHEDULE_ERROR,
  EDIT_SCHEDULE, EDIT_SCHEDULE_SUCCESS, EDIT_SCHEDULE_ERROR,
  DELETE_SCHEDULE, DELETE_SCHEDULE_SUCCESS, DELETE_SCHEDULE_ERROR,
  SAVE_SCHEDULE
} from "constant";
import _ from "lodash";

const initialState = {
  isLoading: false,
  isAdding: false,
  isEditing: false,
  isRemoving: false,
  isActing: false,
  isRefreshing: false,
  scheduleList: [],
  pagination: {},
  year: "2020-2021",
  semeter: 1,
  course: 0,
  scheduleItem: {}
};

const Schedule = (state = initialState, action: IAction) => {
  switch (action.type) {
    case GET_SCHEDULE:
      return _.assign({}, state, { isLoading: true });
    case GET_SCHEDULE_SUCCESS:
      return _.assign({}, state, { isLoading: false, isRefreshing: false, scheduleList: action.payload.scheduleList, pagination: action.payload.pagination });
    case GET_SCHEDULE_ERROR:
      return _.assign({}, state, { isLoading: false });
    case ADD_SCHEDULE:
      return _.assign({}, state, { isActing: true });
    case ADD_SCHEDULE_SUCCESS:
      return _.assign({}, state, { isActing: false, isRefreshing: true });
    case ADD_SCHEDULE_ERROR:
      return _.assign({}, state, { isActing: false });
    case EDIT_SCHEDULE:
      return _.assign({}, state, { isActing: true });
    case EDIT_SCHEDULE_SUCCESS:
      return _.assign({}, state, { isActing: false, isRefreshing: true });
    case EDIT_SCHEDULE_ERROR:
      return _.assign({}, state, { isActing: false });
    case DELETE_SCHEDULE:
      return _.assign({}, state, { isActing: true });
    case DELETE_SCHEDULE_SUCCESS:
      return _.assign({}, state, { isActing: false, isRefreshing: true });
    case DELETE_SCHEDULE_ERROR:
      return _.assign({}, state, { isActing: false });
    case SAVE_SCHEDULE:
      return _.assign({}, state, { year: action.payload.year, semeter: action.payload.semeter, course: action.payload.course });
    default:
      return state;
  }
}

export default Schedule;
