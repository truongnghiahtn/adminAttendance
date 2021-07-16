import { Dispatch } from "redux";
import * as apiStudent from "api/student";
import {
    GET_STUDENTS,
    GET_STUDENTS_SUCCESS,
    GET_STUDENTS_ERROR,
    ADD_STUDENT,
    ADD_STUDENT_SUCCESS,
    ADD_STUDENT_ERROR,

    EDIT_STUDENT,
    EDIT_STUDENT_SUCCESS,
    EDIT_STUDENT_ERROR,
    DELETE_STUDENT,
    DELETE_STUDENT_SUCCESS,
    DELETE_STUDENT_ERROR,
    GET_STUDENTS_COURCE,
    GET_STUDENTS_COURCE_SUCCESS,
    GET_STUDENTS_COURCE_ERROR,
    GET_STUDENTS_SCHEDULE_ERROR,
    GET_STUDENTS_SCHEDULE_SUCCESS,
    GET_STUDENTS_SCHEDULE
} from "constant";
import { notification } from "antd";
const openNotification = (type: string, message: string) => {
    notification[type]({
        message,
    });
};
const refreshState = (dispatch, payload: any) => {
    apiStudent
        .getStudentList(payload)
        .then((res: any) => {
            const studentList = res.data.data.items.map((item: any, index: number) => {
                return {
                    index: index + 1,
                    key: item.id,
                    fullName: item.fullName,
                    email: item.email,
                    urlImg:item.urlImg!=null?item.urlImg:"N/A"
                };
            });
            const pagination = {
                current: res.data.data.pageIndex,
                pageSize: res.data.data.pageSize,
                total: res.data.data.totalRecords,
                pageCount: res.data.data.pageCount
            };
            dispatch({
                type: GET_STUDENTS_SUCCESS,
                payload: { studentList, pagination },
            });
        })
        .catch((err: any) => {
            dispatch({ type: GET_STUDENTS_ERROR, payload: err });
        });
};

const createActionGetStudent = (type: string) => {
    return (payload?: any) => (dispatch: Dispatch) => {
        dispatch({ type });
        apiStudent
            .getStudentList(payload)
            .then((res: any) => {
                const studentList = res.data.data.items.map((item: any, index: number) => {
                    return {
                        index: index + 1,
                        key: item.id,
                        fullName: item.fullName,
                        email: item.email,
                        urlImg:item.urlImg!=null?item.urlImg:"N/A"
                    };
                });
                const pagination = {
                    current: res.data.data.pageIndex,
                    pageSize: res.data.data.pageSize,
                    total: res.data.data.totalRecords,
                    pageCount: res.data.data.pageCount
                };
                dispatch({
                    type: GET_STUDENTS_SUCCESS,
                    payload: { studentList, pagination },
                });
            })
            .catch((err: any) => {
                dispatch({ type: GET_STUDENTS_ERROR, payload: err });
            });
    };
};

const createActionGetStudentCource = (type: string) => {
    return (payload?: any) => (dispatch: Dispatch) => {
        dispatch({ type });
        apiStudent
            .getStudentCourceList(payload)
            .then((res: any) => {
                const studentCourceList = res.data.data.items.map((item: any, index: number) => {
                    return {
                        index: index + 1,
                        key: item.id_Student,
                        name: item.name,
                        email: item.email,
                        nameCource:item.nameCource,
                        numberDay:item.numberDay,
                        dayAttendances:item.dayAttendances
                    };
                });
                const pagination = {
                    current: res.data.data.pageIndex,
                    pageSize: res.data.data.pageSize,
                    total: res.data.data.totalRecords,
                    pageCount: res.data.data.pageCount
                };
                dispatch({
                    type: GET_STUDENTS_COURCE_SUCCESS,
                    payload: { studentCourceList, pagination },
                });
            })
            .catch((err: any) => {
                dispatch({ type: GET_STUDENTS_COURCE_ERROR, payload: err });
            });
    };
};



const createActionGetStudentSchedule = (type: string) => {
    return (payload?: any) => (dispatch: Dispatch) => {
        dispatch({ type });
        apiStudent
            .getStudentScheduleList(payload)
            .then((res: any) => {
                const studentScheduleList = res.data.data.items.map((item: any, index: number) => {
                    return {
                        index: index + 1,
                        key: item.id_Student,
                        name: item.name,
                        date: item.date,
                        status:item.status
                    };
                });
                const pagination = {
                    current: res.data.data.pageIndex,
                    pageSize: res.data.data.pageSize,
                    total: res.data.data.totalRecords,
                    pageCount: res.data.data.pageCount
                };
                dispatch({
                    type: GET_STUDENTS_SCHEDULE_SUCCESS,
                    payload: { studentScheduleList, pagination },
                });
            })
            .catch((err: any) => {
                dispatch({ type: GET_STUDENTS_SCHEDULE_ERROR, payload: err });
            });
    };
};

const createActionAddStudent = (type: string) => {
    return (payload?: any, param?: any) => (dispatch: Dispatch) => {
        dispatch({ type });
        apiStudent
            .postStudent(payload)
            .then((res: any) => {
                dispatch({ type: ADD_STUDENT_SUCCESS, payload: res.data });
                openNotification("success", "Thêm thành công!");
                refreshState(dispatch, param);
            })
            .catch((err: any) => {
                dispatch({ type: ADD_STUDENT_ERROR, payload: err });
                openNotification("error", `${err.response.data.message}!`);
            });
    };
};

const createActionEditStudent = (type: string) => {
    return (payload?: any, param?: any) => (dispatch: Dispatch) => {
        dispatch({ type });
        apiStudent
            .putStudent(payload)
            .then((res: any) => {
                dispatch({ type: EDIT_STUDENT_SUCCESS, payload: res.data });
                openNotification("success", "Cập nhật thành công!");
                refreshState(dispatch, param);
            })
            .catch((err: any) => {
                dispatch({ type: EDIT_STUDENT_ERROR, payload: err });
                openNotification("error", `${err.response.data.message}!`);
            });
    };
};

const CreateActionDeleteStudent = (type: string) => {
    return (payload?: any, param?: any) => (dispatch: Dispatch) => {
        dispatch({ type });
        apiStudent
            .deleteStudent(payload)
            .then((res: any) => {
                dispatch({ type: DELETE_STUDENT_SUCCESS, payload: res.data });
                openNotification("success", "Xóa thành công!")
                refreshState(dispatch, param);
            })
            .catch((err: any) => {
                dispatch({ type: DELETE_STUDENT_ERROR, payload: err })
                openNotification("error", "Xóa thất bại!");
            })
    }
};


export const getStudents = createActionGetStudent(GET_STUDENTS);
export const addStudent = createActionAddStudent(ADD_STUDENT);
export const deleteStudent = CreateActionDeleteStudent(DELETE_STUDENT);
export const getStudentCource =createActionGetStudentCource(GET_STUDENTS_COURCE);
export const getStudentScheduleList =createActionGetStudentSchedule(GET_STUDENTS_SCHEDULE);
export const editStudent = createActionEditStudent(EDIT_STUDENT);
