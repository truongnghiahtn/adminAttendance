import { IAction } from "interfaces";
import { GET_CLASSES, GET_CLASSES_SUCCESS, GET_CLASSES_ERROR,
  GET_CLASSESV1, GET_CLASSES_SUCCESSV1, GET_CLASSES_ERRORV1,
   ADD_CLASS, ADD_CLASS_SUCCESS, ADD_CLASS_ERROR,
    EDIT_CLASS, EDIT_CLASS_SUCCESS, EDIT_CLASS_ERROR,
     DELETE_CLASS, DELETE_CLASS_SUCCESS, DELETE_CLASS_ERROR } from "constant";
import _ from "lodash";

const initialState = {
  isLoading: false,
  isAdding: false,
  isEditing: false,
  isRemoving: false,
  isActing: false,
  isRefreshing: false,
  classList: [],
  pagination: {},
  classItem: {}
};

const Classes = (state = initialState, action: IAction) => {
  switch (action.type) {
    case GET_CLASSES:
      return _.assign({}, state, { isLoading: true });
    case GET_CLASSES_SUCCESS:
      return _.assign({}, state, { isLoading: false, isRefreshing: false, classList: action.payload.classList, pagination: action.payload.pagination });
    case GET_CLASSES_ERROR:
      return _.assign({}, state, { isLoading: false });
    case GET_CLASSESV1:
      return _.assign({}, state, { isLoading: true });
    case GET_CLASSES_SUCCESSV1:
      return _.assign({}, state, { isLoading: false, isRefreshing: false, classList: action.payload.classList, pagination: action.payload.pagination });
    case GET_CLASSES_ERRORV1:
      return _.assign({}, state, { isLoading: false });
    case ADD_CLASS:
      return _.assign({}, state, { isActing: true });
    case ADD_CLASS_SUCCESS:
      return _.assign({}, state, { isActing: false, isRefreshing: true });
    case ADD_CLASS_ERROR:
      return _.assign({}, state, { isActing: false });
    case EDIT_CLASS:
      return _.assign({}, state, { isActing: true });
    case EDIT_CLASS_SUCCESS:
      return _.assign({}, state, { isActing: false, isRefreshing: true });
    case EDIT_CLASS_ERROR:
      return _.assign({}, state, { isActing: false });
    case DELETE_CLASS:
      return _.assign({}, state, { isActing: true });
    case DELETE_CLASS_SUCCESS:
      return _.assign({}, state, { isActing: false, isRefreshing: true });
    case DELETE_CLASS_ERROR:
      return _.assign({}, state, { isActing: false });
    default:
      return state;
  }
}

export default Classes;