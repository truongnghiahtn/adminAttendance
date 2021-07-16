import { IAction } from "interfaces";
import { GET_USERS, GET_USERS_SUCCESS, GET_USERS_ERROR,
   ADD_USER, ADD_USER_SUCCESS, ADD_USER_ERROR,
     DELETE_USER, DELETE_USER_SUCCESS, DELETE_USER_ERROR } from "constant";
import _ from "lodash";

const initialState = {
  isLoading: false,
  isAdding: false,
  isEditing: false,
  isRemoving: false,
  isActing: false,
  isRefreshing: false,
  userList: [],
  pagination: {},
  userItem: {}
};

const User = (state = initialState, action: IAction) => {
  switch (action.type) {
    case GET_USERS:
      return _.assign({}, state, { isLoading: true });
    case GET_USERS_SUCCESS:
      return _.assign({}, state, { isLoading: false, isRefreshing: false, userList: action.payload.userList, pagination: action.payload.pagination });
    case GET_USERS_ERROR:
      return _.assign({}, state, { isLoading: false });
    case ADD_USER:
      return _.assign({}, state, { isActing: true });
    case ADD_USER_SUCCESS:
      return _.assign({}, state, { isActing: false, isRefreshing: true });
    case ADD_USER_ERROR:
      return _.assign({}, state, { isActing: false });
    case DELETE_USER:
      return _.assign({}, state, { isActing: true });
    case DELETE_USER_SUCCESS:
      return _.assign({}, state, { isActing: false, isRefreshing: true });
    case DELETE_USER_ERROR:
      return _.assign({}, state, { isActing: false });
    default:
      return state;
  }
}

export default User;