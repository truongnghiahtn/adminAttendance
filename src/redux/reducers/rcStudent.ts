import { IAction } from "interfaces";
import {
    GET_RCSTUDENT_SUCCESS,
    GET_RCSTUDENT_ERROR,
    GET_RCSTUDENT,
    GET_COURCEBYKEY_SUCCESS,
    GET_COURCEBYKEY_ERROR,
    GET_COURCEBYKEY,
    GET_STUDENTBYKEY_SUCCESS,
    GET_STUDENTBYKEY_ERROR,
    GET_STUDENTBYKEY,
    ADD_RCSTUDENT,
    ADD_RCSTUDENT_SUCCESS,
    ADD_RCSTUDENT_ERROR,
    CONFIRM_RCSTUDENT,
    CONFIRM_RCSTUDENT_SUCCESS,
    CONFIRM_RCSTUDENT_ERROR
} from "constant";
import _ from "lodash";

const initialState = {
    isLoading: false,
    isAdding: false,
    isEditing: false,
    isRemoving: false,
    isActing: false,
    isRefreshing: false,
    rcStudentList: [],
    pagination: {},
    CourceList: [],
    StudentList: [],
};

const RcStudent = (state = initialState, action: IAction) => {
    switch (action.type) {
        case GET_RCSTUDENT:
            return _.assign({}, state, { isLoading: true });
        case GET_RCSTUDENT_SUCCESS:
            return _.assign({}, state, { isLoading: false, isRefreshing: false, rcStudentList: action.payload.RcStudentList, pagination: action.payload.pagination });
        case GET_RCSTUDENT_ERROR:
            return _.assign({}, state, { isLoading: false });
        case GET_COURCEBYKEY:
            return _.assign({}, state, { isLoading: true });
        case GET_COURCEBYKEY_SUCCESS:
            return _.assign({}, state, { isLoading: false, isRefreshing: false, CourceList: action.payload.courseList});
        case GET_COURCEBYKEY_ERROR:
            return _.assign({}, state, { isLoading: false });
        case GET_STUDENTBYKEY:
            return _.assign({}, state, { isLoading: true });
        case GET_STUDENTBYKEY_SUCCESS:
            return _.assign({}, state, { isLoading: false, isRefreshing: false, StudentList: action.payload.studentList});
        case GET_STUDENTBYKEY_ERROR:
            return _.assign({}, state, { isLoading: false });
        case ADD_RCSTUDENT:
            return _.assign({}, state, { isActing: true });
        case ADD_RCSTUDENT_ERROR:
            return _.assign({}, state, { isActing: false });
        case ADD_RCSTUDENT_SUCCESS:
            return _.assign({}, state, { isActing: false, isRefreshing: true });
        case CONFIRM_RCSTUDENT:
            return _.assign({}, state, { isActing: true });
        case CONFIRM_RCSTUDENT_SUCCESS:
            return _.assign({}, state, { isActing: false, isRefreshing: true });
        case CONFIRM_RCSTUDENT_ERROR:
            return _.assign({}, state, { isActing: false });
        default:
            return state;
    }
}

export default RcStudent;