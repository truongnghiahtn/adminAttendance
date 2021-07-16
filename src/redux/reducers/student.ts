import { IAction } from "interfaces";
import {
  GET_STUDENTS, GET_STUDENTS_SUCCESS, GET_STUDENTS_ERROR,
  ADD_STUDENT, ADD_STUDENT_SUCCESS, ADD_STUDENT_ERROR,
  DELETE_STUDENT, DELETE_STUDENT_SUCCESS, DELETE_STUDENT_ERROR, GET_STUDENTS_COURCE, GET_STUDENTS_COURCE_SUCCESS, GET_STUDENTS_COURCE_ERROR, GET_STUDENTS_SCHEDULE, GET_STUDENTS_SCHEDULE_ERROR, GET_STUDENTS_SCHEDULE_SUCCESS, EDIT_STUDENT, EDIT_STUDENT_SUCCESS, EDIT_STUDENT_ERROR
} from "constant";
import _ from "lodash";

const initialState = {
  isLoading: false,
  isAdding: false,
  isEditing: false,
  isRemoving: false,
  isActing: false,
  isRefreshing: false,
  studentCourceList: [],
  studentList: [],
  StudentSheduleList: [],
  pagination: {},
  studentItem: {}
};

const Student = (state = initialState, action: IAction) => {
  switch (action.type) {
    case GET_STUDENTS:
      return _.assign({}, state, { isLoading: true });
    case GET_STUDENTS_SUCCESS:
      return _.assign({}, state, { isLoading: false, isRefreshing: false, studentList: action.payload.studentList, pagination: action.payload.pagination });
    case GET_STUDENTS_ERROR:
      return _.assign({}, state, { isLoading: false });
    case GET_STUDENTS_COURCE:
      return _.assign({}, state, { isLoading: true });
    case GET_STUDENTS_COURCE_SUCCESS:
      return _.assign({}, state, { isLoading: false, isRefreshing: false, studentCourceList: action.payload.studentCourceList, pagination: action.payload.pagination });
    case GET_STUDENTS_COURCE_ERROR:
      return _.assign({}, state, { isLoading: false });
    case GET_STUDENTS_SCHEDULE:
      return _.assign({}, state, { isLoading: true });
    case GET_STUDENTS_SCHEDULE_SUCCESS:
      return _.assign({}, state, { isLoading: false, isRefreshing: false, StudentSheduleList: action.payload.studentScheduleList, pagination: action.payload.pagination });
    case GET_STUDENTS_SCHEDULE_ERROR:
      return _.assign({}, state, { isLoading: false });
    case ADD_STUDENT:
      return _.assign({}, state, { isActing: true });
    case ADD_STUDENT_SUCCESS:
      return _.assign({}, state, { isActing: false, isRefreshing: true });
    case ADD_STUDENT_ERROR:
      return _.assign({}, state, { isActing: false });
    case EDIT_STUDENT:
      return _.assign({}, state, { isActing: true });
    case EDIT_STUDENT_SUCCESS:
      return _.assign({}, state, { isActing: false, isRefreshing: true });
    case EDIT_STUDENT_ERROR:
      return _.assign({}, state, { isActing: false });
    case DELETE_STUDENT:
      return _.assign({}, state, { isActing: true });
    case DELETE_STUDENT_SUCCESS:
      return _.assign({}, state, { isActing: false, isRefreshing: true });
    case DELETE_STUDENT_ERROR:
      return _.assign({}, state, { isActing: false });
    default:
      return state;
  }
}

export default Student;