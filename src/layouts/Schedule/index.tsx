import React from "react";
import { connect } from "react-redux";
import { getSchedules, addSchedule, editSchedule, deleteSchedule, saveSchedule } from "redux/actions/schedule";
import { getClassesV1 } from "redux/actions/class";
import { getCoursesBySemeter } from "redux/actions/course"
import { Breadcrumb, Spin } from "antd";
import { IAppState } from "redux/store/types";
import { Page, } from "components/UI";
import { Filter, Modal, List } from "./components";
import { NavLink } from "react-router-dom";
// import Item from "antd/lib/list/Item";


interface IRequestProps {
  schedule: any,
  course: any,
  classes: any,
  getSchedules: (value: any) => void;
  addSchedule: (value: any, param: any) => void;
  editSchedule: (value: any, param: any) => void;
  deleteSchedule: (value: any, param: any) => void;
  getCoursesBySemeter: (value: any) => void;
  saveSchedule: (value: any) => void;
  getClassesV1: () => void
}
const Request: React.FunctionComponent<IRequestProps> = (props) => {
  const [modalVisible, setModalVisible] = React.useState<boolean>(false);
  const [valueParam, setValueParam] = React.useState<any>({ id: null });
  const [update, setUpdate] = React.useState<boolean>(false);
  const [currentItem, setCurrentItem] = React.useState<object>();
  const [keyUpdate, setKeyUpdate] = React.useState<number>(0);
  const [valueOption, setValueOption] = React.useState<any>({ year: "2020-2021", semeter: 1, course: null })
  const id = sessionStorage.getItem('id');
  React.useEffect(() => {
    props.getClassesV1();
    if(props.schedule.course !=null)
    {
      setValueOption((pre) => ({
      ...pre, course: props.schedule.course
    }));
    setValueParam((pre)=>({
      ...pre,id:props.schedule.course
    }));
    }
  }, []);
  React.useEffect(() => {
    if (valueOption.course != null)
      props.getSchedules(valueParam);
  }, [valueParam]);
  const filterProps = {
    datacourse: props.course.courseList,
    dataOption: props.schedule,
    isloading: props.course.isLoading,

    showCreateModal: () => {
      setModalVisible(true);
      setUpdate(false);
    },
    onChangeOption: (value: any) => {
      if (id != null) {
        var data = { ...value, Id: id }
        props.getCoursesBySemeter(data);
      }
      setValueOption(pre => ({
        ...pre, year: value.SchoolYear, semeter: value.Semester
      }))
    },
    onChangeCourse: (value: any) => {
      
      setValueParam(pre => ({
        ...pre, id: value
      }))
      const course = value;
      let data = { ...valueOption, course }
      setValueOption(pre => ({
        ...pre, course: value
      }))
      props.saveSchedule(data);
    }
  };
  const modalProps = {
    item: update === false ? {} : currentItem,
    visible: modalVisible,
    updateCustom: update,
    checkupdate: update,
    destroyOnClose: true,
    dataClass: props.classes.classList,
    title: update === false ? "Tạo Lịch học" : "Cập nhật lịch học",
    centered: true,
    loading: props.schedule.isActing || props.schedule.isRefreshing,
    onOk: (data: any) => {
      if (update === false) {
        const id_Course = valueParam.id
        var value = { ...data, id_Course };
        props.addSchedule(value, valueParam);
      }
      else {
        const id_Course = valueParam.id;
        const id_Schedule = keyUpdate;
        var value = { ...data, id_Course, id_Schedule };
        props.editSchedule(value, valueParam);
      }
    },
    onCancel: () => {
      setModalVisible(false);
    },

  };
  const listProps = {
    loading: props.schedule.isActing || props.schedule.isRefreshing,
    dataSource: props.schedule.scheduleList,
    pagination: props.schedule.pagination,
    onEditItem: (item: any) => {
      setUpdate(true);
      setModalVisible(true)
      setCurrentItem(item);
      setKeyUpdate(item.key);
    },
    onDeleteItem: (id: string) => {
       props.deleteSchedule(id, valueParam);
    },
    onChangeIndex: (data: any) => {
      setValueParam(pre => ({
        ...pre, PageIndex: data.current, PageSize: data.pageSize
      }));
    }
  };

  return (
    <Spin
      spinning={props.schedule.isLoading}
      size="large"
      wrapperClassName="bg-page-loading"
    >
      <div className="header-content">
        <Breadcrumb>
          <Breadcrumb.Item>
            <NavLink to={"/"}>Trang chủ</NavLink>
          </Breadcrumb.Item>
          <Breadcrumb.Item>Lịch học</Breadcrumb.Item>
        </Breadcrumb>
        <h2 style={{ marginTop: "13px" }}> Trang lịch học</h2>
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
  schedule: state.schedule,
  course: state.course,
  classes: state.classes
});

export default connect(mapStateToProps, {
  getSchedules,
  addSchedule,
  editSchedule,
  deleteSchedule,
  getCoursesBySemeter,
  saveSchedule,
  getClassesV1
})(Request);
