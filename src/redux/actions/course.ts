import { Dispatch } from "redux";
import * as apiCourse from "api/course";
import {
  GET_COURSES,
  GET_COURSES_SUCCESS,
  GET_COURSES_ERROR,
  ADD_COURSE,
  ADD_COURSE_SUCCESS,
  ADD_COURSE_ERROR,
  EDIT_COURSE,
  DELETE_COURSE,
  EDIT_COURSE_SUCCESS,
  EDIT_COURSE_ERROR,
  DELETE_COURSE_SUCCESS,
  DELETE_COURSE_ERROR,
  GET_COURSES_SUCCESS_TEACHER,
  GET_COURSES_ERROR_TEACHER,
  GET_COURSES_TEACHER,
  GET_COURSES_SUCCESS_SEMETER,
  GET_COURSES_ERROR_SEMETER,
  GET_COURSES_SEMETER
} from "constant";
import { notification } from "antd";

const openNotification = (type: string, message: string) => {
  notification[type]({
    message,
  });
};

const refreshState = (dispatch, payload: any) => {
  apiCourse
    .getCourseList(payload)
    .then((res: any) => {
      const courseList = res.data.data.items.map((item: any, index: number) => {
        return {
          index: index + 1,
          key: item.id_Course,
          name: item.name,
          nameTeacher: item.nameTeacher,
          nameSubject: item.nameSubject,
          schoolYear: item.schoolYear,
          semester: item.semester,
          dateBegin: item.dateBegin,
          dateEnd: item.dateEnd
        };
      });
      const pagination = {
        current: res.data.data.pageIndex,
        pageSize: res.data.data.pageSize,
        total: res.data.data.totalRecords,
        pageCount: res.data.data.pageCount
      };
      dispatch({
        type: GET_COURSES_SUCCESS,
        payload: { courseList, pagination },
      });
    })
    .catch((err: any) => {
      dispatch({ type: GET_COURSES_ERROR, payload: err });
    });
};

const createActionGetCourses = (type: string) => {
  return (payload?: any) => (dispatch: Dispatch) => {
    dispatch({ type });
    apiCourse
      .getCourseList(payload)
      .then((res: any) => {
        const courseList = res.data.data.items.map((item: any, index: number) => {
          return {
            index: index + 1,
            key: item.id_Course,
            name: item.name,
            nameTeacher: item.nameTeacher,
            nameSubject: item.nameSubject,
            schoolYear: item.schoolYear,
            semester: item.semester,
            dateBegin: item.dateBegin,
            dateEnd: item.dateEnd
          };
        });
        const pagination = {
          current: res.data.data.pageIndex,
          pageSize: res.data.data.pageSize,
          total: res.data.data.totalRecords,
          pageCount: res.data.data.pageCount
        };
        dispatch({
          type: GET_COURSES_SUCCESS,
          payload: { courseList, pagination },
        });
      })
      .catch((err: any) => {
        dispatch({ type: GET_COURSES_ERROR, payload: err });
      });
  };
};

const createActionGetCoursesBySemeter = (type: string) => {
  return (payload?: any) => (dispatch: Dispatch) => {
    dispatch({ type });
    apiCourse
      .getCourseListBySemeter(payload)
      .then((res: any) => {
        const courseList = res.data.data.items.map((item: any, index: number) => {
          return {
            index: index + 1,
            key: item.id_Course,
            name: item.name,
            nameTeacher: item.nameTeacher,
            nameSubject: item.nameSubject,
            schoolYear: item.schoolYear,
            semester: item.semester,
            dateBegin: item.dateBegin,
            dateEnd: item.dateEnd
          };
        });
        const pagination = {
          current: res.data.data.pageIndex,
          pageSize: res.data.data.pageSize,
          total: res.data.data.totalRecords,
          pageCount: res.data.data.pageCount
        };
        dispatch({
          type: GET_COURSES_SUCCESS_SEMETER,
          payload: { courseList, pagination },
        });
      })
      .catch((err: any) => {
        dispatch({ type: GET_COURSES_ERROR_SEMETER, payload: err });
      });
  };
};

const createActionGetCoursesByTeacher = (type: string) => {
  return (payload?: any) => (dispatch: Dispatch) => {
    dispatch({ type });
    apiCourse
      .getCourseListByTeacher(payload)
      .then((res: any) => {
        const courseList = res.data.data.items.map((item: any, index: number) => {
          return {
            index: index + 1,
            key: item.id_Course,
            name: item.name,
            nameTeacher: item.nameTeacher,
            nameSubject: item.nameSubject,
            schoolYear: item.schoolYear,
            semester: item.semester,
            dateBegin: item.dateBegin,
            dateEnd: item.dateEnd
          };
        });
        const pagination = {
          current: res.data.data.pageIndex,
          pageSize: res.data.data.pageSize,
          total: res.data.data.totalRecords,
          pageCount: res.data.data.pageCount
        };
        dispatch({
          type: GET_COURSES_SUCCESS_TEACHER,
          payload: { courseList, pagination },
        });
      })
      .catch((err: any) => {
        dispatch({ type: GET_COURSES_ERROR_TEACHER, payload: err });
      });
  };
};

const createActionAddCourse = (type: string) => {
  return (payload?: any, param?: any) => (dispatch: Dispatch) => {
    dispatch({ type });
    apiCourse
      .postCourse(payload)
      .then((res: any) => {
        dispatch({ type: ADD_COURSE_SUCCESS, payload: res.data });
        openNotification("success", "Thêm thành công!");
        refreshState(dispatch, param);
      })
      .catch((err: any) => {
        dispatch({ type: ADD_COURSE_ERROR, payload: err });
        openNotification("error", "Thêm thất bại!");
      });
  };
};

const createActionEditCourse = (type: string) => {
  return (payload?: any, param?: any) => (dispatch: Dispatch) => {
    dispatch({ type });
    apiCourse
      .editCourse(payload)
      .then((res: any) => {
        dispatch({ type: EDIT_COURSE_SUCCESS, payload: res.data });
        openNotification("success", "Cập nhật thành công!");
        refreshState(dispatch, param);
      })
      .catch((err: any) => {
        dispatch({ type: EDIT_COURSE_ERROR, payload: err });
        openNotification("error", "Cập nhật thất bại!");
      });
  };
};

const CreateActionDeleteCourse = (type: string) => {
  return (payload?: any, param?: any) => (dispatch: Dispatch) => {
    dispatch({ type });
    apiCourse
      .deleteCourse(payload)
      .then((res: any) => {
        dispatch({ type: DELETE_COURSE_SUCCESS, payload: res.data });
        openNotification("success", "Xóa thành công!")
        refreshState(dispatch, param);
      })
      .catch((err: any) => {
        dispatch({ type: DELETE_COURSE_ERROR, payload: err })
        openNotification("error", "Xóa thất bại!");
      })
  }
};


export const getCourses = createActionGetCourses(GET_COURSES);
export const getCoursesByTeacher = createActionGetCoursesByTeacher(GET_COURSES_TEACHER);
export const getCoursesBySemeter = createActionGetCoursesBySemeter(GET_COURSES_SEMETER);
export const addCourse = createActionAddCourse(ADD_COURSE);
export const editCourse = createActionEditCourse(EDIT_COURSE);
export const deleteCourse = CreateActionDeleteCourse(DELETE_COURSE);
