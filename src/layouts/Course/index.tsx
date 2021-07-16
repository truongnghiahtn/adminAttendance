import React from "react";
import { connect } from "react-redux";
import { getCourses, addCourse, editCourse, deleteCourse } from "redux/actions/course";
import { getTeachersV1 } from "redux/actions/teacher";
import { getSubjectsV1 } from "redux/actions/subject";
import { Breadcrumb, Spin } from "antd";
import { IAppState } from "redux/store/types";
import { Page, } from "components/UI";
import { Filter, Modal, List } from "./components";
import { NavLink } from "react-router-dom";




interface IRequestProps {
  course: any;
  teacher: any;
  subject: any;
  auth?: any;
  getTeachersV1: () => void;
  getSubjectsV1: () => void;
  getCourses: (value: any) => void;
  addCourse: (value: any, param: any) => void;
  editCourse: (value: any, param: any) => void;
  deleteCourse: (value: any, param: any) => void;
}

const Request: React.FunctionComponent<IRequestProps> = (props) => {
  const [modalVisible, setModalVisible] = React.useState<boolean>(false);
  const [valueParam, setValueParam] = React.useState<object>({year:"2020-2021", Keyword: "", PageIndex: 1, PageSize: 20 });
  const [update, setUpdate] = React.useState<boolean>(false);
  const [currentItem, setCurrentItem] = React.useState<object>();
  const [keyUpdate, setKeyUpdate] = React.useState<number>(0);
  const id = sessionStorage.getItem('id');
  React.useEffect(() => {
    props.getTeachersV1();
    props.getSubjectsV1();
  }, []);
  React.useEffect(() => {
    if (id != null) {
      var data={...valueParam,Id:id}
      props.getCourses(data);
    }
  }, [valueParam, id]);

  React.useEffect(() => {
    if (id != null) {
      setValueParam(pre=>({
        ...pre,Id:id
      }));
    }
  }, [ id]);

  React.useEffect(() => {
    if (props.course.courseList.length === 0 && props.course.pagination.total > 0) {
      setValueParam(pre => ({
        ...pre, PageIndex: props.course.pagination.current - 1
      }));
    }
  }, [props.course]);

  const filterProps = {
    showCreateModal: () => {
      setModalVisible(true);
      setUpdate(false);
    },
    onFilterChange: (value: string) => {
      setValueParam(pre => ({
        ...pre, Keyword: value, PageIndex: 1
      }));
    },
    onOptionChange:(value:string)=>{
      setValueParam(pre => ({
        ...pre, year: value
      }));
    },
    auth:props.auth,
  };
  const modalProps = {
    item: update === false ? {} : currentItem,
    visible: modalVisible,
    destroyOnClose: true,
    checkupdate: update,
    dataTeacher: props.teacher.teacherList,
    dataSubject: props.subject.subjectList,
    title: update === false ? "Tạo khóa học" : "Cập nhật khóa học",
    centered: true,
    loading: props.course.isActing || props.course.isRefreshing,
    onOk: (data: any) => {
      if (update === false) {
        props.addCourse(data, valueParam);
      }
      else {
        var id_Course = keyUpdate;
        var value = { ...data, id_Course };
        props.editCourse(value, valueParam);
      }
    },
    onCancel: () => {
      setModalVisible(false);
    },
  };
  const listProps = {
    loading: props.course.isActing || props.course.isRefreshing,
    dataSource: props.course.courseList,
    pagination: props.course.pagination,
    auth:props.auth,
    onEditItem: (item: any) => {
      setUpdate(true);
      setModalVisible(true)
      setCurrentItem(item);
      setKeyUpdate(item.key);
    },
    onDeleteItem: (id: string) => {
      props.deleteCourse(id, valueParam);
    },
    onChangeIndex: (data: any) => {
      setValueParam(pre => ({
        ...pre, PageIndex: data.current, PageSize: data.pageSize
      }));
    }
  };

  return (
    <Spin
      spinning={props.course.isLoading}
      size="large"
      wrapperClassName="bg-page-loading"
    >
      <div className="header-content">
        <Breadcrumb>
          <Breadcrumb.Item>
            <NavLink to={"/"}>Trang chủ</NavLink>
          </Breadcrumb.Item>
          <Breadcrumb.Item>Khóa học</Breadcrumb.Item>
        </Breadcrumb>
        <h2 style={{ marginTop: "13px" }}> Trang khóa học</h2>
      </div>
      <div style={{ width: "100%", height: "10px" }}></div>
      <div style={{ margin: "10px 20px" }}></div>
      <Page inner>
        <Filter {...filterProps} />
        <Modal {...modalProps} />
        <List {...listProps} />
      </Page>
    </Spin>);
};


const mapStateToProps = (state: IAppState) => ({
  course: state.course,
  teacher: state.teacher,
  subject: state.subject,
  auth: state.auth,
});

export default connect(mapStateToProps, {
  getTeachersV1,
  getSubjectsV1,
  getCourses,
  addCourse,
  editCourse,
  deleteCourse,
})(Request);
