import React from "react";
import { connect } from "react-redux";
import { getRcStudent, getCoursesByKey, getStudentByKey, addRcStudent, confirmCourse } from "redux/actions/RcStudent";
import { Breadcrumb, Spin } from "antd";
import { IAppState } from "redux/store/types";
import { Page, } from "components/UI";
import { Filter, Modal, List } from "./components";
import { NavLink } from "react-router-dom";




interface IRequestProps {
  rcStudent: any,
  getRcStudent: (value: any) => void;
  getCoursesByKey: (value: any) => void;
  getStudentByKey: (value: any) => void;
  addRcStudent: (value: any, param: any) => void;
  confirmCourse: (value: any, param: any) => void;
}

const RcStudent: React.FunctionComponent<IRequestProps> = (props) => {
  const [modalVisible, setModalVisible] = React.useState<boolean>(false);
  const [valueParam, setValueParam] = React.useState<object>({ Keyword: "", PageIndex: 1, PageSize: 5 });

  React.useEffect(() => {
    props.getRcStudent(valueParam);
  }, [valueParam]);

  React.useEffect(() => {
    if (props.rcStudent.rcStudentList.length === 0 && props.rcStudent.pagination.total > 0) {
      setValueParam(pre => ({
        ...pre, PageIndex: props.rcStudent.pagination.current - 1
      }));
    }
  }, [props.rcStudent]);

  const filterProps = {
    showCreateModal: () => {
      setModalVisible(true);
    },
    onFilterChange: (value: string) => {
      setValueParam(pre => ({
        ...pre, Keyword: value, PageIndex: 1
      }));
    }
  };
  const modalProps = {
    visible: modalVisible,
    destroyOnClose: true,
    title: "Đăng ký khóa học",
    centered: true,
    dataStudent:props.rcStudent.StudentList,
    dataCource:props.rcStudent.CourceList,
    loading: props.rcStudent.isActing || props.rcStudent.isRefreshing,
    onOk: (data: any) => {
      props.addRcStudent(data, valueParam);
    },
    onCancel: () => {
      setModalVisible(false);
    },
    searchCource:(value:any)=>{
      props.getCoursesByKey(value);
    },
    searchStudent:(value:any)=>{
      props.getStudentByKey(value)
    },
  };
  const listProps = {
    loading: props.rcStudent.isActing || props.rcStudent.isRefreshing,
    dataSource: props.rcStudent.rcStudentList,
    pagination: props.rcStudent.pagination,
    onChangeIndex: (data: any) => {
      setValueParam(pre => ({
        ...pre, PageIndex: data.current, PageSize: data.pageSize
      }));
    },
    onConfirm :(data:any)=>{
      props.confirmCourse(data,valueParam)
    }
  };

  return (
    <Spin
      spinning={props.rcStudent.isLoading}
      size="large"
      wrapperClassName="bg-page-loading"
    >
      <div className="header-content">
        <Breadcrumb>
          <Breadcrumb.Item>
            <NavLink to={"/"}>Trang chủ</NavLink>
          </Breadcrumb.Item>
          <Breadcrumb.Item> Đăng ký khóa học</Breadcrumb.Item>
        </Breadcrumb>
        <h2 style={{ marginTop: "13px" }}> Trang đăng ký khóa học</h2>
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
  rcStudent: state.rcStudent,

});

export default connect(mapStateToProps, {
  getRcStudent,
  getCoursesByKey,
  getStudentByKey,
  addRcStudent,
  confirmCourse
})(RcStudent);
