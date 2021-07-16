import { IAction } from "interfaces";
import {
  GET_SUBJECTS, GET_SUBJECTS_SUCCESS, GET_SUBJECTS_ERROR,
  GET_SUBJECTSV1, GET_SUBJECTS_SUCCESSV1, GET_SUBJECTS_ERRORV1,
  ADD_SUBJECT, ADD_SUBJECT_SUCCESS, ADD_SUBJECT_ERROR,
  EDIT_SUBJECT, EDIT_SUBJECT_SUCCESS, EDIT_SUBJECT_ERROR,
  DELETE_SUBJECT, DELETE_SUBJECT_SUCCESS, DELETE_SUBJECT_ERROR
} from "constant";
import _ from "lodash";

const initialState = {
  isLoading: false,
  isAdding: false,
  isEditing: false,
  isRemoving: false,
  isActing: false,
  isRefreshing: false,
  subjectList: [],
  pagination: {},
  subjectItem: {}
};

const Subject = (state = initialState, action: IAction) => {
  switch (action.type) {
    case GET_SUBJECTS:
      return _.assign({}, state, { isLoading: true });
    case GET_SUBJECTS_SUCCESS:
      return _.assign({}, state, { isLoading: false, isRefreshing: false, subjectList: action.payload.subjectList, pagination: action.payload.pagination });
    case GET_SUBJECTS_ERROR:
      return _.assign({}, state, { isLoading: false });
    case GET_SUBJECTSV1:
      return _.assign({}, state, { isLoading: true });
    case GET_SUBJECTS_SUCCESSV1:
      return _.assign({}, state, { isLoading: false, isRefreshing: false, subjectList: action.payload.subjectList, pagination: action.payload.pagination });
    case GET_SUBJECTS_ERRORV1:
      return _.assign({}, state, { isLoading: false });
    case ADD_SUBJECT:
      return _.assign({}, state, { isActing: true });
    case ADD_SUBJECT_SUCCESS:
      return _.assign({}, state, { isActing: false, isRefreshing: true });
    case ADD_SUBJECT_ERROR:
      return _.assign({}, state, { isActing: false });
    case EDIT_SUBJECT:
      return _.assign({}, state, { isActing: true });
    case EDIT_SUBJECT_SUCCESS:
      return _.assign({}, state, { isActing: false, isRefreshing: true });
    case EDIT_SUBJECT_ERROR:
      return _.assign({}, state, { isActing: false });
    case DELETE_SUBJECT:
      return _.assign({}, state, { isActing: true });
    case DELETE_SUBJECT_SUCCESS:
      return _.assign({}, state, { isActing: false, isRefreshing: true });
    case DELETE_SUBJECT_ERROR:
      return _.assign({}, state, { isActing: false });
    default:
      return state;
  }
}

export default Subject;