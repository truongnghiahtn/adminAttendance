import { IAction } from "interfaces";
import { GET_COURSES, GET_COURSES_SUCCESS, GET_COURSES_ERROR, ADD_COURSE, ADD_COURSE_SUCCESS, ADD_COURSE_ERROR, EDIT_COURSE, EDIT_COURSE_SUCCESS, EDIT_COURSE_ERROR, DELETE_COURSE, DELETE_COURSE_SUCCESS, DELETE_COURSE_ERROR, GET_COURSES_TEACHER, GET_COURSES_SUCCESS_TEACHER, GET_COURSES_ERROR_TEACHER, GET_COURSES_SEMETER, GET_COURSES_SUCCESS_SEMETER, GET_COURSES_ERROR_SEMETER } from "constant";
import _ from "lodash";

const initialState = {
  isLoading: false,
  isAdding: false,
  isEditing: false,
  isRemoving: false,
  isActing: false,
  isRefreshing: false,
  courseList: [],
  pagination: {},
  courseItem: {}
};

const Course = (state = initialState, action: IAction) => {
  switch (action.type) {
    case GET_COURSES:
      return _.assign({}, state, { isLoading: true });
    case GET_COURSES_SUCCESS:
      return _.assign({}, state, { isLoading: false, isRefreshing: false, courseList: action.payload.courseList, pagination: action.payload.pagination });
    case GET_COURSES_ERROR:
      return _.assign({}, state, { isLoading: false });
    case GET_COURSES_TEACHER:
      return _.assign({}, state, { isLoading: true });
    case GET_COURSES_SUCCESS_TEACHER:
      return _.assign({}, state, { isLoading: false, isRefreshing: false, courseList: action.payload.courseList, pagination: action.payload.pagination });
    case GET_COURSES_ERROR_TEACHER:
      return _.assign({}, state, { isLoading: false });
    case GET_COURSES_SEMETER:
      return _.assign({}, state, { isLoading: true });
    case GET_COURSES_SUCCESS_SEMETER:
      return _.assign({}, state, { isLoading: false, isRefreshing: false, courseList: action.payload.courseList, pagination: action.payload.pagination });
    case GET_COURSES_ERROR_SEMETER:
      return _.assign({}, state, { isLoading: false });
    case ADD_COURSE:
      return _.assign({}, state, { isActing: true });
    case ADD_COURSE_ERROR:
      return _.assign({}, state, { isActing: false });
    case ADD_COURSE_SUCCESS:
      return _.assign({}, state, { isActing: false, isRefreshing: true });
    case ADD_COURSE_ERROR:
      return _.assign({}, state, { isActing: false });
    case EDIT_COURSE:
      return _.assign({}, state, { isActing: true });
    case EDIT_COURSE_SUCCESS:
      return _.assign({}, state, { isActing: false, isRefreshing: true });
    case EDIT_COURSE_ERROR:
      return _.assign({}, state, { isActing: false });
    case DELETE_COURSE:
      return _.assign({}, state, { isActing: true });
    case DELETE_COURSE_SUCCESS:
      return _.assign({}, state, { isActing: false, isRefreshing: true });
    case DELETE_COURSE_ERROR:
      return _.assign({}, state, { isActing: false });
    default:
      return state;
  }
}

export default Course;