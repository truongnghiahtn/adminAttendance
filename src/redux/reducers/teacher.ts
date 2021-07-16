import { IAction } from "interfaces";
import { GET_TEACHERS, GET_TEACHERS_SUCCESS, GET_TEACHERS_ERROR,
  GET_TEACHERSV1, GET_TEACHERS_SUCCESSV1, GET_TEACHERS_ERRORV1, } from "constant";
import _ from "lodash";

const initialState = {
  isLoading: false,
  isAdding: false,
  isEditing: false,
  isRemoving: false,
  isActing: false,
  isRefreshing: false,
  teacherList: [],
  pagination: {},
  teacherItem: {}
};

const Teacher = (state = initialState, action: IAction) => {
  switch (action.type) {
    case GET_TEACHERS:
      return _.assign({}, state, { isLoading: true });
    case GET_TEACHERS_SUCCESS:
      return _.assign({}, state, { isLoading: false, isRefreshing: false, teacherList: action.payload.teacherList, pagination: action.payload.pagination });
    case GET_TEACHERS_ERROR:
      return _.assign({}, state, { isLoading: false });
    case GET_TEACHERSV1:
      return _.assign({}, state, { isLoading: true });
    case GET_TEACHERS_SUCCESSV1:
      return _.assign({}, state, { isLoading: false, isRefreshing: false, teacherList: action.payload.teacherList, pagination: action.payload.pagination });
    case GET_TEACHERS_ERRORV1:
    default:
      return state;
  }
}

export default Teacher;