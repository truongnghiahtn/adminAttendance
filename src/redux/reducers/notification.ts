import { IAction } from "interfaces";
import { GET_NOTIFICATIONS, GET_NOTIFICATIONS_SUCCESS, GET_NOTIFICATIONS_ERROR,
    EDIT_NOTIFICATION, EDIT_NOTIFICATION_SUCCESS, EDIT_NOTIFICATION_ERROR,
     DELETE_NOTIFICATION, DELETE_NOTIFICATION_SUCCESS, DELETE_NOTIFICATION_ERROR } from "constant";
import _ from "lodash";

const initialState = {
  isLoading: false,
  isAdding: false,
  isEditing: false,
  isRemoving: false,
  isActing: false,
  isRefreshing: false,
  notificationList: [],
  pagination: {},
  notificationItem: {}
};

const Notification = (state = initialState, action: IAction) => {
  switch (action.type) {
    case GET_NOTIFICATIONS:
      return _.assign({}, state, { isLoading: true });
    case GET_NOTIFICATIONS_SUCCESS:
      return _.assign({}, state, { isLoading: false, isRefreshing: false, notificationList: action.payload.notifiList, pagination: action.payload.pagination });
    case GET_NOTIFICATIONS_ERROR:
      return _.assign({}, state, { isLoading: false });
    case EDIT_NOTIFICATION:
      return _.assign({}, state, { isActing: true });
    case EDIT_NOTIFICATION_SUCCESS:
      return _.assign({}, state, { isActing: false, isRefreshing: true });
    case EDIT_NOTIFICATION_ERROR:
      return _.assign({}, state, { isActing: false });
    case DELETE_NOTIFICATION:
      return _.assign({}, state, { isActing: true });
    case DELETE_NOTIFICATION_SUCCESS:
      return _.assign({}, state, { isActing: false, isRefreshing: true });
    case DELETE_NOTIFICATION_ERROR:
      return _.assign({}, state, { isActing: false });
    default:
      return state;
  }
}

export default Notification;